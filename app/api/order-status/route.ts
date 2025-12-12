import { NextResponse } from 'next/server'
import { getOrder } from '../../../lib/woocommerce'

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const orderId = searchParams.get('order_id')
    const orderKey = searchParams.get('key')

    if (!orderId) {
        return NextResponse.json(
            { success: false, error: 'order_id parametresi gerekli' },
            { status: 400 }
        )
    }

    try {
        const order = await getOrder(parseInt(orderId))

        if (!order) {
            return NextResponse.json(
                { success: false, error: 'Sipariş bulunamadı' },
                { status: 404 }
            )
        }

        // Güvenlik: order_key kontrolü (opsiyonel ama önerilen)
        if (orderKey && order.order_key !== orderKey) {
            return NextResponse.json(
                { success: false, error: 'Sipariş doğrulanamadı' },
                { status: 403 }
            )
        }

        // Hassas bilgileri filtreleyerek döndür
        const safeOrder = {
            orderId: order.id,
            status: order.status,
            total: order.total,
            currency: order.currency,
            date: order.date_created,
            items: order.line_items?.map((item: any) => ({
                name: item.name,
                quantity: item.quantity,
                total: item.total,
                productId: item.product_id
            })) || [],
            paymentMethod: order.payment_method_title,
            customerNote: order.customer_note
        }

        return NextResponse.json({
            success: true,
            order: safeOrder
        })

    } catch (error: any) {
        console.error('Order status fetch error:', error)

        // WooCommerce 404 hatası
        if (error?.response?.status === 404) {
            return NextResponse.json(
                { success: false, error: 'Sipariş bulunamadı' },
                { status: 404 }
            )
        }

        return NextResponse.json(
            { success: false, error: 'Sipariş bilgisi alınamadı' },
            { status: 500 }
        )
    }
}
