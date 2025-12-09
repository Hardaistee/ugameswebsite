'use client'
import React, { useEffect, useRef, useState, TouchEvent } from 'react'
import Link from 'next/link'

interface FeaturedSliderProps {
    games: any[]
}

export default function FeaturedSlider({ games }: FeaturedSliderProps) {
    const [index, setIndex] = useState(0)
    const [isPaused, setIsPaused] = useState(false)
    const timerRef = useRef<number | null>(null)
    const intervalMs = 5000

    // Touch/Swipe handling
    const touchStartX = useRef<number>(0)
    const touchEndX = useRef<number>(0)
    const minSwipeDistance = 50

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

    // Touch handlers for swipe
    const handleTouchStart = (e: TouchEvent) => {
        touchStartX.current = e.targetTouches[0].clientX
    }

    const handleTouchMove = (e: TouchEvent) => {
        touchEndX.current = e.targetTouches[0].clientX
    }

    const handleTouchEnd = () => {
        const distance = touchStartX.current - touchEndX.current
        if (Math.abs(distance) > minSwipeDistance) {
            if (distance > 0) {
                // Swipe left - next
                setIndex(i => (i + 1) % games.length)
            } else {
                // Swipe right - prev
                setIndex(i => (i - 1 + games.length) % games.length)
            }
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
        <div className="relative rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl mb-6 sm:mb-8 border" style={{ borderColor: 'var(--border)' }}>
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
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                className="relative w-full h-[280px] sm:h-[380px] md:h-[420px] lg:h-[35rem]"
            >
                {/* Main Content Grid */}
                <div className="absolute inset-0 flex">
                    {/* Left Side - Image */}
                    <div className="relative w-full lg:w-2/3 h-full">
                        {games.map((game, i) => (
                            <Link
                                key={game.id}
                                href={`/urun/${game.slug}`}
                                className={`absolute inset-0 transition-all duration-500 block ${index === i ? 'opacity-100 z-10 scale-100' : 'opacity-0 z-0 scale-100 pointer-events-none'}`}
                            >
                                <img
                                    src={game.images?.[0] || game.image}
                                    alt={game.title || game.name}
                                    className="w-full h-full object-cover"
                                    loading={i === 0 ? 'eager' : 'lazy'}
                                    decoding="async"
                                    fetchPriority={i === 0 ? 'high' : 'low'}
                                />
                                {/* Gradient overlays - Optimized for mobile */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/80 hidden lg:block" />

                                {/* Mobile/Tablet Content - Improved Layout */}
                                <div className="lg:hidden absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                                    {/* Top Row: Badge + Counter */}
                                    <div className="flex items-center justify-between mb-2">
                                        {game.discount > 0 ? (
                                            <div className="inline-block bg-red-500 text-white text-xs sm:text-sm font-bold px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg">
                                                -%{game.discount}
                                            </div>
                                        ) : (
                                            <div />
                                        )}
                                        <div className="text-white/70 text-xs sm:text-sm font-medium bg-black/40 px-2 py-1 rounded-md backdrop-blur-sm">
                                            {index + 1}/{games.length}
                                        </div>
                                    </div>

                                    {/* Category Tags */}
                                    {game.categories?.length > 0 && (
                                        <div className="flex gap-1.5 mb-2 overflow-x-auto scrollbar-hide">
                                            {game.categories.slice(0, 2).map((cat: any) => (
                                                <span
                                                    key={cat.id}
                                                    className="text-[10px] sm:text-xs px-2 py-0.5 rounded-full bg-white/20 text-white/90 whitespace-nowrap backdrop-blur-sm"
                                                >
                                                    {cat.name}
                                                </span>
                                            ))}
                                        </div>
                                    )}

                                    {/* Title */}
                                    <h3 className="text-lg sm:text-2xl font-black text-white drop-shadow-2xl mb-2 line-clamp-2 leading-tight">
                                        {game.title || game.name}
                                    </h3>

                                    {/* Price + CTA Row */}
                                    <div className="flex items-center justify-between gap-3">
                                        <div className="flex items-center gap-2">
                                            {game.oldPrice && (
                                                <span className="text-white/50 line-through text-sm sm:text-base">₺{formatPrice(game.oldPrice)}</span>
                                            )}
                                            <span className="text-xl sm:text-2xl font-black text-white">₺{formatPrice(game.price)}</span>
                                        </div>
                                        <span
                                            className="inline-flex items-center gap-1.5 px-4 py-2 sm:px-5 sm:py-2.5 rounded-lg font-bold text-xs sm:text-sm whitespace-nowrap"
                                            style={{ background: 'var(--accent)', color: '#000' }}
                                        >
                                            İncele
                                            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </span>
                                    </div>
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



                {/* Indicators - Desktop only */}
                {games.length > 1 && (
                    <div className="absolute left-1/3 -translate-x-1/2 bottom-2 hidden lg:flex gap-2 z-20">
                        {games.map((_, i) => (
                            <button
                                key={i}
                                aria-label={`Slide ${i + 1}`}
                                onClick={(e) => {
                                    e.preventDefault()
                                    setIndex(i)
                                }}
                                className="group p-2 flex items-center justify-center"
                            >
                                <span className={`block rounded-full transition-all ${index === i
                                    ? 'w-8 h-2 bg-white shadow-lg'
                                    : 'w-2 h-2 bg-white/40 hover:bg-white/60'}`
                                } />
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
