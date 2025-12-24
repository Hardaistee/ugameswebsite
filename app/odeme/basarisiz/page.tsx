import React, { Suspense } from 'react'
import Link from 'next/link'

function PaymentFailedContent() {
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

                    <div className="space-y-3">
                        <Link
                            href="/"
                            className="block w-full py-3 rounded-lg font-semibold transition-all hover:scale-[1.02]"
                            style={{ background: 'var(--accent)', color: 'var(--bg)' }}
                        >
                            Ana Sayfaya Dön
                        </Link>

                        <Link
                            href="/oyun-ara"
                            className="block w-full py-3 rounded-lg font-semibold transition-all hover:scale-[1.02]"
                            style={{ background: 'var(--bg)', color: 'var(--text)', border: '1px solid var(--border)' }}
                        >
                            Alışverişe Devam Et
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

export default function PaymentFailed() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg)' }}>Yükleniyor...</div>}>
            <PaymentFailedContent />
        </Suspense>
    )
}
