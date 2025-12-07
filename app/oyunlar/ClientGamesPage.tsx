'use client'

import React, { useMemo } from 'react'
import Link from 'next/link'
import ProductCard from '../components/ProductCard'
import FeaturedSlider from '../components/FeaturedSlider'

interface CategorizedProducts {
    all: any[]
    bestSellers: any[]
    featured: any[]
    discounted: any[]
    gameKeys: any[]
}

interface ClientGamesPageProps {
    categorizedProducts: CategorizedProducts
}

export default function ClientGamesPage({ categorizedProducts }: ClientGamesPageProps) {
    const { all, bestSellers, featured, discounted, gameKeys } = categorizedProducts

    // Format price with 2 decimal places
    const formatPrice = (price: any) => {
        const num = parseFloat(price)
        return isNaN(num) ? '0.00' : num.toFixed(2)
    }

    // Stable shuffle based on product IDs (prevents hydration mismatch)
    const shuffledGames = useMemo(() => {
        return [...all]
            .sort((a, b) => {
                // Use product ID for deterministic ordering
                const hashA = String(a.id).split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
                const hashB = String(b.id).split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
                return hashA - hashB
            })
            .slice(0, 20)
    }, [all])

    return (
        <div className="pb-12" style={{ background: 'var(--bg)' }}>
            <div className="max-w-7xl mx-auto px-4 py-6">

                {/* Featured Games Slider - En Üstte */}
                {featured.length > 0 && (
                    <FeaturedSlider games={featured} />
                )}

                {/* Hero Banner - İki Vitrin Oyunu */}
                {featured.length > 0 && (
                    <section className="mb-8 fade-in">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-black flex items-center gap-2" style={{ color: 'var(--text)' }}>
                                <span className="text-yellow-500">
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                                    </svg>
                                </span>
                                Vitrindekiler
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {featured.slice(0, 2).map((game: any) => (
                                <Link
                                    key={game.id}
                                    href={`/urun/${game.slug}`}
                                    className="relative rounded-xl overflow-hidden group cursor-pointer block"
                                    style={{
                                        background: 'var(--surface)',
                                        border: '1px solid var(--border)'
                                    }}
                                >
                                    <div className="aspect-[16/11] relative overflow-hidden flex items-center justify-center">
                                        <img
                                            src={game.images?.[0] || game.image}
                                            alt={game.title || game.name}
                                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/100 via-black/60 to-transparent" />

                                        {game.discount > 0 && (
                                            <div className="absolute top-2 left-2 md:top-4 md:left-4 bg-red-500 text-white text-xs md:text-base font-bold px-2 py-1 md:px-4 md:py-2 rounded-lg shadow-xl">
                                                -%{game.discount}
                                            </div>
                                        )}

                                        <div className="absolute bottom-0 left-0 right-0 p-3 md:p-8">
                                            <h3 className="text-lg md:text-3xl lg:text-4xl font-black text-white mb-1 md:mb-3 drop-shadow-2xl line-clamp-1">
                                                {game.title || game.name}
                                            </h3>
                                            <div className="flex flex-col md:flex-row items-start md:items-center gap-1 md:gap-4 mb-3 md:mb-5">
                                                <div className="flex items-center gap-2 md:gap-4">
                                                    {game.oldPrice && (
                                                        <span className="text-white/70 line-through text-xs md:text-lg">
                                                            ₺{formatPrice(game.oldPrice)}
                                                        </span>
                                                    )}
                                                    <span className="text-xl md:text-4xl font-black text-white drop-shadow-lg">
                                                        ₺{formatPrice(game.price)}
                                                    </span>
                                                </div>
                                            </div>
                                            <span
                                                className="inline-block px-4 py-2 md:px-8 md:py-4 rounded-lg font-bold text-sm md:text-base transition-all hover:scale-105 active:scale-95 shadow-xl"
                                                style={{
                                                    background: 'var(--accent)',
                                                    color: '#000'
                                                }}
                                            >
                                                İncele
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}


                {/* All Games Section - 20 Random Games */}
                <section className="mb-10 fade-in">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-black flex items-center gap-2" style={{ color: 'var(--text)' }}>
                            <span className="text-blue-500">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                                </svg>
                            </span>
                            Oyunlar
                        </h2>
                        <Link href="/oyun-ara" className="text-sm hover:underline" style={{ color: 'var(--accent)' }}>
                            Tümünü Gör →
                        </Link>
                    </div>

                    {all.length > 0 ? (
                        <>
                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                                {/* Display shuffled games */}
                                {shuffledGames.map((game: any, i: number) => (
                                    <div key={game.id} className="staggered-item h-full" style={{ ['--i' as any]: i }}>
                                        <ProductCard product={game} variant="game" size="normal" />
                                    </div>
                                ))}
                            </div>

                            {/* Diğer Oyunlar Button */}
                            {all.length > 20 && (
                                <div className="mt-8 text-center">
                                    <Link
                                        href="/oyun-ara"
                                        className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-bold text-lg transition-all hover:scale-[1.02] active:scale-95 border"
                                        style={{
                                            background: 'var(--surface)',
                                            borderColor: 'var(--border)',
                                            color: 'var(--text)'
                                        }}
                                    >
                                        <svg className="w-6 h-6 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                                        </svg>
                                        Diğer Oyunlar
                                        <span className="text-sm opacity-60">({all.length - 20}+ oyun)</span>
                                        <svg className="w-5 h-5 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </Link>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="text-center py-16">
                            <p className="text-lg" style={{ color: 'var(--muted)' }}>
                                Henüz ürün bulunmuyor.
                            </p>
                        </div>
                    )}
                </section>

                {/* Game Keys Section */}
                {gameKeys.length > 0 && (
                    <section className="mb-10 fade-in">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-black flex items-center gap-2" style={{ color: 'var(--text)' }}>
                                <span className="text-purple-500">
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                                    </svg>
                                </span>
                                Oyun Keyleri
                            </h2>
                            <Link href="/oyun-ara?category=game-keys" className="text-sm hover:underline" style={{ color: 'var(--accent)' }}>
                                Tümünü Gör →
                            </Link>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                            {gameKeys.slice(0, 6).map((game: any, i: number) => (
                                <div key={game.id} className="staggered-item" style={{ ['--i' as any]: i }}>
                                    <ProductCard product={game} variant="game" size="normal" />
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Discounted Games Section */}
                {discounted.length > 0 && (
                    <section className="mt-12 fade-in">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-black flex items-center gap-2" style={{ color: 'var(--text)' }}>
                                <span className="text-red-500">
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                    </svg>
                                </span>
                                İndirimdekiler
                            </h2>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                            {discounted.slice(0, 6).map((game: any, i: number) => (
                                <div key={game.id} className="staggered-item" style={{ ['--i' as any]: i }}>
                                    <ProductCard product={game} variant="game" size="normal" />
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    )
}
