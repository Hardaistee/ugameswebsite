import { NextResponse } from 'next/server'
import { createOrder } from '../../../lib/woocommerce'

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { items, customer } = body

        if (!items || items.length === 0) {
            return NextResponse.json({ error: 'Cart is empty' }, { status: 400 })
        }

        // Prepare billing/shipping data
        // Use provided customer data from frontend, or fallback to sensible defaults for testing
        const billingData = customer ? {
            first_name: customer.first_name,
            last_name: customer.last_name,
            address_1: customer.address_1,
            address_2: customer.address_2 || "",
            city: customer.city,
            state: customer.state || customer.city,
            postcode: customer.postcode || "34000",
            country: customer.country || "TR",
            email: customer.email,
            phone: customer.phone
        } : {
            first_name: "Misafir",
            last_name: "Kullanıcı",
            address_1: "Merkez Mah. Ataturk Cad. No:1",
            address_2: "",
            city: "Sisli",
            state: "Istanbul",
            postcode: "34000",
            country: "TR",
            email: `guest_${Date.now()}@ugames.com.tr`,
            phone: "05555555555"
        }

        const ip = request.headers.get('x-forwarded-for') || '176.88.23.172'
        const userAgent = request.headers.get('user-agent') || 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'

        // Prepare order data for WooCommerce
        const orderData = {
            set_paid: false,
            status: 'pending',
            customer_id: 0, // Force guest
            customer_ip_address: ip,
            customer_user_agent: userAgent,
            billing: billingData,
            shipping: billingData, // Use same for shipping for digital goods
            line_items: items.map((item: any) => ({
                product_id: item.id,
                quantity: item.quantity
            })),
            customer_note: "Order created via Headless Frontend"
        }

        const order = await createOrder(orderData)

        return NextResponse.json({
            success: true,
            orderId: order.id,
            orderKey: order.order_key,
            paymentUrl: order.payment_url
        })

    } catch (error: any) {
        console.error('Order creation failed:', error)
        return NextResponse.json(
            { error: 'Order creation failed', details: error.message },
            { status: 500 }
        )
    }
}
