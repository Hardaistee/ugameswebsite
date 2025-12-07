import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://ugames.com'

    // Static pages
    const staticPages = [
        '',
        '/oyunlar',
        '/oyun-ara',
        '/iletisim',
        '/hakkimizda',
        '/kullanim-kosullari',
        '/gizlilik-politikasi',
        '/iade-politikasi',
    ]

    const staticRoutes = staticPages.map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1 : 0.8,
    }))

    return staticRoutes
}
