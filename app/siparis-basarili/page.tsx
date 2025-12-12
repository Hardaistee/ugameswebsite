'use client'

import React, { Suspense, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { FaCheckCircle, FaBox, FaSpinner, FaUser, FaHome, FaReceipt } from 'react-icons/fa'

interface OrderItem {
    name: string
    quantity: number
    total: string
}

interface OrderData {
    orderId: number
    status: string
    total: string
    currency: string
    items: OrderItem[]
    date: string
}

function OrderSuccessContent() {
    const searchParams = useSearchParams()
    const orderId = searchParams.get('order_id')
    const orderKey = searchParams.get('key')

    const [order, setOrder] = useState<OrderData | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

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
            } else {
                setError(data.error || 'Sipariş bilgisi alınamadı')
            }
        } catch (err) {
            console.error('Order fetch error:', err)
            setError('Sipariş bilgisi alınırken bir hata oluştu')
        } finally {
            setLoading(false)
        }
    }

    const getStatusText = (status: string) => {
        const statusMap: Record<string, string> = {
            'completed': 'Tamamlandı',
            'processing': 'İşleniyor',
            'on-hold': 'Beklemede',
            'pending': 'Ödeme Bekleniyor',
            'cancelled': 'İptal Edildi',
            'refunded': 'İade Edildi',
            'failed': 'Başarısız'
        }
        return statusMap[status] || status
    }

    const getStatusColor = (status: string) => {
        const colorMap: Record<string, string> = {
            'completed': 'text-green-500',
            'processing': 'text-blue-500',
            'on-hold': 'text-yellow-500',
            'pending': 'text-orange-500',
            'cancelled': 'text-red-500',
            'refunded': 'text-purple-500',
            'failed': 'text-red-600'
        }
        return colorMap[status] || 'text-gray-500'
    }

    return (
        <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
            <div className="max-w-lg w-full">
                {/* Success Animation */}
                <div className="text-center mb-8">
                    <div className="relative inline-block">
                        <div className="w-24 h-24 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6 animate-pulse">
                            <FaCheckCircle className="text-5xl text-green-500" />
                        </div>
                        {/* Confetti dots */}
                        <div className="absolute -top-2 -left-2 w-3 h-3 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                        <div className="absolute -top-1 -right-3 w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                        <div className="absolute -bottom-1 -left-4 w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }} />
                        <div className="absolute -bottom-2 -right-2 w-3 h-3 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                    </div>

                    <h1 className="text-3xl font-bold mb-2">Siparişiniz Alındı! 🎉</h1>
                    <p className="text-gray-400">
                        Ödemeniz başarıyla tamamlandı. Dijital ürünleriniz en kısa sürede hesabınıza tanımlanacaktır.
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
                    ) : error ? (
                        <div className="text-center py-4">
                            <p className="text-gray-400 mb-2">{error}</p>
                            {orderId && (
                                <p className="text-sm">
                                    Sipariş No: <span className="font-mono font-bold">#{orderId}</span>
                                </p>
                            )}
                        </div>
                    ) : order ? (
                        <div className="space-y-4">
                            {/* Order Header */}
                            <div className="flex justify-between items-start border-b pb-4" style={{ borderColor: 'var(--border)' }}>
                                <div>
                                    <div className="text-sm text-gray-400">Sipariş No</div>
                                    <div className="font-mono font-bold text-xl">#{order.orderId}</div>
                                </div>
                                <div className="text-right">
                                    <div className="text-sm text-gray-400">Durum</div>
                                    <div className={`font-bold ${getStatusColor(order.status)}`}>
                                        {getStatusText(order.status)}
                                    </div>
                                </div>
                            </div>

                            {/* Order Items */}
                            <div className="space-y-2">
                                <div className="text-sm text-gray-400 flex items-center gap-2">
                                    <FaBox />
                                    <span>Ürünler</span>
                                </div>
                                {order.items.map((item, idx) => (
                                    <div key={idx} className="flex justify-between items-center py-2">
                                        <div className="flex items-center gap-2">
                                            <span className="w-6 h-6 bg-gray-700 rounded text-xs flex items-center justify-center">
                                                {item.quantity}x
                                            </span>
                                            <span className="line-clamp-1">{item.name}</span>
                                        </div>
                                        <span className="font-medium">{item.total} ₺</span>
                                    </div>
                                ))}
                            </div>

                            {/* Total */}
                            <div className="flex justify-between items-center pt-4 border-t" style={{ borderColor: 'var(--border)' }}>
                                <span className="font-bold">Toplam</span>
                                <span className="text-xl font-bold" style={{ color: 'var(--accent)' }}>
                                    {order.total} {order.currency}
                                </span>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-4">
                            <FaReceipt className="text-4xl mx-auto mb-3 opacity-50" />
                            <p className="text-gray-400">Siparişiniz başarıyla oluşturuldu</p>
                            {orderId && (
                                <p className="text-sm mt-2">
                                    Sipariş No: <span className="font-mono font-bold">#{orderId}</span>
                                </p>
                            )}
                        </div>
                    )}
                </div>

                {/* Info Box */}
                <div
                    className="rounded-xl p-4 mb-6 border-l-4"
                    style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--accent)' }}
                >
                    <p className="text-sm">
                        💡 <strong>Bilgi:</strong> Dijital ürünleriniz genellikle 5-10 dakika içinde teslim edilir.
                        Siparişlerinizi profilinizden takip edebilirsiniz.
                    </p>
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

export default function OrderSuccessPage() {
    return (
        <Suspense fallback={
            <div className="min-h-[70vh] flex items-center justify-center">
                <FaSpinner className="text-4xl animate-spin" style={{ color: 'var(--accent)' }} />
            </div>
        }>
            <OrderSuccessContent />
        </Suspense>
    )
}
