import React from 'react'
import Link from 'next/link'
import { Metadata } from 'next'
import { getGameById, getAllGames } from '@/lib/games'
import ProductCard from '@/app/components/ProductCard'

export const revalidate = 60; // Revalidate every 60 seconds

// SEO: Dinamik metadata oluştur
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const game = await getGameById(id)

  if (!game) {
    return {
      title: 'Oyun Bulunamadı',
      description: 'Aradığınız oyun bulunamadı.'
    }
  }

  const title = `${game.title} - ${game.platform} | uGames`
  const description = game.shortDescription ||
    `${game.title} ${game.platform} için dijital oyun kodu. Anında teslimat, güvenli ödeme. ₺${game.price}`

  return {
    title,
    description,
    keywords: [game.title, game.platform, 'oyun kodu', 'dijital oyun', 'anında teslimat', ...game.categories],
    openGraph: {
      title,
      description,
      type: 'website',
      url: `https://ugames.com.tr/oyun/${game.id}`,
      images: game.images?.[0] ? [
        {
          url: game.images[0],
          width: 600,
          height: 600,
          alt: game.title,
        }
      ] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: game.images?.[0] ? [game.images[0]] : [],
    },
  }
}

export default async function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  // Fetch game from Redis
  const product = await getGameById(id)

  if (!product) return <div>Oyun bulunamadı. <Link href="/oyunlar">Ana sayfa</Link></div>

  const images = product.images || (product.image ? [product.image] : [])
  if (images.length === 0 && product.image) images.push(product.image)

  // Fetch similar games (simple filtering for now)
  const allGames = await getAllGames()
  const similar = allGames
    .filter(p => p.platform === product.platform && p.id !== product.id)
    .slice(0, 4)

  return (
    <div className="min-h-screen pb-12" style={{ background: 'var(--bg)' }}>
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6 text-sm">
          <Link href="/" className="hover:underline" style={{ color: 'var(--muted)' }}>Ana Sayfa</Link>
          <span style={{ color: 'var(--muted)' }}>/</span>
          <Link href="/oyunlar" className="hover:underline" style={{ color: 'var(--muted)' }}>Oyunlar</Link>
          {product.platform && (
            <>
              <span style={{ color: 'var(--muted)' }}>/</span>
              <span className="font-medium capitalize" style={{ color: 'var(--muted)' }}>
                {product.platform}
              </span>
            </>
          )}
          <span style={{ color: 'var(--muted)' }}>/</span>
          <span className="font-medium truncate max-w-xs" style={{ color: 'var(--text)' }}>
            {product.title}
          </span>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="border rounded-lg overflow-hidden" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
              <div
                className="h-96 flex items-center justify-center overflow-hidden"
                style={{
                  background: 'var(--bg)',
                  backgroundImage: 'url(/images/placeholder.png)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                {images[0] ? (
                  <img
                    src={images[0]}
                    alt={product.title}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="text-center">
                    <svg className="w-24 h-24 mx-auto mb-4 opacity-50" style={{ color: 'var(--muted)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-lg font-semibold" style={{ color: 'var(--text)' }}>{product.title}</p>
                    <p className="text-sm mt-2" style={{ color: 'var(--muted)' }}>Platform: {product.platform}</p>
                  </div>
                )}
              </div>
            </div>

            <h1 className="text-2xl font-bold mt-6" style={{ color: 'var(--text)' }}>{product.title}</h1>
            {product.platform && (
              <div className="text-sm mt-1" style={{ color: 'var(--muted)' }}>Platform: {product.platform}</div>
            )}

            <div className="mt-6 p-4 rounded-lg" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
              <h2 className="font-semibold mb-2" style={{ color: 'var(--text)' }}>Ürün Açıklaması</h2>
              <div style={{ color: 'var(--muted)' }} className="prose prose-sm max-w-none">
                {product.description ? (
                  <div dangerouslySetInnerHTML={{ __html: product.description }} />
                ) : (
                  <p>
                    {product.title} - {product.platform} platformu için dijital oyun kodu. Anında teslimat garantisi ile güvenli alışveriş.
                    Oyun kodu satın alma işleminden hemen sonra hesabınıza gönderilir.
                  </p>
                )}
              </div>
            </div>

            <section className="mt-8">
              <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--text)' }}>Benzer Ürünler</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {similar.map((s, i) => (
                  <div key={s.id} className="staggered-item h-full" style={{ ['--i' as any]: i }}>
                    <ProductCard product={s} />
                  </div>
                ))}
              </div>
            </section>
          </div>

          <aside className="p-6 border rounded-lg h-fit sticky top-6" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
            {product.oldPrice && (
              <div className="text-sm line-through mb-1" style={{ color: 'var(--muted)' }}>{product.oldPrice} TL</div>
            )}
            <div className="text-3xl font-bold price-text">{product.price} TL</div>

            {(product.categories?.includes('Çok Satan')) && (
              <div className="mt-3">
                <span className="inline-block px-3 py-1 text-xs font-bold rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
                  Çok Satan
                </span>
              </div>
            )}

            {product.discount && (
              <div className="mt-2">
                <span className="inline-block px-3 py-1 text-xs font-bold rounded-full bg-red-500 text-white">
                  %{product.discount} İndirim
                </span>
              </div>
            )}

            <Link
              href={`/odeme/${product.id}`}
              className="mt-6 w-full px-4 py-3 rounded-lg font-semibold transition-all transform hover:-translate-y-1 hover:shadow-lg active:scale-95 flex items-center justify-center gap-2"
              style={{ background: 'var(--accent)', color: 'var(--bg)' }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Satın Al
            </Link>

            <button className="mt-3 w-full border px-4 py-3 rounded-lg font-semibold transition-all hover:scale-[1.02] flex items-center justify-center gap-2" style={{ background: 'var(--bg)', borderColor: 'var(--border)', color: 'var(--text)' }}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              Favorilere Ekle
            </button>

            <div className="mt-6 p-4 rounded-lg text-sm" style={{ background: 'var(--bg)' }}>
              <div className="flex items-center gap-2 mb-2" style={{ color: 'var(--text)' }}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span className="font-semibold">Güvenli Alışveriş</span>
              </div>
              <ul className="space-y-1 text-xs" style={{ color: 'var(--muted)' }}>
                <li>✓ SSL ile şifreli ödeme</li>
                <li>✓ Anında teslimat garantisi</li>
                <li>✓ 7/24 müşteri desteği</li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
