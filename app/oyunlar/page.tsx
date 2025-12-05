import React, { Suspense } from 'react'
import ClientGamesPage from './ClientGamesPage'
import { getProducts, getBestSellers } from '../../lib/woocommerce'

// Revalidate every hour
export const revalidate = 3600

// Helper to map WooCommerce product to component structure
function mapProduct(p: any) {
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

export default async function GamesPage() {
    const [allProducts, bestSellers] = await Promise.all([
        getProducts(1, 50),
        getBestSellers(12)
    ])

    const mappedAll = allProducts.map(mapProduct)
    const mappedBestSellers = bestSellers.map(mapProduct)

    const categorizedProducts = {
        all: mappedAll,
        bestSellers: mappedBestSellers,
        featured: mappedAll.filter(p => p.featured).slice(0, 4),
        discounted: mappedAll.filter(p => p.discount > 0).slice(0, 12)
    }

    return (
        <Suspense fallback={
            <div className="min-h-screen pb-12 flex items-center justify-center" style={{ background: 'var(--bg)' }}>
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4" style={{ borderColor: 'var(--accent)' }}></div>
                    <p style={{ color: 'var(--muted)' }}>Yükleniyor...</p>
                </div>
            </div>
        }>
            <ClientGamesPage categorizedProducts={categorizedProducts} />
        </Suspense>
    )
}
