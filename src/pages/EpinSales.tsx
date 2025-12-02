import React from 'react'
import { Link } from 'react-router-dom'
import BannerCarousel from '../components/BannerCarousel'
import products from '../data/products.json'
import ProductCard from '../components/ProductCard'
import Icon from '../components/Icon'

export default function EpinSales() {
  // Filter products for epin-related items (you can customize this filter)
  const epinProducts = (products as any[]).filter(p =>
    p.category === 'pubg' ||
    p.category === 'valorant' ||
    p.category === 'lol' ||
    p.category === 'steam' ||
    p.parentCategory === 'pubg' ||
    p.parentCategory === 'valorant' ||
    p.parentCategory === 'lol' ||
    p.parentCategory === 'cs2'
  )

  const slice = (n: number) => epinProducts.slice(0, n)
  const scrollContainerRef = React.useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  return (
    <div className="pb-12" style={{ background: 'var(--bg)' }}>
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6 text-sm">
          <Link to="/" className="hover:underline" style={{ color: 'var(--muted)' }}>Ana Sayfa</Link>
          <span style={{ color: 'var(--muted)' }}>/</span>
          <span className="font-medium" style={{ color: 'var(--text)' }}>Epin Satış</span>
        </div>

        <section className="fade-in">
          <BannerCarousel />
        </section>

        <section className="mt-8 fade-in">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-extrabold" style={{ color: 'var(--text)' }}>Vitrin İlanlar</h2>
              <p className="text-sm mt-1" style={{ color: 'var(--muted)' }}>Günün öne çıkan epin ilanları</p>
            </div>
            <Link to="/ilanlar" className="text-sm font-semibold hover:underline" style={{ color: 'var(--accent)' }}>Tümünü Gör →</Link>
          </div>

          <div className="relative group">
            {/* Left Scroll Button */}
            <button
              onClick={() => scroll('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:scale-110"
              style={{ background: 'var(--surface)', border: '2px solid var(--border)' }}
              aria-label="Sola kaydır"
            >
              <svg className="w-6 h-6" style={{ color: 'var(--text)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Right Scroll Button */}
            <button
              onClick={() => scroll('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:scale-110"
              style={{ background: 'var(--surface)', border: '2px solid var(--border)' }}
              aria-label="Sağa kaydır"
            >
              <svg className="w-6 h-6" style={{ color: 'var(--text)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            <div ref={scrollContainerRef} className="overflow-x-auto -mx-4 px-4 scrollbar-hide scroll-smooth">
              <div className="flex gap-4 w-max py-2">
                {slice(6).map((p: any) => (
                  <div key={p.id} className="w-72">
                    <ProductCard product={p} variant="epin" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8 fade-in">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-extrabold" style={{ color: 'var(--text)' }}>Tüm Epin İlanları</h2>
              <p className="text-sm mt-1" style={{ color: 'var(--muted)' }}>Oyun kredileri ve dijital kodlar</p>
            </div>
          </div>

          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {epinProducts.map((p: any, i: number) => (
              <div key={p.id} className="staggered-item h-full" style={{ ['--i' as any]: i }}>
                <ProductCard product={p} variant="epin" />
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8 fade-in">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-extrabold" style={{ color: 'var(--text)' }}>Popüler Kategoriler</h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Link to="/ilanlar?category=pubg" className="category-tile category-gradient-3 h-24 text-lg">
              <Icon name="gamepad" className="w-6 h-6 mr-2" />
              PUBG
            </Link>
            <Link to="/ilanlar?category=valorant" className="category-tile category-gradient-4 h-24 text-lg">
              <Icon name="target" className="w-6 h-6 mr-2" />
              Valorant
            </Link>
            <Link to="/ilanlar?category=lol" className="category-tile category-gradient-1 h-24 text-lg">
              <Icon name="sword" className="w-6 h-6 mr-2" />
              LoL
            </Link>
            <Link to="/ilanlar?category=cs2" className="category-tile category-gradient-2 h-24 text-lg">
              <Icon name="gun" className="w-6 h-6 mr-2" />
              CS2
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}

