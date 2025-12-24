
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

// In-memory cache
let gamesCache: Game[] | null = null;
let cacheTimestamp: number = 0;
const CACHE_TTL = 30 * 60 * 1000; // 30 dakika

export async function getAllGames(): Promise<Game[]> {
    // Cache'den döndür (5 dakika geçerli)
    const now = Date.now();
    if (gamesCache && (now - cacheTimestamp) < CACHE_TTL) {
        return gamesCache;
    }

    try {
        const ids = await redis.smembers('games:ids');
        if (!ids || ids.length === 0) return [];

        const pipeline = redis.pipeline();
        ids.forEach(id => pipeline.get(`game:${id}`));

        const results = await pipeline.exec();
        const games = results.filter(g => g) as Game[];

        // Cache'e kaydet
        gamesCache = games;
        cacheTimestamp = now;

        return games;
    } catch (error) {
        console.error('Failed to fetch games from Redis:', error);
        // Hata durumunda eski cache'i döndür
        if (gamesCache) return gamesCache;
        return [];
    }
}

// Tek oyun cache'i
const gameCache: Map<string, { game: Game; timestamp: number }> = new Map();

export async function getGameById(id: string): Promise<Game | null> {
    const now = Date.now();
    const cached = gameCache.get(id);

    // Cache'den döndür
    if (cached && (now - cached.timestamp) < CACHE_TTL) {
        return cached.game;
    }

    try {
        const game = await redis.get(`game:${id}`) as Game;
        if (game) {
            gameCache.set(id, { game, timestamp: now });
        }
        return game || null;
    } catch (error) {
        console.error(`Failed to fetch game ${id}:`, error);
        // Hata durumunda eski cache'i döndür
        if (cached) return cached.game;
        return null;
    }
}
