
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
    shopierUrl?: string;
}

export async function getAllGames(): Promise<Game[]> {
    try {
        const ids = await redis.smembers('games:ids');
        if (!ids || ids.length === 0) return [];

        const pipeline = redis.pipeline();
        ids.forEach(id => pipeline.get(`game:${id}`));

        const results = await pipeline.exec();
        return results.filter(g => g) as Game[];
    } catch (error) {
        console.error('Failed to fetch games from Redis:', error);
        return [];
    }
}

export async function getGameById(id: string): Promise<Game | null> {
    try {
        const game = await redis.get(`game:${id}`) as Game;
        return game || null;
    } catch (error) {
        console.error(`Failed to fetch game ${id}:`, error);
        return null;
    }
}
