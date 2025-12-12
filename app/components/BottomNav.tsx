'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useAuth } from '../../context/AuthContext'

export default function BottomNav() {
    const { user, loading } = useAuth()
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

    // Detect keyboard open/close and hide navbar when keyboard is open
    const [isKeyboardOpen, setIsKeyboardOpen] = useState(false)

    React.useEffect(() => {
        if (typeof window === 'undefined') return

        const detectKeyboard = () => {
            // On mobile, when keyboard opens, visualViewport height becomes smaller
            const viewportHeight = window.visualViewport?.height || window.innerHeight
            const windowHeight = window.innerHeight
            const heightDiff = windowHeight - viewportHeight

            // If difference is more than 150px, keyboard is probably open
            setIsKeyboardOpen(heightDiff > 150)
        }

        // Use visualViewport API if available (better support)
        if (window.visualViewport) {
            window.visualViewport.addEventListener('resize', detectKeyboard)
            window.visualViewport.addEventListener('scroll', detectKeyboard)
        }

        // Fallback: listen to focus events on inputs
        const handleFocus = (e: FocusEvent) => {
            const target = e.target as HTMLElement
            if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
                // Small delay to let keyboard animation start
                setTimeout(detectKeyboard, 300)
            }
        }

        const handleBlur = () => {
            setTimeout(() => setIsKeyboardOpen(false), 100)
        }

        document.addEventListener('focusin', handleFocus)
        document.addEventListener('focusout', handleBlur)

        return () => {
            window.visualViewport?.removeEventListener('resize', detectKeyboard)
            window.visualViewport?.removeEventListener('scroll', detectKeyboard)
            document.removeEventListener('focusin', handleFocus)
            document.removeEventListener('focusout', handleBlur)
        }
    }, [])

    const handleMenuClick = () => {
        if (typeof window !== 'undefined' && (window as any).__openMobileMenu) {
            (window as any).__openMobileMenu()
        }
    }

    const handleAIClick = () => {
        if (typeof window !== 'undefined' && (window as any).__toggleAIChat) {
            (window as any).__toggleAIChat()
        }
    }

    // Get user initials for avatar
    const getUserInitials = () => {
        if (!user?.name) return 'U'
        const names = user.name.split(' ')
        if (names.length >= 2) {
            return (names[0][0] + names[1][0]).toUpperCase()
        }
        return names[0].substring(0, 2).toUpperCase()
    }

    // Don't render on desktop
    if (!isMobile) return null

    return (
        <>
            {/* Bottom Navigation Bar - Only on Mobile, hidden when keyboard is open */}
            <nav
                className={`md:hidden fixed left-0 right-0 z-40 border-t transition-all duration-200 ${isKeyboardOpen ? 'translate-y-full opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'}`}
                style={{
                    bottom: 0,
                    background: 'var(--surface)',
                    borderColor: 'var(--border)',
                    boxShadow: '0 -2px 10px rgba(0,0,0,0.1)',
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

                    {/* Profile/Login Button - Shows user avatar if logged in */}
                    {!loading && user ? (
                        <Link
                            href="/profil"
                            className="flex flex-col items-center justify-center gap-1 transition-all active:scale-95"
                            style={{ color: 'var(--text)' }}
                        >
                            {/* User Avatar with initials */}
                            <div
                                className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                                style={{
                                    background: 'var(--accent)',
                                    color: 'var(--accent-contrast, #000)'
                                }}
                            >
                                {getUserInitials()}
                            </div>
                            <span className="text-xs font-medium">Profil</span>
                        </Link>
                    ) : (
                        <Link
                            href="/giris"
                            className="flex flex-col items-center justify-center gap-1 transition-all active:scale-95"
                            style={{ color: 'var(--text)' }}
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                            </svg>
                            <span className="text-xs font-medium">Giriş Yap</span>
                        </Link>
                    )}

                    {/* AI Asistan Button */}
                    <button
                        onClick={handleAIClick}
                        aria-label="AI Asistan"
                        className="flex flex-col items-center justify-center gap-1 transition-all active:scale-95 min-h-[44px]"
                        style={{ color: 'var(--accent)' }}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                        </svg>
                        <span className="text-xs font-medium">AI Asistan</span>
                    </button>
                </div>
            </nav>
        </>
    )
}
