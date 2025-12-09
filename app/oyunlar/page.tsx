import React, { Suspense } from 'react'
import ClientGamesPage from './ClientGamesPage'
import { getAllProducts, getBestSellers } from '../../lib/woocommerce'
import FeaturedSliderSkeleton from '../components/FeaturedSliderSkeleton'
import { ProductGridSkeleton } from '../components/ProductCardSkeleton'

// Revalidate every hour
export const revalidate = 3600

// Product type after mapping
interface MappedProduct {
    id: number
    title: string
    name: string
    price: string
    oldPrice: string | null
    discount: number
    images: string[]
    image: string
    slug: string
    featured: boolean
    categories: { id: number; name: string; slug: string }[]
    tags: { id: number; name: string; slug: string }[]
    stock_status: string
    total_sales: number
}

// Helper to map WooCommerce product to component structure
function mapProduct(p: any): MappedProduct {
    return {
        id: p.id,
        title: p.name,
        name: p.name,
        price: p.price || p.regular_price,
        oldPrice: p.on_sale ? p.regular_price : null,
        discount: p.on_sale && p.regular_price && p.sale_price
            ? Math.round(((parseFloat(p.regular_price) - parseFloat(p.sale_price)) / parseFloat(p.regular_price)) * 100)
            : 0,
        images: p.images?.map((img: any) => img.src) || [],
        image: p.images?.[0]?.src || '',
        slug: p.slug,
        featured: p.featured,
        categories: p.categories,
        tags: p.tags,
        stock_status: p.stock_status,
        total_sales: p.total_sales,
    }
}

// Skeleton Loading Component
function GamesPageSkeleton() {
    return (
        <div className="min-h-screen pb-12" style={{ background: 'var(--bg)' }}>
            <div className="max-w-[1600px] mx-auto px-3 sm:px-4 lg:px-8 pt-4">
                {/* Featured Slider Skeleton */}
                <FeaturedSliderSkeleton />

                {/* Section Title Skeleton */}
                <div className="flex items-center justify-between mb-4">
                    <div className="h-8 w-40 bg-gray-700/50 rounded animate-pulse" />
                    <div className="h-6 w-24 bg-gray-700/50 rounded animate-pulse" />
                </div>

                {/* Product Grid Skeleton */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
                    <ProductGridSkeleton count={10} variant="game" />
                </div>
            </div>
        </div>
    )
}

export default async function GamesPage() {
    const [allProducts, bestSellers] = await Promise.all([
        getAllProducts(),
        getBestSellers(12)
    ])

    const mappedAll: MappedProduct[] = allProducts.map(mapProduct)
    const mappedBestSellers: MappedProduct[] = bestSellers.map(mapProduct)

    const categorizedProducts = {
        all: mappedAll,
        bestSellers: mappedBestSellers,
        featured: mappedAll.filter(p => p.featured).slice(0, 8),
        discounted: mappedAll.filter(p => p.discount > 0).slice(0, 12),
        gameKeys: mappedAll.filter(p => p.categories?.some(c => c.slug === 'random-oyun-keyleri')).slice(0, 12)
    }

    return (
        <Suspense fallback={<GamesPageSkeleton />}>
            <ClientGamesPage categorizedProducts={categorizedProducts} />
        </Suspense>
    )
}
