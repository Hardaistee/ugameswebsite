
import fs from 'fs';
import csv from 'csv-parser';
import { Redis } from '@upstash/redis';
import * as dotenv from 'dotenv';
import path from 'path';

// Load env vars from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
    console.error('Redis credentials missing in .env.local');
    process.exit(1);
}

const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

const CSV_FILE = 'products.csv';
const results: any[] = [];

console.log(`Reading ${CSV_FILE}...`);

// Parsing helper for Turkish price format "124,9" -> 124.9
const parsePrice = (priceStr: string) => {
    if (!priceStr) return 0;
    return parseFloat(priceStr.replace(',', '.'));
}

fs.createReadStream(CSV_FILE)
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', async () => {
        console.log(`Parsed ${results.length} items.`);

        if (results.length > 0) {
            console.log('Sample Row Keys:', Object.keys(results[0]));
            console.log('Sample Row:', results[0]);
        }

        // Pipeline for batching
        let pipeline = redis.pipeline();
        let count = 0;
        let batchSize = 50;

        for (const row of results) {
            // Handle BOM in keys if present
            const getId = (r: any) => r['Kimlik'] || r['\uFEFFKimlik'];
            const id = getId(row);

            if (!id) {
                console.warn('Skipping row without ID:', row);
                continue;
            }

            const title = row['İsim'];
            const description = row['Açıklama'];
            const shortDescription = row['Kısa açıklama'];

            // Image splitting if multiple
            const rawImages = row['Görseller'] || '';
            const images = rawImages.split(',').map((s: string) => s.trim()).filter((s: string) => s);

            // Categories
            const rawCategories = row['Kategoriler'] || '';
            const categories = rawCategories.split(',').map((s: string) => s.trim());

            // Price logic
            const regularPrice = parsePrice(row['Normal fiyat']);
            const salePrice = parsePrice(row['İndirimli satış fiyatı']);
            const price = salePrice > 0 ? salePrice : regularPrice;
            const oldPrice = salePrice > 0 ? regularPrice : null;
            const discount = oldPrice ? Math.round(((oldPrice - price) / oldPrice) * 100) : null;

            // Platform Logic
            let platform = 'PC';
            if (row['Nitelik 1 ismi'] === 'Platform') platform = row['Nitelik 1 değer(ler)i'];
            else if (row['Nitelik 2 ismi'] === 'Platform') platform = row['Nitelik 2 değer(ler)i'];
            else if (row['Nitelik 3 ismi'] === 'Platform') platform = row['Nitelik 3 değer(ler)i'];

            const game = {
                id,
                title,
                description,
                shortDescription,
                images,
                image: images[0] || '',
                category: categories[0] || 'Game',
                categories,
                price,
                oldPrice,
                discount,
                platform,
                sku: row['Stok kodu (SKU)'],
                stock: parseInt(row['Stok'] || '0')
            };

            pipeline.set(`game:${id}`, game);
            pipeline.sadd('games:ids', id);

            count++;

            if (count % batchSize === 0) {
                process.stdout.write('.');
                try {
                    await pipeline.exec();
                    pipeline = redis.pipeline();
                } catch (err) {
                    console.error('\nPipeline execution failed:', err);
                    // Optionally log the last game that might have caused it?
                    // But pipeline fails as a batch.
                    // Retry individually? For now just exit to see error.
                    process.exit(1);
                }
            }
        }

        try {
            if (count % batchSize !== 0) {
                await pipeline.exec();
            }
            console.log(`\nSuccessfully migrated ${count} games to Redis.`);
        } catch (err) {
            console.error('\nFinal pipeline execution failed:', err);
        }
    });
