import { getAllGames } from '@/lib/games'
import { MetadataRoute } from 'next'

export const dynamic = 'force-dynamic'
export const revalidate = 3600 // 1 saat

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://ugames.com.tr'

    // Statik sayfalar
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: `${baseUrl}/oyun-ara`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/hakkimizda`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.5,
        },
        {
            url: `${baseUrl}/iletisim`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.5,
        },
        {
            url: `${baseUrl}/gizlilik-politikasi`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.3,
        },
        {
            url: `${baseUrl}/kullanim-kosullari`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.3,
        },
        {
            url: `${baseUrl}/iade-kosullari`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.3,
        },
        {
            url: `${baseUrl}/mesafeli-satis-sozlesmesi`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.3,
        },
    ]

    // Oyun sayfaları
    let gamePages: MetadataRoute.Sitemap = []

    try {
        const games = await getAllGames()
        gamePages = games.map((game) => ({
            url: `${baseUrl}/oyun/${game.id}`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.8,
        }))
    } catch (error) {
        console.error('Sitemap: Failed to fetch games', error)
    }

    return [...staticPages, ...gamePages]
}
