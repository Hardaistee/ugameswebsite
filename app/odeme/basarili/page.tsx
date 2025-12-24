import React from 'react'
import Link from 'next/link'

export default async function PaymentSuccess({
    searchParams
}: {
    searchParams: Promise<{ orderId?: string }>
}) {
    const params = await searchParams

    return (
        <div className="min-h-screen flex items-center justify-center pb-12" style={{ background: 'var(--bg)' }}>
            <div className="max-w-md w-full mx-4">
                <div className="rounded-xl p-8 border text-center" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
                    {/* Success Icon */}
                    <div className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center" style={{ background: 'rgba(34, 197, 94, 0.1)' }}>
                        <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>

                    <h1 className="text-2xl font-black mb-3" style={{ color: 'var(--text)' }}>
                        Ödeme Başarılı! 🎉
                    </h1>

                    <p className="text-base mb-6" style={{ color: 'var(--muted)' }}>
                        Siparişiniz alındı ve ürün bilgileri e-posta adresinize gönderildi.
                    </p>

                    {params?.orderId && (
                        <div className="rounded-lg p-4 mb-6" style={{ background: 'var(--bg)' }}>
                            <p className="text-sm" style={{ color: 'var(--muted)' }}>Sipariş Numarası</p>
                            <p className="font-mono font-bold" style={{ color: 'var(--text)' }}>
                                {params.orderId}
                            </p>
                        </div>
                    )}

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
                        Herhangi bir sorun yaşarsanız destek@ugames.com adresinden bize ulaşabilirsiniz.
                    </p>
                </div>
            </div>
        </div>
    )
}
