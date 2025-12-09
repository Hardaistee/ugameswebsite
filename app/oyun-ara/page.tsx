import React, { Suspense } from 'react'
import GameSearchClient from './GameSearchClient'
import { getAllProducts } from '../../lib/woocommerce'
import { ProductGridSkeleton } from '../components/ProductCardSkeleton'

export const revalidate = 3600

// Helper to map WooCommerce product to component structure
function mapProduct(p: any) {
  // Determine platform from categories
  const platformCategory = p.categories?.find((c: any) =>
    ['pc', 'xbox', 'playstation', 'pc-oyunlari', 'xbox-oyunlari', 'playstation-oyunlari'].includes(c.slug?.toLowerCase())
  )
  let platform = 'Diğer'
  if (platformCategory) {
    const slug = platformCategory.slug?.toLowerCase() || ''
    if (slug.includes('pc')) platform = 'PC'
    else if (slug.includes('xbox')) platform = 'Xbox'
    else if (slug.includes('playstation')) platform = 'PlayStation'
  }

  return {
    id: p.id,
    title: p.name,
    name: p.name,
    price: parseFloat(p.price || p.regular_price || '0'),
    oldPrice: p.on_sale ? parseFloat(p.regular_price) : null,
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
    total_sales: p.total_sales || 0,
    platform: platform,
    badge: p.featured ? 'Vitrin' : (p.total_sales > 10 ? 'Çok Satan' : null),
    createdAt: new Date(p.date_created).getTime()
  }
}

// Skeleton Loading Component
function GameSearchSkeleton() {
  return (
    <div className="min-h-screen pb-12" style={{ background: 'var(--bg)' }}>
      <div className="max-w-[1600px] mx-auto px-3 sm:px-4 lg:px-8 pt-4">
        {/* Search Bar Skeleton */}
        <div className="mb-6">
          <div className="h-12 bg-gray-700/50 rounded-lg animate-pulse" />
        </div>

        {/* Filter Bar Skeleton */}
        <div className="flex gap-2 mb-6 overflow-x-auto">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-10 w-24 bg-gray-700/50 rounded-lg animate-pulse flex-shrink-0" />
          ))}
        </div>

        {/* Product Grid Skeleton */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
          <ProductGridSkeleton count={15} variant="game" />
        </div>
      </div>
    </div>
  )
}

export default async function GameSearchPage() {
  let products: any[] = []

  try {
    const wcProducts = await getAllProducts()
    products = wcProducts.map(mapProduct)
  } catch (error) {
    console.error('Failed to fetch products:', error)
  }

  return (
    <Suspense fallback={<GameSearchSkeleton />}>
      <GameSearchClient products={products} />
    </Suspense>
  )
}
