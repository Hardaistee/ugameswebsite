import React, { Suspense } from 'react'
import GameSearchClient from './GameSearchClient'
import { getProducts } from '../../lib/woocommerce'

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

export default async function GameSearchPage() {
  let products: any[] = []

  try {
    const wcProducts = await getProducts(1, 100)
    products = wcProducts.map(mapProduct)
  } catch (error) {
    console.error('Failed to fetch products:', error)
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
      <GameSearchClient products={products} />
    </Suspense>
  )
}
