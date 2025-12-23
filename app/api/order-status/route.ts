import { NextResponse } from 'next/server'
import { API_CONFIG } from '../../../lib/api-config'

/**
 * Sipariş Durumu Sorgula
 * GET /api/order-status?order_id=xxx
 */
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const orderId = searchParams.get('order_id')

    if (!orderId) {
        return NextResponse.json(
            { success: false, error: 'order_id parametresi gerekli' },
            { status: 400 }
        )
    }

    try {
        // Backend'den sipariş durumunu sorgula
        const response = await fetch(`${API_CONFIG.BACKEND_URL}/api/orders/${orderId}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        })

        if (!response.ok) {
            if (response.status === 404) {
                return NextResponse.json(
                    { success: false, error: 'Sipariş bulunamadı' },
                    { status: 404 }
                )
            }
            throw new Error('Order fetch failed')
        }

        const data = await response.json()

        return NextResponse.json({
            success: true,
            order: {
                orderId: data.order.id,
                status: data.order.status,
                total: data.order.total,
                items: data.order.items,
                date: data.order.date_created
            }
        })

    } catch (error: any) {
        console.error('Order status fetch error:', error)
        return NextResponse.json(
            { success: false, error: 'Sipariş bilgisi alınamadı' },
            { status: 500 }
        )
    }
}
