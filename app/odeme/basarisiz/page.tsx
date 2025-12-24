'use client'

import React from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

export default function PaymentFailed() {
    const searchParams = useSearchParams()
    const orderId = searchParams?.get('orderId')

    return (
        <div className="min-h-screen flex items-center justify-center pb-12" style={{ background: 'var(--bg)' }}>
            <div className="max-w-md w-full mx-4">
                <div className="rounded-xl p-8 border text-center" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
                    {/* Error Icon */}
                    <div className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center" style={{ background: 'rgba(239, 68, 68, 0.1)' }}>
                        <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </div>

                    <h1 className="text-2xl font-black mb-3" style={{ color: 'var(--text)' }}>
                        Ödeme Başarısız
                    </h1>

                    <p className="text-base mb-6" style={{ color: 'var(--muted)' }}>
                        Ödeme işlemi tamamlanamadı. Lütfen tekrar deneyin veya farklı bir ödeme yöntemi kullanın.
                    </p>

                    {orderId && (
                        <div className="rounded-lg p-4 mb-6" style={{ background: 'var(--bg)' }}>
                            <p className="text-sm" style={{ color: 'var(--muted)' }}>Sipariş Numarası</p>
                            <p className="font-mono font-bold" style={{ color: 'var(--text)' }}>
                                {orderId}
                            </p>
                        </div>
                    )}

                    <div className="space-y-3">
                        <button
                            onClick={() => window.history.back()}
                            className="block w-full py-3 rounded-lg font-semibold transition-all hover:scale-[1.02] cursor-pointer"
                            style={{ background: 'var(--accent)', color: 'var(--bg)' }}
                        >
                            Tekrar Dene
                        </button>

                        <Link
                            href="/"
                            className="block w-full py-3 rounded-lg font-semibold transition-all hover:scale-[1.02]"
                            style={{ background: 'var(--bg)', color: 'var(--text)', border: '1px solid var(--border)' }}
                        >
                            Ana Sayfaya Dön
                        </Link>
                    </div>

                    <p className="text-xs mt-6" style={{ color: 'var(--muted)' }}>
                        Sorun devam ederse destek@ugames.com adresinden bize ulaşabilirsiniz.
                    </p>
                </div>
            </div>
        </div>
    )
}
