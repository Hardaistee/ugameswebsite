/**
 * Shopier Callback API Route
 * 
 * Shopier ödeme tamamlandıktan sonra bu endpoint'e POST isteği gönderir.
 * İmza doğrulaması yapılır ve sipariş durumu güncellenir.
 * 
 * POST /api/callback
 */

import { NextResponse } from 'next/server';
import { createShopier, ShopierCallbackData } from '@/lib/shopier';

export async function POST(request: Request) {
    try {
        const shopier = createShopier();

        // Form data olarak gelen veriyi parse et
        const formData = await request.formData();

        // Callback verilerini çıkar
        const callbackData: ShopierCallbackData = {
            status: formData.get('status') as string || '',
            platform_order_id: formData.get('platform_order_id') as string || '',
            payment_id: formData.get('payment_id') as string || '',
            installment: formData.get('installment') as string || '',
            random_nr: formData.get('random_nr') as string || '',
            signature: formData.get('signature') as string || ''
        };

        // İmza doğrulaması
        const isValid = shopier.verifyCallback(callbackData);

        if (!isValid) {
            console.error('Shopier callback: Geçersiz imza!', {
                orderId: callbackData.platform_order_id
            });

            return NextResponse.json(
                { error: 'Geçersiz imza - Güvenlik hatası' },
                { status: 400 }
            );
        }

        // Ödeme durumunu kontrol et
        const isSuccess = callbackData.status.toLowerCase() === 'success';

        if (isSuccess) {
            // ✅ ÖDEME BAŞARILI
            console.log('Shopier: Ödeme başarılı', {
                orderId: callbackData.platform_order_id,
                paymentId: callbackData.payment_id,
                installment: callbackData.installment
            });

            // TODO: Burada kendi iş mantığınızı ekleyin:
            // - Veritabanında siparişi güncelle
            // - Stok düş
            // - Onay e-postası gönder
            // - Webhook tetikle
            // 
            // Örnek (Prisma ile):
            // await prisma.order.update({
            //   where: { id: callbackData.platform_order_id },
            //   data: { 
            //     status: 'PAID',
            //     paymentId: callbackData.payment_id,
            //     paidAt: new Date()
            //   }
            // });

            // Başarı sayfasına yönlendir
            const successUrl = new URL('/odeme/basarili', process.env.NEXT_PUBLIC_APP_URL || request.url);
            successUrl.searchParams.set('orderId', callbackData.platform_order_id);

            return NextResponse.redirect(successUrl);

        } else {
            // ❌ ÖDEME BAŞARISIZ
            console.log('Shopier: Ödeme başarısız', {
                orderId: callbackData.platform_order_id,
                status: callbackData.status
            });

            // TODO: Başarısız ödeme işlemleri
            // - Siparişi "ödeme başarısız" olarak işaretle
            // - Kullanıcıya bildirim gönder (opsiyonel)

            // Hata sayfasına yönlendir
            const failUrl = new URL('/odeme/basarisiz', process.env.NEXT_PUBLIC_APP_URL || request.url);
            failUrl.searchParams.set('orderId', callbackData.platform_order_id);

            return NextResponse.redirect(failUrl);
        }

    } catch (error) {
        console.error('Shopier callback error:', error);

        return NextResponse.json(
            { error: 'Sunucu hatası' },
            { status: 500 }
        );
    }
}

// GET isteği için bilgi mesajı (debug amaçlı)
export async function GET() {
    return NextResponse.json({
        message: 'Shopier Callback Endpoint',
        info: 'Bu endpoint sadece POST isteklerini kabul eder',
        usage: 'Shopier panelinde bu URL\'yi Geri Dönüş URL olarak tanımlayın'
    });
}
