'use client'

import React, { useState, useEffect, Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import gamesData from '../data/games.json'
import Icon from '../components/Icon'
import ProductCard from '../components/ProductCard'

function GamesPageContent() {
    const searchParams = useSearchParams()
    const urlCategory = searchParams?.get('category') || 'all'

    const [selectedCategory, setSelectedCategory] = useState<string>(urlCategory)

    // URL değiştiğinde state'i güncelle
    useEffect(() => {
        const category = searchParams?.get('category') || 'all'
        setSelectedCategory(category)
    }, [searchParams])

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

    const scrollContainerRef = React.useRef<HTMLDivElement>(null)
    const scrollContainerRefBestSellers = React.useRef<HTMLDivElement>(null)

    const scroll = (direction: 'left' | 'right', ref: React.RefObject<HTMLDivElement>) => {
        if (ref.current) {
            const scrollAmount = 300
            ref.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            })
        }
    }

    return (
        <div className="pb-12" style={{ background: 'var(--bg)' }}>
            <div className="max-w-7xl mx-auto px-4 py-6">
                {/* Breadcrumb - Hidden on homepage */}
                <div className="hidden flex items-center gap-2 mb-6 text-sm">
                    <Link href="/oyunlar" className="hover:underline" style={{ color: 'var(--muted)' }}>Ana Sayfa</Link>
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
                                        <div className="absolute top-2 left-2 md:top-4 md:left-4 bg-red-500 text-white text-xs md:text-base font-bold px-2 py-1 md:px-4 md:py-2 rounded-lg shadow-xl">
                                            -%{game.discount}
                                        </div>
                                    )}

                                    <div className="absolute bottom-0 left-0 right-0 p-3 md:p-8">
                                        <h3 className="text-lg md:text-3xl lg:text-4xl font-black text-white mb-1 md:mb-3 drop-shadow-2xl line-clamp-1">
                                            {game.title}
                                        </h3>
                                        <p className="hidden md:block text-white/95 text-base mb-5 line-clamp-2 drop-shadow-lg">
                                            Anında teslimat garantisi ile güvenli alışveriş
                                        </p>
                                        <div className="flex flex-col md:flex-row items-start md:items-center gap-1 md:gap-4 mb-3 md:mb-5">
                                            <div className="flex items-center gap-2 md:gap-4">
                                                {game.oldPrice && (
                                                    <span className="text-white/70 line-through text-xs md:text-lg">
                                                        ₺{game.oldPrice}
                                                    </span>
                                                )}
                                                <span className="text-xl md:text-4xl font-black text-white drop-shadow-lg">
                                                    ₺{game.price}
                                                </span>
                                            </div>
                                            <span className="text-white/80 text-xs md:text-base">
                                                'den Başlayan Fiyatlarla
                                            </span>
                                        </div>
                                        <Link
                                            href={`/odeme/${game.id}`}
                                            className="inline-block px-4 py-2 md:px-8 md:py-4 rounded-lg font-bold text-sm md:text-base transition-all hover:scale-105 active:scale-95 shadow-xl"
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
                            onClick={() => scroll('left', scrollContainerRef)}
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
                            onClick={() => scroll('right', scrollContainerRef)}
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
                            href="/oyun-ara"
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
                            href="/oyun-ara?platform=pc"
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
                            href="/oyun-ara?platform=playstation"
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
                            href="/oyun-ara?platform=xbox"
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
                            href="/oyun-ara?category=discounted"
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
                            onClick={() => scroll('left', scrollContainerRefBestSellers)}
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
                            onClick={() => scroll('right', scrollContainerRefBestSellers)}
                            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:scale-110"
                            style={{ background: 'var(--surface)', border: '2px solid var(--border)' }}
                            aria-label="Sağa kaydır"
                        >
                            <svg className="w-6 h-6" style={{ color: 'var(--text)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>

                        <div ref={scrollContainerRefBestSellers} className="overflow-x-auto -mx-4 px-4 scrollbar-hide scroll-smooth">
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
                        {allProducts.slice(0, 8).map((game: any, i: number) => (
                            <div key={game.id} className="staggered-item h-full" style={{ ['--i' as any]: i }}>
                                <ProductCard product={game} variant="game" size="large" />
                            </div>
                        ))}
                    </div>

                    {allProducts.length > 8 && (
                        <div className="flex justify-center mt-8">
                            <Link
                                href="/oyun-ara"
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

export default function GamesPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen pb-12 flex items-center justify-center" style={{ background: 'var(--bg)' }}>
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4" style={{ borderColor: 'var(--accent)' }}></div>
                    <p style={{ color: 'var(--muted)' }}>Yükleniyor...</p>
                </div>
            </div>
        }>
            <GamesPageContent />
        </Suspense>
    )
}

