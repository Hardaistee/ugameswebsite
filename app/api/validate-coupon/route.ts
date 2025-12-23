import { NextResponse } from 'next/server'

/**
 * Kupon Doğrulama - Artık Desteklenmiyor
 * POST /api/validate-coupon
 * 
 * WooCommerce kaldırıldığı için kupon sistemi devre dışı.
 * İleride admin panelden kupon yönetimi eklenebilir.
 */
export async function POST(request: Request) {
    try {
        const { code } = await request.json()

        if (!code) {
            return NextResponse.json({ valid: false, message: 'Kupon kodu boş olamaz.' }, { status: 400 })
        }

        // Kupon sistemi şu anda devre dışı
        return NextResponse.json({
            valid: false,
            message: 'Kupon sistemi şu anda kullanılamıyor.'
        })

    } catch (error: any) {
        console.error('Coupon validation error:', error)
        return NextResponse.json(
            { valid: false, message: 'Kupon sorgulanırken hata oluştu.' },
            { status: 500 }
        )
    }
}
