import { Redis } from '@upstash/redis';
import * as dotenv from 'dotenv';
import path from 'path';

// Load env vars from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

console.log('DEBUG: Env vars loaded:');
console.log('  UPSTASH_REDIS_REST_URL:', process.env.UPSTASH_REDIS_REST_URL?.slice(0, 30) + '...');
console.log('  SHOPIER_API_TOKEN length:', process.env.SHOPIER_API_TOKEN?.length || 0);
console.log('  SHOPIER_API_TOKEN first 50 chars:', process.env.SHOPIER_API_TOKEN?.slice(0, 50));

if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
    console.error('Redis credentials missing in .env.local');
    process.exit(1);
}

if (!process.env.SHOPIER_API_TOKEN) {
    console.error('SHOPIER_API_TOKEN missing in .env.local');
    process.exit(1);
}

const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

const SHOPIER_API_URL = 'https://api.shopier.com/v1/products';
const SHOPIER_TOKEN = process.env.SHOPIER_API_TOKEN;

interface ShopierProduct {
    id: string;
    title: string;
    description: string;
    type: string;
    url: string;
    media: { id: string; type: string; url: string; placement: number }[];
    priceData: {
        currency: string;
        price: string;
        discount: boolean;
        discountedPrice: string;
        shippingPrice: string;
    };
    stockStatus: string;
    stockQuantity: number;
    categories: { id: string; title: string }[];
}

interface Game {
    id: string;
    title: string;
    description: string;
    shortDescription: string;
    images: string[];
    image: string;
    category: string;
    categories: string[];
    price: number;
    oldPrice: number | null;
    discount: number | null;
    platform: string;
    sku: string;
    stock: number;
    shopierUrl: string;
}

function extractPlatform(title: string, categories: { id: string; title: string }[]): string {
    // Check categories first
    for (const cat of categories) {
        if (cat.title.toLowerCase().includes('playstation') || cat.title === 'PlayStation') return 'PlayStation';
        if (cat.title.toLowerCase().includes('xbox')) return 'Xbox';
        if (cat.title.toLowerCase() === 'pc') return 'PC';
    }

    // Check title
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes('ps5') || lowerTitle.includes('ps4') || lowerTitle.includes('playstation')) return 'PlayStation';
    if (lowerTitle.includes('xbox')) return 'Xbox';
    return 'PC';
}

function transformShopierProduct(product: ShopierProduct): Game | null {
    // Skip test/order products (title starts with number_ORDER)
    if (product.title.match(/^\d+_ORDER-/)) {
        return null;
    }

    const price = parseFloat(product.priceData.discountedPrice);
    const originalPrice = parseFloat(product.priceData.price);
    const hasDiscount = product.priceData.discount && originalPrice > price;
    const discount = hasDiscount ? Math.round(((originalPrice - price) / originalPrice) * 100) : null;

    const images = product.media
        .filter(m => m.type === 'image')
        .sort((a, b) => a.placement - b.placement)
        .map(m => m.url);

    const categories = product.categories.map(c => c.title);

    return {
        id: product.id,
        title: product.title,
        description: typeof product.description === 'string' ? product.description : '',
        shortDescription: typeof product.description === 'string' ? product.description.slice(0, 150) : '',
        images,
        image: images[0] || '',
        category: categories[0] || 'Game',
        categories,
        price,
        oldPrice: hasDiscount ? originalPrice : null,
        discount,
        platform: extractPlatform(product.title, product.categories),
        sku: product.id,
        stock: product.stockQuantity,
        shopierUrl: product.url
    };
}

async function fetchAllProducts(): Promise<ShopierProduct[]> {
    const allProducts: ShopierProduct[] = [];
    let page = 1;
    const limit = 50; // Shopier max per page is 50
    let hasMore = true;

    console.log('Fetching products from Shopier API...');

    while (hasMore) {
        const url = `${SHOPIER_API_URL}?limit=${limit}&page=${page}&sort=dateDesc`;

        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'accept': 'application/json',
                    'authorization': `Bearer ${SHOPIER_TOKEN}`
                }
            });

            if (!response.ok) {
                const errorBody = await response.text();
                console.log(`  API Response Body: ${errorBody}`);
                throw new Error(`API error: ${response.status} ${response.statusText}`);
            }

            const products: ShopierProduct[] = await response.json();

            if (products.length === 0) {
                hasMore = false;
            } else {
                allProducts.push(...products);
                console.log(`  Page ${page}: fetched ${products.length} products (total: ${allProducts.length})`);
                page++;

                // Rate limiting - wait 300ms between requests (200 req/min = ~3.3 req/sec)
                await new Promise(resolve => setTimeout(resolve, 300));
            }
        } catch (error) {
            console.error(`Error fetching page ${page}:`, error);
            hasMore = false;
        }
    }

    return allProducts;
}

async function seedRedis() {
    console.log('Starting Shopier -> Redis sync...\n');

    // Clear existing games
    console.log('Clearing existing games from Redis...');
    const existingIds = await redis.smembers('games:ids');
    if (existingIds.length > 0) {
        const pipeline = redis.pipeline();
        existingIds.forEach(id => pipeline.del(`game:${id}`));
        pipeline.del('games:ids');
        await pipeline.exec();
        console.log(`  Cleared ${existingIds.length} existing games.\n`);
    }

    // Fetch from Shopier
    const shopierProducts = await fetchAllProducts();
    console.log(`\nTotal products fetched: ${shopierProducts.length}`);

    // Transform and filter
    const games = shopierProducts
        .map(transformShopierProduct)
        .filter((g): g is Game => g !== null);

    console.log(`Valid game products: ${games.length}`);

    // Save to Redis
    let pipeline = redis.pipeline();
    let count = 0;
    const batchSize = 50;

    for (const game of games) {
        pipeline.set(`game:${game.id}`, game);
        pipeline.sadd('games:ids', game.id);
        count++;

        if (count % batchSize === 0) {
            process.stdout.write('.');
            await pipeline.exec();
            pipeline = redis.pipeline();
        }
    }

    // Execute remaining
    if (count % batchSize !== 0) {
        await pipeline.exec();
    }

    console.log(`\n\n✅ Successfully synced ${count} games to Redis from Shopier!`);

    // Show some stats
    const platforms = games.reduce((acc, g) => {
        acc[g.platform] = (acc[g.platform] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    console.log('\nPlatform breakdown:');
    Object.entries(platforms).forEach(([platform, count]) => {
        console.log(`  ${platform}: ${count}`);
    });
}

seedRedis().catch(console.error);
