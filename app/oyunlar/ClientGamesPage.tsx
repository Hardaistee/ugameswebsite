'use client'

import React from 'react'
import Link from 'next/link'
import ProductCard from '../components/ProductCard'

interface CategorizedProducts {
    all: any[]
    bestSellers: any[]
    featured: any[]
    discounted: any[]
}

interface ClientGamesPageProps {
    categorizedProducts: CategorizedProducts
}

export default function ClientGamesPage({ categorizedProducts }: ClientGamesPageProps) {
    const { all, bestSellers, featured, discounted } = categorizedProducts

    return (
        <div className="pb-12" style={{ background: 'var(--bg)' }}>
            <div className="max-w-7xl mx-auto px-4 py-6">

                {/* Hero Banner - Featured Games */}
                {featured.length > 0 && (
                    <section className="mb-8 fade-in">
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
                                    <div className="aspect-video relative overflow-hidden flex items-center justify-center">
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
                                                            ₺{game.oldPrice}
                                                        </span>
                                                    )}
                                                    <span className="text-xl md:text-4xl font-black text-white drop-shadow-lg">
                                                        ₺{game.price}
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

                {/* Best Sellers Section */}
                {bestSellers.length > 0 && (
                    <section className="mb-10 fade-in">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-black flex items-center gap-2" style={{ color: 'var(--text)' }}>
                                <span className="text-yellow-500">🔥</span> Çok Satanlar
                            </h2>
                            <Link href="/oyun-ara?filter=bestsellers" className="text-sm hover:underline" style={{ color: 'var(--accent)' }}>
                                Tümünü Gör →
                            </Link>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                            {bestSellers.slice(0, 6).map((game: any, i: number) => (
                                <div key={game.id} className="staggered-item" style={{ ['--i' as any]: i }}>
                                    <ProductCard product={game} variant="game" size="normal" />
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* All Games Section */}
                <section className="fade-in">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-black" style={{ color: 'var(--text)' }}>
                            Tüm Oyunlar
                        </h2>
                        <span className="text-sm" style={{ color: 'var(--muted)' }}>
                            {all.length} ürün
                        </span>
                    </div>

                    {all.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            {all.map((game: any, i: number) => (
                                <div key={game.id} className="staggered-item h-full" style={{ ['--i' as any]: i }}>
                                    <ProductCard product={game} variant="game" size="large" />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16">
                            <p className="text-lg" style={{ color: 'var(--muted)' }}>
                                Henüz ürün bulunmuyor.
                            </p>
                        </div>
                    )}
                </section>

                {/* Discounted Games Section */}
                {discounted.length > 0 && (
                    <section className="mt-12 fade-in">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-black flex items-center gap-2" style={{ color: 'var(--text)' }}>
                                <span className="text-red-500">🏷️</span> İndirimdekiler
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
