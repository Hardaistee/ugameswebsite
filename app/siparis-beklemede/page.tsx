'use client'

import React, { Suspense, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { FaClock, FaSpinner, FaUser, FaHome, FaSync, FaInfoCircle } from 'react-icons/fa'

interface OrderData {
    orderId: number
    status: string
    total: string
    currency: string
    date: string
}

function OrderPendingContent() {
    const searchParams = useSearchParams()
    const orderId = searchParams.get('order_id')
    const orderKey = searchParams.get('key')

    const [order, setOrder] = useState<OrderData | null>(null)
    const [loading, setLoading] = useState(true)
    const [checking, setChecking] = useState(false)

    useEffect(() => {
        if (orderId && orderKey) {
            fetchOrderStatus()
        } else {
            setLoading(false)
        }
    }, [orderId, orderKey])

    const fetchOrderStatus = async () => {
        try {
            const response = await fetch(`/api/order-status?order_id=${orderId}&key=${orderKey}`)
            const data = await response.json()

            if (data.success) {
                setOrder(data.order)

                // If payment completed, redirect to success page
                if (['completed', 'processing'].includes(data.order.status)) {
                    window.location.href = `/siparis-basarili?order_id=${orderId}&key=${orderKey}`
                }
            }
        } catch (err) {
            console.error('Order fetch error:', err)
        } finally {
            setLoading(false)
        }
    }

    const checkStatus = async () => {
        setChecking(true)
        await fetchOrderStatus()
        setChecking(false)
    }

    const getStatusText = (status: string) => {
        const statusMap: Record<string, string> = {
            'on-hold': 'Ödeme Onayı Bekleniyor',
            'pending': 'Ödeme Bekleniyor',
            'processing': 'İşleniyor',
            'completed': 'Tamamlandı'
        }
        return statusMap[status] || 'Beklemede'
    }

    return (
        <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
            <div className="max-w-lg w-full">
                {/* Pending Animation */}
                <div className="text-center mb-8">
                    <div className="relative inline-block">
                        <div className="w-24 h-24 rounded-full bg-yellow-500/20 flex items-center justify-center mx-auto mb-6">
                            <FaClock className="text-5xl text-yellow-500 animate-pulse" />
                        </div>
                        {/* Spinning dots */}
                        <div className="absolute inset-0 animate-spin" style={{ animationDuration: '3s' }}>
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-yellow-400 rounded-full" />
                        </div>
                    </div>

                    <h1 className="text-3xl font-bold mb-2">Ödemeniz Bekleniyor</h1>
                    <p className="text-gray-400">
                        Siparişiniz oluşturuldu, ödeme onayı bekleniyor.
                    </p>
                </div>

                {/* Order Info Card */}
                <div
                    className="rounded-2xl p-6 mb-6 border"
                    style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}
                >
                    {loading ? (
                        <div className="flex items-center justify-center py-8">
                            <FaSpinner className="text-2xl animate-spin" style={{ color: 'var(--accent)' }} />
                            <span className="ml-3">Sipariş bilgileri yükleniyor...</span>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <div>
                                    <div className="text-sm text-gray-400">Sipariş No</div>
                                    <div className="font-mono font-bold text-xl">#{orderId || 'N/A'}</div>
                                </div>
                                <div className="text-right">
                                    <div className="text-sm text-gray-400">Durum</div>
                                    <div className="font-bold text-yellow-500">
                                        {order ? getStatusText(order.status) : 'Beklemede'}
                                    </div>
                                </div>
                            </div>

                            {order && (
                                <div className="flex justify-between items-center pt-4 border-t" style={{ borderColor: 'var(--border)' }}>
                                    <span>Toplam Tutar</span>
                                    <span className="font-bold">{order.total} {order.currency}</span>
                                </div>
                            )}

                            {/* Check Status Button */}
                            <button
                                onClick={checkStatus}
                                disabled={checking}
                                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium transition-all hover:opacity-80 border"
                                style={{ borderColor: 'var(--border)' }}
                            >
                                {checking ? (
                                    <>
                                        <FaSpinner className="animate-spin" />
                                        <span>Kontrol ediliyor...</span>
                                    </>
                                ) : (
                                    <>
                                        <FaSync />
                                        <span>Durumu Kontrol Et</span>
                                    </>
                                )}
                            </button>
                        </div>
                    )}
                </div>

                {/* Info Boxes */}
                <div className="space-y-4 mb-6">
                    <div
                        className="rounded-xl p-4 border-l-4 border-yellow-500"
                        style={{ backgroundColor: 'var(--surface)' }}
                    >
                        <div className="flex items-start gap-3">
                            <FaInfoCircle className="text-yellow-500 mt-0.5 flex-shrink-0" />
                            <div className="text-sm">
                                <strong>Banka Havalesi / EFT</strong>
                                <p className="text-gray-400 mt-1">
                                    Banka havalesi ile ödeme yaptıysanız, ödemeniz onaylandıktan sonra siparişiniz işleme alınacaktır.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div
                        className="rounded-xl p-4 border-l-4"
                        style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--accent)' }}
                    >
                        <div className="flex items-start gap-3">
                            <FaInfoCircle className="mt-0.5 flex-shrink-0" style={{ color: 'var(--accent)' }} />
                            <div className="text-sm">
                                <strong>Otomatik Bildirim</strong>
                                <p className="text-gray-400 mt-1">
                                    Ödemeniz onaylandığında e-posta ile bilgilendirileceksiniz.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-4">
                    <Link
                        href="/profil"
                        className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold transition-all hover:scale-105"
                        style={{ backgroundColor: 'var(--accent)', color: 'var(--accent-contrast)' }}
                    >
                        <FaUser />
                        <span>Siparişlerim</span>
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
    )
}

export default function OrderPendingPage() {
    return (
        <Suspense fallback={
            <div className="min-h-[70vh] flex items-center justify-center">
                <FaSpinner className="text-4xl animate-spin" style={{ color: 'var(--accent)' }} />
            </div>
        }>
            <OrderPendingContent />
        </Suspense>
    )
}
