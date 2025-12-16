'use client'

import React, { useMemo } from 'react'
import Link from 'next/link'
import ProductCard from '../components/ProductCard'
import FeaturedSlider from '../components/FeaturedSlider'
import { FadeIn } from '../components/animations/FadeIn'


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
        <div className="pb-24 md:pb-12" style={{ background: 'var(--bg)' }}>
            <div className="max-w-7xl mx-auto px-4 py-6">

                {/* Featured Games Slider - En Üstte */}
                {featured.length > 0 && (
                    <FadeIn direction="down" delay={0}>
                        <FeaturedSlider games={featured} />
                    </FadeIn>
                )}

                {/* App Download Banner - Slider'ın Altında */}
                <FadeIn direction="up" delay={0.15}>
                    <Link
                        href="/indir"
                        className="block mt-6 mb-4"
                    >
                        <div
                            className="relative overflow-hidden rounded-xl p-3 md:p-4 border group hover:scale-[1.005] transition-all duration-300"
                            style={{
                                background: 'var(--surface)',
                                borderColor: 'var(--border)'
                            }}
                        >
                            {/* Background hover effect */}
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: 'var(--bg)' }} />

                            <div className="relative flex items-center justify-between gap-3">
                                <div className="flex items-center gap-3">
                                    {/* Logo */}
                                    <div className="w-10 h-10 md:w-11 md:h-11 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'var(--bg)' }}>
                                        <img
                                            src="/images/Yeni Proje-17.png"
                                            alt="uGames"
                                            className="w-8 h-8 md:w-9 md:h-9 object-contain"
                                        />
                                    </div>

                                    <div>
                                        <div className="font-bold text-xs md:text-sm" style={{ color: 'var(--text)' }}>
                                            Masaüstü Uygulamamız Yayında!
                                        </div>
                                        <div className="text-[10px] md:text-xs flex items-center gap-1.5" style={{ color: 'var(--muted)' }}>
                                            <span>Windows</span>
                                            <span>•</span>
                                            <span>macOS</span>
                                            <span>•</span>
                                            <span>Linux</span>
                                        </div>
                                    </div>
                                </div>

                                {/* CTA Button */}
                                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg font-semibold text-xs group-hover:opacity-80 transition-opacity" style={{ background: 'var(--accent)', color: 'var(--accent-contrast)' }}>
                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                    </svg>
                                    Hemen İndir
                                </div>

                                {/* Mobile arrow */}
                                <svg className="sm:hidden w-5 h-5 group-hover:translate-x-1 transition-transform" style={{ color: 'var(--accent)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                        </div>
                    </Link>
                </FadeIn>
                <section className="mb-10 mt-8">
                    <FadeIn delay={0.1}>
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
                    </FadeIn>

                    {all.length > 0 ? (
                        <>
                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                                {/* Display shuffled games */}
                                {shuffledGames.map((game: any) => (
                                    <div key={game.id} className="h-full">
                                        <ProductCard product={game} variant="game" size="normal" />
                                    </div>
                                ))}
                            </div>

                            {/* Diğer Oyunlar Button */}
                            {all.length > 20 && (
                                <FadeIn direction="up" delay={0.3}>
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
                                </FadeIn>
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
                    <section className="mb-10">
                        <FadeIn delay={0.2}>
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
                        </FadeIn>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                            {gameKeys.slice(0, 6).map((game: any) => (
                                <div key={game.id} className="h-full">
                                    <ProductCard product={game} variant="game" size="normal" />
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Discounted Games Section */}
                {discounted.length > 0 && (
                    <section className="mt-12">
                        <FadeIn delay={0.3}>
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
                        </FadeIn>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                            {discounted.slice(0, 6).map((game: any) => (
                                <div key={game.id} className="h-full">
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
