import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import gamesData from '../data/games.json'
import Icon from '../components/Icon'
import ProductCard from '../components/ProductCard'

export default function SinglePlayerSales() {
  const location = useLocation()

  // URL'den category parametresini oku
  const urlParams = new URLSearchParams(location.search)
  const urlCategory = urlParams.get('category') || 'all'

  const [selectedCategory, setSelectedCategory] = useState<string>(urlCategory)

  // URL değiştiğinde state'i güncelle
  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const category = params.get('category') || 'all'
    setSelectedCategory(category)
  }, [location.search])

  // Tüm oyunlar
  const allProducts = gamesData as any[]

  // Platform kategorileri
  const pcGames = allProducts.filter(p => p.platform === 'PC')
  const psGames = allProducts.filter(p => p.platform === 'PlayStation')
  const xboxGames = allProducts.filter(p => p.platform === 'Xbox')

  // Discounted games
  const discountedGames = allProducts.filter(p => p.discount && p.discount > 0).slice(0, 6)

  // Best sellers
  const bestSellers = allProducts.filter(p => p.badge === 'Çok Satan' || p.tags?.includes('Çok Satan')).slice(0, 6)

  // Featured games
  const featuredGames = allProducts.filter(p => p.tags?.includes('Vitrin') || p.badge === 'Vitrin İlanı').slice(0, 4)

  // Category filter
  const getCategoryProducts = () => {
    switch (selectedCategory) {
      case 'pc': return pcGames
      case 'playstation': return psGames
      case 'xbox': return xboxGames
      case 'discounted': return allProducts.filter(p => p.discount && p.discount > 0)
      case 'bestsellers': return allProducts.filter(p => p.badge === 'Çok Satan' || p.tags?.includes('Çok Satan'))
      default: return allProducts
    }
  }

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
          <Link to="/tek-oyunculu" className="hover:underline" style={{ color: 'var(--muted)' }}>Ana Sayfa</Link>
          <span style={{ color: 'var(--muted)' }}>/</span>
          <span className="font-medium" style={{ color: 'var(--text)' }}>Oyunlar</span>
        </div>

        {/* Hero Banner Section - Featured Games */}
        <section className="mb-8 fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {featuredGames.slice(0, 2).map((game: any) => (
              <div
                key={game.id}
                className="relative rounded-xl overflow-hidden group cursor-pointer"
                style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--border)'
                }}
              >
                <div className="aspect-video relative overflow-hidden flex items-center justify-center">
                  <img
                    src={game.images[0]}
                    alt={game.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/100 via-black/60 to-transparent" />

                  {/* Discount Badge */}
                  {game.discount && (
                    <div className="absolute top-4 left-4 bg-red-500 text-white text-base font-bold px-4 py-2 rounded-lg shadow-xl">
                      -%{game.discount}
                    </div>
                  )}

                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-black text-white mb-3 drop-shadow-2xl">
                      {game.title}
                    </h3>
                    <p className="text-white/95 text-sm md:text-base mb-5 line-clamp-2 drop-shadow-lg">
                      Anında teslimat garantisi ile güvenli alışveriş
                    </p>
                    <div className="flex items-center gap-4 mb-5">
                      {game.oldPrice && (
                        <span className="text-white/70 line-through text-base md:text-lg">
                          ₺{game.oldPrice}
                        </span>
                      )}
                      <span className="text-3xl md:text-4xl font-black text-white drop-shadow-lg">
                        ₺{game.price}
                      </span>
                      <span className="text-white/80 text-sm md:text-base">
                        'den Başlayan Fiyatlarla
                      </span>
                    </div>
                    <Link
                      to={`/odeme/${game.id}`}
                      className="inline-block px-8 py-4 rounded-lg font-bold text-base transition-all hover:scale-105 active:scale-95 shadow-xl"
                      style={{
                        background: '#ffffff',
                        color: '#000000'
                      }}
                    >
                      Hemen Al
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* İndirimdeki Oyunlar Section */}
        <section className="mt-10 fade-in">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl font-black" style={{ color: 'var(--text)' }}>İndirimdeki Oyunlar</h2>
              <p className="text-sm mt-1" style={{ color: 'var(--muted)' }}>En iyi fırsatları kaçırma</p>
            </div>
          </div>


          <div className="relative group">
            {/* Left Scroll Button */}
            <button
              onClick={() => scroll('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:scale-110"
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
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:scale-110"
              style={{ background: 'var(--surface)', border: '2px solid var(--border)' }}
              aria-label="Sağa kaydır"
            >
              <svg className="w-6 h-6" style={{ color: 'var(--text)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            <div ref={scrollContainerRef} className="overflow-x-auto -mx-4 px-4 scrollbar-hide scroll-smooth">
              <div className="flex gap-4 w-max py-2">
                {discountedGames.map((game: any) => (
                  <div key={game.id} className="w-72 flex-shrink-0">
                    <ProductCard product={game} variant="game" size="large" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Category Tabs - Platform Based */}
        <section className="mt-10 fade-in">
          <div className="flex items-center gap-2 mb-6 overflow-x-auto scrollbar-hide pb-2">
            <Link
              to="/oyun-ara"
              className={`px-5 py-2.5 rounded-lg font-bold text-sm whitespace-nowrap transition-all ${selectedCategory === 'all' ? 'shadow-lg' : 'opacity-70 hover:opacity-100'
                }`}
              style={selectedCategory === 'all' ? {
                background: 'var(--accent)',
                color: 'var(--bg)'
              } : {
                background: 'var(--surface)',
                color: 'var(--text)',
                border: '1px solid var(--border)'
              }}
            >
              Tüm Oyunlar ({allProducts.length})
            </Link>
            <Link
              to="/oyun-ara?platform=pc"
              className={`px-5 py-2.5 rounded-lg font-bold text-sm whitespace-nowrap transition-all ${selectedCategory === 'pc' ? 'shadow-lg' : 'opacity-70 hover:opacity-100'
                }`}
              style={selectedCategory === 'pc' ? {
                background: 'var(--accent)',
                color: 'var(--bg)'
              } : {
                background: 'var(--surface)',
                color: 'var(--text)',
                border: '1px solid var(--border)'
              }}
            >
              PC Oyunları ({pcGames.length})
            </Link>
            <Link
              to="/oyun-ara?platform=playstation"
              className={`px-5 py-2.5 rounded-lg font-bold text-sm whitespace-nowrap transition-all ${selectedCategory === 'playstation' ? 'shadow-lg' : 'opacity-70 hover:opacity-100'
                }`}
              style={selectedCategory === 'playstation' ? {
                background: 'var(--accent)',
                color: 'var(--bg)'
              } : {
                background: 'var(--surface)',
                color: 'var(--text)',
                border: '1px solid var(--border)'
              }}
            >
              PlayStation Oyunları ({psGames.length})
            </Link>
            <Link
              to="/oyun-ara?platform=xbox"
              className={`px-5 py-2.5 rounded-lg font-bold text-sm whitespace-nowrap transition-all ${selectedCategory === 'xbox' ? 'shadow-lg' : 'opacity-70 hover:opacity-100'
                }`}
              style={selectedCategory === 'xbox' ? {
                background: 'var(--accent)',
                color: 'var(--bg)'
              } : {
                background: 'var(--surface)',
                color: 'var(--text)',
                border: '1px solid var(--border)'
              }}
            >
              Xbox Oyunları ({xboxGames.length})
            </Link>
            <Link
              to="/oyun-ara?category=discounted"
              className={`px-5 py-2.5 rounded-lg font-bold text-sm whitespace-nowrap transition-all ${selectedCategory === 'discounted' ? 'shadow-lg' : 'opacity-70 hover:opacity-100'
                }`}
              style={selectedCategory === 'discounted' ? {
                background: 'var(--accent)',
                color: 'var(--bg)'
              } : {
                background: 'var(--surface)',
                color: 'var(--text)',
                border: '1px solid var(--border)'
              }}
            >
              İndirimdeki Oyunlar
            </Link>
          </div>
        </section>

        {/* Çok Satanlar Section */}
        <section className="mt-10 fade-in">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl font-black" style={{ color: 'var(--text)' }}>Çok Satanlar</h2>
              <p className="text-sm mt-1" style={{ color: 'var(--muted)' }}>En popüler oyunlar</p>
            </div>
          </div>

          <div className="relative group">
            {/* Left Scroll Button */}
            <button
              onClick={() => scroll('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:scale-110"
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
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:scale-110"
              style={{ background: 'var(--surface)', border: '2px solid var(--border)' }}
              aria-label="Sağa kaydır"
            >
              <svg className="w-6 h-6" style={{ color: 'var(--text)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            <div ref={scrollContainerRef} className="overflow-x-auto -mx-4 px-4 scrollbar-hide scroll-smooth">
              <div className="flex gap-4 w-max py-2">
                {bestSellers.map((game: any) => (
                  <div key={game.id} className="w-72 flex-shrink-0">
                    <ProductCard product={game} variant="game" size="large" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Tüm Oyunlar Section */}
        <section className="mt-10 fade-in">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-black" style={{ color: 'var(--text)' }}>Tüm Oyunlar</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {allProducts.slice(0, 4).map((game: any, i: number) => (
              <div key={game.id} className="staggered-item h-full" style={{ ['--i' as any]: i }}>
                <ProductCard product={game} variant="game" size="large" />
              </div>
            ))}
          </div>

          {allProducts.length > 4 && (
            <div className="flex justify-center mt-8">
              <Link
                to="/oyun-ara"
                className="px-8 py-4 rounded-lg font-bold text-base transition-all hover:scale-105 active:scale-95 shadow-lg flex items-center gap-2"
                style={{
                  background: 'var(--surface)',
                  color: 'var(--text)',
                  border: '2px solid var(--border)'
                }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
                Tümünü Gör ({allProducts.length} oyun)
              </Link>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
