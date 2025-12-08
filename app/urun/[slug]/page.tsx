import { Suspense } from 'react'
import { getProduct } from '../../../lib/woocommerce'
import ProductDetailClient from './ProductDetailClient'

interface ProductPageProps {
    params: Promise<{ slug: string }>
}

export default async function ProductPage({ params }: ProductPageProps) {
    const { slug } = await params

    let product = null
    try {
        product = await getProduct(slug)
    } catch (error) {
        console.error('Failed to fetch product:', error)
    }

    return (
        <Suspense fallback={
            <div className="min-h-[60vh] flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
            </div>
        }>
            <ProductDetailClient product={product} />
        </Suspense>
    )
}

// Generate metadata for SEO
export async function generateMetadata({ params }: ProductPageProps) {
    const { slug } = await params
    const product = await getProduct(slug)

    if (!product) {
        return {
            title: 'Ürün Bulunamadı - uGames',
            robots: 'noindex',
        }
    }

    const cleanDescription = product.short_description?.replace(/<[^>]*>/g, '') || `${product.name} ürününü en uygun fiyata satın alın.`
    const imageUrl = product.images?.[0]?.src || 'https://ugames.com/logo.png' // Fallback image

    return {
        title: `${product.name} Satın Al - En Ucuz Fiyat | uGames`,
        description: cleanDescription,
        keywords: [product.name, 'oyun satın al', 'ucuz oyun', 'dijital kod', 'steam key', ...product.categories.map((c: any) => c.name)],
        alternates: {
            canonical: `https://ugames.com/urun/${slug}`,
        },
        openGraph: {
            title: `${product.name} - uGames`,
            description: cleanDescription,
            url: `https://ugames.com/urun/${slug}`,
            siteName: 'uGames',
            images: [
                {
                    url: imageUrl,
                    width: 800,
                    height: 600,
                    alt: product.name,
                },
            ],
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: `${product.name} - uGames`,
            description: cleanDescription,
            images: [imageUrl],
        },
    }
}
