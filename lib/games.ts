
import { redis } from './redis';

export interface Game {
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
}


// Helper to proxy images via weserv.nl to fix HTTP/2 protocol errors from hostinger
function getProxiedUrl(url: string): string {
    if (!url) return '';
    // Prevent double proxying if already proxied (just in case)
    if (url.includes('images.weserv.nl')) return url;

    // Remove protocol for cleaner url param, though weserv handles full urls too.
    // robust way: use the full URL as param
    const cleanUrl = url.replace(/^https?:\/\//, '');
    return `https://images.weserv.nl/?url=${encodeURIComponent(cleanUrl)}&default=${encodeURIComponent(url)}`;
}

function processGameImages(game: Game): Game {
    if (!game) return game;
    return {
        ...game,
        image: getProxiedUrl(game.image),
        images: game.images.map(img => getProxiedUrl(img))
    };
}

export async function getAllGames(): Promise<Game[]> {
    try {
        // optimized: check if we have a full cache key first, if not:
        const ids = await redis.smembers('games:ids');
        if (!ids || ids.length === 0) return [];

        const pipeline = redis.pipeline();
        ids.forEach(id => pipeline.get(`game:${id}`));

        const results = await pipeline.exec();
        // Filter out nulls first, then map images
        return (results.filter(g => g) as Game[])
            .map(processGameImages);
    } catch (error) {
        console.error('Failed to fetch games from Redis:', error);
        return [];
    }
}

export async function getGameById(id: string): Promise<Game | null> {
    try {
        const game = await redis.get(`game:${id}`) as Game;
        if (!game) return null;
        return processGameImages(game);
    } catch (error) {
        console.error(`Failed to fetch game ${id}:`, error);
        return null;
    }
}
