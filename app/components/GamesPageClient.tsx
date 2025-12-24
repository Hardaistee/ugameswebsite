
'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import ProductCard from './ProductCard'
import { Game } from '@/lib/games'

interface GamesPageClientProps {
    allProducts: Game[]
}

export default function GamesPageClient({ allProducts }: GamesPageClientProps) {
    // Hero carousel state
    const [currentSlide, setCurrentSlide] = useState(0)
    const heroGames = allProducts.filter(p => p.discount && p.discount > 0).slice(0, 8)

    // Auto-slide every 5 seconds
    useEffect(() => {
        if (heroGames.length === 0) return
        const interval = setInterval(() => {
            setCurrentSlide(prev => (prev + 1) % heroGames.length)
        }, 5000)
        return () => clearInterval(interval)
    }, [heroGames.length])

    const goToSlide = (index: number) => {
        setCurrentSlide(index)
    }

    const nextSlide = () => {
        setCurrentSlide(prev => (prev + 1) % heroGames.length)
    }

    const prevSlide = () => {
        setCurrentSlide(prev => (prev - 1 + heroGames.length) % heroGames.length)
    }

    return (
        <div className="pb-12" style={{ background: 'var(--bg)' }}>
            <div className="max-w-7xl mx-auto px-4 py-6">
                {/* Hero Carousel */}
                {heroGames.length > 0 && (
                    <section className="mb-8 fade-in">
                        <div className="relative rounded-xl overflow-hidden" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                            {/* Slides */}
                            <div className="relative aspect-[16/9] md:aspect-[21/9] overflow-hidden">
                                {heroGames.map((game, index) => (
                                    <Link
                                        key={game.id}
                                        href={`/oyun/${game.id}`}
                                        className={`absolute inset-0 transition-opacity duration-500 ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                                        style={{
                                            backgroundImage: 'url(/images/placeholder.png)',
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center'
                                        }}
                                    >
                                        <img
                                            src={game.images[0] || game.image}
                                            alt={game.title}
                                            className="w-full h-full object-contain"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                                        {/* Discount Badge */}
                                        {game.discount && (
                                            <div className="absolute top-3 left-3 md:top-4 md:left-4 bg-red-500 text-white text-xs md:text-sm font-bold px-2 py-1 md:px-3 md:py-1.5 rounded-lg shadow-lg">
                                                -%{game.discount}
                                            </div>
                                        )}

                                        {/* Category Badge */}
                                        <div className="absolute top-3 left-16 md:top-4 md:left-20 text-white text-[10px] md:text-xs font-medium px-2 py-1 rounded bg-white/20 backdrop-blur-sm">
                                            {game.platform} Oyunları
                                        </div>

                                        {/* Content */}
                                        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8">
                                            <h2 className="text-xl md:text-3xl lg:text-4xl font-black text-white mb-2 md:mb-3 drop-shadow-lg line-clamp-1">
                                                {game.title}
                                            </h2>
                                            <div className="flex items-center gap-3 mb-3 md:mb-4">
                                                {game.oldPrice && (
                                                    <span className="text-white/60 line-through text-sm md:text-lg">
                                                        ₺{game.oldPrice}
                                                    </span>
                                                )}
                                                <span className="text-2xl md:text-4xl font-black text-white">
                                                    ₺{game.price}
                                                </span>
                                            </div>
                                            <span
                                                className="inline-block px-4 py-2 md:px-6 md:py-3 rounded-lg font-bold text-sm md:text-base transition-all hover:scale-105"
                                                style={{ background: 'var(--accent)', color: 'var(--bg)' }}
                                            >
                                                İncele →
                                            </span>
                                        </div>

                                        {/* Slide Indicator */}
                                        <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8 text-white/80 text-sm font-medium bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm">
                                            {currentSlide + 1}/{heroGames.length}
                                        </div>
                                    </Link>
                                ))}
                            </div>

                            {/* Navigation Arrows */}
                            <button
                                onClick={prevSlide}
                                className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 p-2 md:p-3 rounded-full bg-black/50 hover:bg-black/70 text-white transition-all"
                                aria-label="Önceki"
                            >
                                <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>
                            <button
                                onClick={nextSlide}
                                className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 p-2 md:p-3 rounded-full bg-black/50 hover:bg-black/70 text-white transition-all"
                                aria-label="Sonraki"
                            >
                                <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>

                            {/* Dot Indicators */}
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-1.5 md:hidden">
                                {heroGames.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => goToSlide(index)}
                                        className={`w-2 h-2 rounded-full transition-all ${index === currentSlide ? 'bg-white w-4' : 'bg-white/50'}`}
                                        aria-label={`Slide ${index + 1}`}
                                    />
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Oyunlar Section */}
                <section className="mt-8 fade-in">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl md:text-2xl font-bold flex items-center gap-2" style={{ color: 'var(--text)' }}>
                            <svg className="w-6 h-6 md:w-7 md:h-7" style={{ color: 'var(--accent)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                            </svg>
                            Oyunlar
                        </h2>
                        <Link
                            href="/oyun-ara"
                            className="text-sm font-medium transition-colors hover:underline"
                            style={{ color: 'var(--muted)' }}
                        >
                            Tümünü Gör →
                        </Link>
                    </div>

                    <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                        {allProducts.slice(0, 15).map((game, i) => (
                            <div key={game.id} className="staggered-item h-full" style={{ ['--i' as any]: i }}>
                                <ProductCard product={game} />
                            </div>
                        ))}
                    </div>

                    {allProducts.length > 15 && (
                        <div className="flex justify-center mt-8">
                            <Link
                                href="/oyun-ara"
                                className="px-6 py-3 rounded-lg font-semibold text-sm transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
                                style={{
                                    background: 'var(--surface)',
                                    color: 'var(--text)',
                                    border: '1px solid var(--border)'
                                }}
                            >
                                Tümünü Gör ({allProducts.length} oyun)
                            </Link>
                        </div>
                    )}
                </section>
            </div>
        </div>
    )
}
