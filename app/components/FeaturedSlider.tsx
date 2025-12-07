'use client'
import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

interface FeaturedSliderProps {
    games: any[]
}

export default function FeaturedSlider({ games }: FeaturedSliderProps) {
    const [index, setIndex] = useState(0)
    const [isPaused, setIsPaused] = useState(false)
    const timerRef = useRef<number | null>(null)
    const intervalMs = 5000

    useEffect(() => {
        startAuto()
        return () => stopAuto()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isPaused])

    function startAuto() {
        stopAuto()
        if (isPaused || games.length <= 1) return
        timerRef.current = window.setInterval(() => {
            setIndex(i => (i + 1) % games.length)
        }, intervalMs)
    }

    function stopAuto() {
        if (timerRef.current) {
            window.clearInterval(timerRef.current)
            timerRef.current = null
        }
    }

    if (games.length === 0) return null

    const currentGame = games[index]

    // Format price with 2 decimal places
    const formatPrice = (price: any) => {
        const num = parseFloat(price)
        return isNaN(num) ? '0.00' : num.toFixed(2)
    }

    return (
        <div className="relative rounded-xl overflow-hidden shadow-2xl mb-8 border" style={{ borderColor: 'var(--border)' }}>
            <div
                role="region"
                aria-roledescription="carousel"
                aria-label="Vitrin Oyunları"
                tabIndex={0}
                onKeyDown={(e) => {
                    if (e.key === 'ArrowLeft') {
                        setIndex(i => (i - 1 + games.length) % games.length)
                    } else if (e.key === 'ArrowRight') {
                        setIndex(i => (i + 1) % games.length)
                    }
                }}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                className="relative w-full h-[26rem] sm:h-[30rem] lg:h-[35rem]"
            >
                {/* Main Content Grid */}
                <div className="absolute inset-0 flex">
                    {/* Left Side - Image */}
                    <div className="relative w-full lg:w-2/3 h-full">
                        {games.map((game, i) => (
                            <Link
                                key={game.id}
                                href={`/urun/${game.slug}`}
                                className={`absolute inset-0 transition-all duration-700 block ${index === i ? 'opacity-100 z-10 scale-100' : 'opacity-0 z-0 scale-95 pointer-events-none'}`}
                            >
                                <img
                                    src={game.images?.[0] || game.image}
                                    alt={game.title || game.name}
                                    className="w-full h-full object-cover"
                                    loading={i === 0 ? 'eager' : 'lazy'}
                                    decoding="async"
                                    fetchPriority={i === 0 ? 'high' : 'low'}
                                />
                                {/* Gradient overlays */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/80 hidden lg:block" />

                                {/* Mobile/Tablet Content - Shown on smaller screens */}
                                <div className="lg:hidden absolute bottom-0 left-0 right-0 p-6">
                                    {game.discount > 0 && (
                                        <div className="inline-block bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-lg mb-3">
                                            -%{game.discount} İNDİRİM
                                        </div>
                                    )}
                                    <h3 className="text-2xl sm:text-3xl font-black text-white drop-shadow-2xl mb-2 line-clamp-2">
                                        {game.title || game.name}
                                    </h3>
                                    <div className="flex items-center gap-3 mb-4">
                                        {game.oldPrice && (
                                            <span className="text-white/60 line-through text-lg">₺{formatPrice(game.oldPrice)}</span>
                                        )}
                                        <span className="text-2xl font-black text-white">₺{formatPrice(game.price)}</span>
                                    </div>
                                    <span
                                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-bold text-sm"
                                        style={{ background: 'var(--accent)', color: '#000' }}
                                    >
                                        İncele
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                        </svg>
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* Right Side - Info Panel (Desktop only) */}
                    <div className="hidden lg:flex w-1/3 h-full flex-col justify-center p-8 xl:p-12" style={{ background: 'var(--surface)' }}>
                        {/* Discount Badge */}
                        {currentGame?.discount > 0 && (
                            <div className="inline-flex self-start bg-red-500 text-white text-sm font-bold px-4 py-2 rounded-lg mb-4">
                                -%{currentGame.discount} İNDİRİM
                            </div>
                        )}

                        {/* Game Title */}
                        <h3 className="text-2xl xl:text-3xl font-black mb-4 line-clamp-2" style={{ color: 'var(--text)' }}>
                            {currentGame?.title || currentGame?.name}
                        </h3>

                        {/* Description */}
                        <p className="text-sm xl:text-base mb-6 line-clamp-4 leading-relaxed" style={{ color: 'var(--muted)' }}>
                            {currentGame?.short_description || currentGame?.description ||
                                `${currentGame?.title || currentGame?.name} - En uygun fiyatlarla hemen satın alın. Güvenli ödeme, anında teslimat.`}
                        </p>

                        {/* Categories/Tags */}
                        {currentGame?.categories?.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-6">
                                {currentGame.categories.slice(0, 3).map((cat: any) => (
                                    <span
                                        key={cat.id}
                                        className="text-xs px-3 py-1 rounded-full"
                                        style={{ background: 'var(--bg)', color: 'var(--muted)' }}
                                    >
                                        {cat.name}
                                    </span>
                                ))}
                            </div>
                        )}

                        {/* Price */}
                        <div className="flex items-center gap-3 mb-6">
                            {currentGame?.oldPrice && (
                                <span className="line-through text-lg" style={{ color: 'var(--muted)' }}>
                                    ₺{formatPrice(currentGame.oldPrice)}
                                </span>
                            )}
                            <span className="text-3xl xl:text-4xl font-black" style={{ color: 'var(--accent)' }}>
                                ₺{formatPrice(currentGame?.price)}
                            </span>
                        </div>

                        {/* CTA Button */}
                        <Link
                            href={`/urun/${currentGame?.slug}`}
                            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg font-bold text-lg transition-all hover:scale-[1.02] active:scale-95"
                            style={{ background: 'var(--accent)', color: '#000' }}
                        >
                            Hemen İncele
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </Link>

                        {/* Slide Counter */}
                        <div className="mt-6 text-sm" style={{ color: 'var(--muted)' }}>
                            {index + 1} / {games.length} Vitrin Oyunu
                        </div>
                    </div>
                </div>

                {/* Navigation Arrows */}
                {games.length > 1 && (
                    <>
                        <button
                            onClick={(e) => {
                                e.preventDefault()
                                setIndex(i => (i - 1 + games.length) % games.length)
                            }}
                            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 bg-black/40 hover:bg-black/60 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all hover:scale-110"
                            aria-label="Önceki oyun"
                        >
                            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>

                        <button
                            onClick={(e) => {
                                e.preventDefault()
                                setIndex(i => (i + 1) % games.length)
                            }}
                            className="absolute right-2 sm:right-4 lg:right-auto lg:left-[calc(66.666%-3rem)] top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 bg-black/40 hover:bg-black/60 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all hover:scale-110"
                            aria-label="Sonraki oyun"
                        >
                            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </>
                )}

                {/* Indicators */}
                {games.length > 1 && (
                    <div className="absolute left-1/2 lg:left-1/3 -translate-x-1/2 bottom-2 flex gap-1 z-20">
                        {games.map((_, i) => (
                            <button
                                key={i}
                                aria-label={`Slide ${i + 1}`}
                                onClick={(e) => {
                                    e.preventDefault()
                                    setIndex(i)
                                }}
                                className="group p-3 min-w-[44px] min-h-[44px] flex items-center justify-center"
                            >
                                <span className={`block rounded-full transition-all ${index === i ? 'w-8 h-2 bg-white' : 'w-2 h-2 bg-white/50 hover:bg-white/70'}`} />
                            </button>
                        ))}
                    </div>
                )}

                {/* Progress Bar */}
                {games.length > 1 && (
                    <div className="absolute left-0 right-0 lg:right-1/3 bottom-0 h-1 bg-black/30 z-10">
                        <div
                            key={index + (isPaused ? '-p' : '')}
                            className="h-full bg-white/70 transition-all"
                            style={{
                                width: '0%',
                                animation: isPaused ? 'none' : `grow ${intervalMs}ms linear forwards`
                            }}
                        />
                    </div>
                )}
            </div>
        </div>
    )
}
