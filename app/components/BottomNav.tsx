'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function BottomNav() {
    const router = useRouter()
    const [showSearch, setShowSearch] = useState(false)
    const [isMobile, setIsMobile] = useState(true)

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

    const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            const query = (e.target as HTMLInputElement).value.trim()
            if (query) {
                // Homepage modunu kontrol et
                const mode = process.env.NEXT_PUBLIC_HOMEPAGE_MODE || 'marketplace'
                const searchPath = mode === 'games_only' ? '/oyun-ara' : '/ilanlar'
                router.push(`${searchPath}?search=${encodeURIComponent(query)}`)
                setShowSearch(false)
            }
        }
    }

    // Don't render on desktop
    if (!isMobile) return null

    return (
        <>
            {/* Search Overlay */}
            {showSearch && (
                <div className="md:hidden fixed inset-0 z-50 flex items-end" style={{ background: 'rgba(0,0,0,0.5)' }}>
                    <div className="w-full p-4 pb-24" style={{ background: 'var(--surface)' }}>
                        <div className="flex items-center gap-3">
                            <input
                                autoFocus
                                type="text"
                                placeholder="Ara..."
                                onKeyDown={handleSearch}
                                className="flex-1 px-4 py-3 rounded-lg border text-base"
                                style={{
                                    background: 'var(--bg)',
                                    borderColor: 'var(--border)',
                                    color: 'var(--text)'
                                }}
                            />
                            <button
                                onClick={() => setShowSearch(false)}
                                className="px-4 py-3 rounded-lg font-medium"
                                style={{ color: 'var(--text)' }}
                            >
                                İptal
                            </button>
                        </div>
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
                        className="flex flex-col items-center justify-center gap-1 transition-all active:scale-95"
                        style={{ color: 'var(--text)' }}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                        className="flex flex-col items-center justify-center gap-1 transition-all active:scale-95"
                        style={{ color: 'var(--text)' }}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <span className="text-xs font-medium">Ara</span>
                    </button>
                </div>
            </nav>
        </>
    )
}
