import { MetadataRoute } from 'next'
import { getAllProducts } from '../lib/woocommerce'

export const revalidate = 3600 // Her 1 saatte bir yenile


export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
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
        '/blog',
    ]

    const staticRoutes = staticPages.map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1 : 0.8,
    }))

    // Helper function to safely parse dates
    const safeDate = (dateString: string | undefined | null): Date => {
        if (!dateString) return new Date()
        const date = new Date(dateString)
        // Check if date is valid
        return isNaN(date.getTime()) ? new Date() : date
    }

    // Dynamic Product Pages
    let productRoutes: MetadataRoute.Sitemap = []
    try {
        const products = await getAllProducts()
        productRoutes = products.map((product: any) => ({
            url: `${baseUrl}/urun/${product.slug}`,
            lastModified: safeDate(product.date_modified || product.date_created),
            changeFrequency: 'daily' as const,
            priority: 0.9,
        }))
    } catch (error) {
        console.error('Sitemap generation error:', error)
    }

    // You could also add dynamic blog posts here if you have a getAllBlogs function

    return [...staticRoutes, ...productRoutes]
}
