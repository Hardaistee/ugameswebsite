import { NextResponse } from 'next/server'
import { API_CONFIG } from '../../../lib/api-config'

/**
 * Shopier Checkout Başlat
 * POST /api/checkout
 * 
 * Frontend'den gelen sepet verilerini backend'e yönlendirir.
 * Backend Shopier ödeme formunu oluşturur.
 */
export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { items, customer, total, couponCode } = body

        if (!items || items.length === 0) {
            return NextResponse.json({ error: 'Cart is empty' }, { status: 400 })
        }

        if (!customer || !customer.email) {
            return NextResponse.json({ error: 'Customer email required' }, { status: 400 })
        }

        // Backend'e checkout isteği gönder
        const response = await fetch(`${API_CONFIG.BACKEND_URL}/api/checkout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                items: items.map((item: any) => ({
                    id: item.id,
                    name: item.name || item.title,
                    price: item.price,
                    quantity: item.quantity || 1
                })),
                customer: {
                    email: customer.email,
                    first_name: customer.first_name || customer.name?.split(' ')[0] || '',
                    last_name: customer.last_name || customer.name?.split(' ').slice(1).join(' ') || '',
                    phone: customer.phone || '',
                    address: customer.address_1 || customer.address || '',
                    city: customer.city || 'İstanbul',
                    postcode: customer.postcode || '34000'
                },
                total: total || items.reduce((sum: number, item: any) => {
                    return sum + (parseFloat(item.price) * (item.quantity || 1))
                }, 0)
            }),
        })

        if (!response.ok) {
            const error = await response.json()
            return NextResponse.json(
                { error: 'Checkout failed', details: error.message || error.error },
                { status: response.status }
            )
        }

        const data = await response.json()

        return NextResponse.json({
            success: true,
            orderId: data.orderId,
            paymentUrl: data.paymentUrl,
            paymentFormData: data.paymentFormData
        })

    } catch (error: any) {
        console.error('Checkout error:', error)
        return NextResponse.json(
            { error: 'Checkout failed', details: error.message },
            { status: 500 }
        )
    }
}
