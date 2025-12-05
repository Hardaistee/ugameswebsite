'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'

export default function CookieConsent() {
    const [show, setShow] = useState(false)

    useEffect(() => {
        // Check if user has already consented
        const consent = localStorage.getItem('cookie-consent')
        if (!consent) {
            // Show banner after a short delay
            const timer = setTimeout(() => setShow(true), 1000)
            return () => clearTimeout(timer)
        }
    }, [])

    const acceptCookies = () => {
        localStorage.setItem('cookie-consent', 'true')
        setShow(false)
    }

    if (!show) return null

    return (
        <div
            className="fixed bottom-0 left-0 right-0 p-4 z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] animate-slide-up"
            style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)' }}
        >
            <div className="container mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex-1">
                    <p className="text-sm" style={{ color: 'var(--text)' }}>
                        <span className="font-bold">🍪 Çerez Kullanımı:</span> Sitemizden en iyi şekilde faydalanabilmeniz için çerezler kullanılmaktadır.
                        Sitemize giriş yaparak çerez kullanımını kabul etmiş sayılırsınız.
                        Detaylı bilgi için <Link href="/gizlilik-politikasi" className="underline hover:text-[var(--accent)]">Gizlilik ve Çerez Politikamızı</Link> inceleyebilirsiniz.
                    </p>
                </div>
                <div className="flex gap-3 shrink-0">
                    <button
                        onClick={acceptCookies}
                        className="px-6 py-2 rounded-lg font-bold text-sm transition-all hover:scale-105 hover:shadow-lg"
                        style={{ background: 'var(--accent)', color: '#000' }}
                    >
                        Kabul Et
                    </button>
                </div>
            </div>
        </div>
    )
}
