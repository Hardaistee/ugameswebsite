'use client'

import React, { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { FaTimesCircle, FaRedo, FaHome, FaHeadset, FaExclamationTriangle, FaSpinner } from 'react-icons/fa'

function OrderCancelledContent() {
    const searchParams = useSearchParams()
    const orderId = searchParams.get('order_id')
    const reason = searchParams.get('reason')

    const getReasonText = (reason: string | null) => {
        const reasonMap: Record<string, string> = {
            'payment_failed': 'Ödeme işlemi başarısız oldu.',
            'cancelled': 'Sipariş iptal edildi.',
            'expired': 'Ödeme süresi doldu.',
            'declined': 'Ödeme reddedildi.'
        }
        return reason ? reasonMap[reason] || 'Bir hata oluştu.' : 'Siparişiniz tamamlanamadı.'
    }

    return (
        <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
            <div className="max-w-lg w-full">
                {/* Error Animation */}
                <div className="text-center mb-8">
                    <div className="relative inline-block">
                        <div className="w-24 h-24 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-6">
                            <FaTimesCircle className="text-5xl text-red-500" />
                        </div>
                    </div>

                    <h1 className="text-3xl font-bold mb-2">Sipariş Tamamlanamadı</h1>
                    <p className="text-gray-400">
                        {getReasonText(reason)}
                    </p>
                </div>

                {/* Order Info Card */}
                {orderId && (
                    <div
                        className="rounded-2xl p-6 mb-6 border"
                        style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}
                    >
                        <div className="flex justify-between items-center">
                            <div>
                                <div className="text-sm text-gray-400">Sipariş No</div>
                                <div className="font-mono font-bold text-xl">#{orderId}</div>
                            </div>
                            <div className="text-right">
                                <div className="text-sm text-gray-400">Durum</div>
                                <div className="font-bold text-red-500">İptal / Başarısız</div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Help Info */}
                <div
                    className="rounded-xl p-4 mb-6 border-l-4 border-red-500"
                    style={{ backgroundColor: 'var(--surface)' }}
                >
                    <div className="flex items-start gap-3">
                        <FaExclamationTriangle className="text-red-500 mt-0.5 flex-shrink-0" />
                        <div className="text-sm">
                            <strong>Ne yapabilirsiniz?</strong>
                            <ul className="text-gray-400 mt-2 space-y-1 list-disc list-inside">
                                <li>Kart bilgilerinizi kontrol edin</li>
                                <li>Farklı bir ödeme yöntemi deneyin</li>
                                <li>Bankanızla iletişime geçin</li>
                                <li>Destek ekibimize ulaşın</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                    <Link
                        href="/sepet"
                        className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold transition-all hover:scale-105 w-full"
                        style={{ backgroundColor: 'var(--accent)', color: 'var(--accent-contrast)' }}
                    >
                        <FaRedo />
                        <span>Tekrar Dene</span>
                    </Link>

                    <div className="grid grid-cols-2 gap-3">
                        <Link
                            href="/iletisim"
                            className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold transition-all hover:scale-105 border"
                            style={{ borderColor: 'var(--border)' }}
                        >
                            <FaHeadset />
                            <span>Destek</span>
                        </Link>
                        <Link
                            href="/"
                            className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold transition-all hover:scale-105 border"
                            style={{ borderColor: 'var(--border)' }}
                        >
                            <FaHome />
                            <span>Ana Sayfa</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function OrderCancelledPage() {
    return (
        <Suspense fallback={
            <div className="min-h-[70vh] flex items-center justify-center">
                <FaSpinner className="text-4xl animate-spin" style={{ color: 'var(--accent)' }} />
            </div>
        }>
            <OrderCancelledContent />
        </Suspense>
    )
}
