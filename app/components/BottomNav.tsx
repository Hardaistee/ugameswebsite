'use client'

import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function BottomNav() {
    const router = useRouter()
    const [showSearch, setShowSearch] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [isMobile, setIsMobile] = useState(true)
    const inputRef = useRef<HTMLInputElement>(null)

    // Check screen size
    React.useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768)
        }
        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    const handleMenuClick = () => {
        if (typeof window !== 'undefined' && (window as any).__openMobileMenu) {
            (window as any).__openMobileMenu()
        }
    }

    // Auto focus when search opens
    useEffect(() => {
        if (showSearch && inputRef.current) {
            inputRef.current.focus()
        }
    }, [showSearch])

    const handleSearch = (e?: React.FormEvent) => {
        e?.preventDefault()
        const query = searchQuery.trim()
        if (query) {
            // Homepage modunu kontrol et
            const mode = process.env.NEXT_PUBLIC_HOMEPAGE_MODE || 'marketplace'
            const searchPath = mode === 'games_only' ? '/oyun-ara' : '/ilanlar'
            router.push(`${searchPath}?search=${encodeURIComponent(query)}`)
            setSearchQuery('')
            setShowSearch(false)
        }
    }

    // Don't render on desktop
    if (!isMobile) return null

    return (
        <>
            {/* Search Overlay */}
            {showSearch && (
                <div
                    className="md:hidden fixed inset-0 z-50 flex items-end"
                    style={{ background: 'rgba(0,0,0,0.5)' }}
                    onClick={(e) => {
                        if (e.target === e.currentTarget) setShowSearch(false)
                    }}
                >
                    <div className="w-full p-4 pb-24" style={{ background: 'var(--surface)' }}>
                        <form onSubmit={handleSearch} className="flex items-center gap-3">
                            <input
                                ref={inputRef}
                                type="text"
                                inputMode="search"
                                enterKeyHint="search"
                                placeholder="Oyun ara..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="flex-1 px-4 py-3 rounded-lg border"
                                style={{
                                    background: 'var(--bg)',
                                    borderColor: 'var(--border)',
                                    color: 'var(--text)',
                                    fontSize: '16px' // Prevents iOS zoom
                                }}
                            />
                            <button
                                type="submit"
                                aria-label="Ara"
                                className="px-4 py-3 rounded-lg font-bold min-w-[44px] min-h-[44px]"
                                style={{
                                    background: 'var(--accent)',
                                    color: '#000'
                                }}
                            >
                                Ara
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    setSearchQuery('')
                                    setShowSearch(false)
                                }}
                                aria-label="Aramayı kapat"
                                className="px-3 py-3 rounded-lg font-medium min-w-[44px] min-h-[44px]"
                                style={{ color: 'var(--muted)' }}
                            >
                                ✕
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Bottom Navigation Bar - Only on Mobile */}
            <nav
                className="md:hidden fixed bottom-0 left-0 right-0 z-40 border-t"
                style={{
                    background: 'var(--surface)',
                    borderColor: 'var(--border)',
                    boxShadow: '0 -2px 10px rgba(0,0,0,0.1)'
                }}
            >
                <div
                    className="h-16"
                    style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr 1fr'
                    }}
                >
                    {/* Menu Button */}
                    <button
                        onClick={handleMenuClick}
                        aria-label="Menüyü aç"
                        className="flex flex-col items-center justify-center gap-1 transition-all active:scale-95 min-h-[44px]"
                        style={{ color: 'var(--text)' }}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                        <span className="text-xs font-medium">Menü</span>
                    </button>

                    {/* Login Button */}
                    <Link
                        href="/login"
                        className="flex flex-col items-center justify-center gap-1 transition-all active:scale-95"
                        style={{ color: 'var(--text)' }}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                        </svg>
                        <span className="text-xs font-medium">Giriş Yap</span>
                    </Link>

                    {/* Search Button */}
                    <button
                        onClick={() => setShowSearch(true)}
                        aria-label="Ara"
                        className="flex flex-col items-center justify-center gap-1 transition-all active:scale-95 min-h-[44px]"
                        style={{ color: 'var(--text)' }}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <span className="text-xs font-medium">Ara</span>
                    </button>
                </div>
            </nav>
        </>
    )
}
