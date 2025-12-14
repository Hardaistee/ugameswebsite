import { NextResponse } from 'next/server'
import { getCoupon } from '../../../lib/woocommerce'

export async function POST(request: Request) {
    try {
        const { code } = await request.json()

        if (!code) {
            return NextResponse.json({ valid: false, message: 'Kupon kodu boş olamaz.' }, { status: 400 })
        }

        const coupon = await getCoupon(code)

        if (!coupon) {
            return NextResponse.json({ valid: false, message: 'Geçersiz kupon kodu.' })
        }

        // Check if expired
        if (coupon.date_expires) {
            const expireDate = new Date(coupon.date_expires)
            if (expireDate < new Date()) {
                return NextResponse.json({ valid: false, message: 'Bu kuponun süresi dolmuş.' })
            }
        }

        // Return coupon details
        return NextResponse.json({
            valid: true,
            code: coupon.code,
            amount: coupon.amount,
            discount_type: coupon.discount_type, // 'percent', 'fixed_cart', or 'fixed_product'
            description: coupon.description,
            product_ids: coupon.product_ids || []
        })

    } catch (error: any) {
        console.error('Coupon validation error:', error)
        return NextResponse.json(
            { valid: false, message: 'Kupon sorgulanırken hata oluştu.' },
            { status: 500 }
        )
    }
}
