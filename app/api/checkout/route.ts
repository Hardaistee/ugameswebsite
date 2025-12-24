/**
 * Shopier Checkout API Route
 * 
 * Bu endpoint, ödeme işlemini başlatır ve Shopier'e gönderilecek
 * form verilerini hazırlar.
 * 
 * POST /api/checkout
 */

import { NextResponse } from 'next/server';
import { createShopier, Shopier, OrderData, ProductInfo, BuyerInfo, AddressInfo } from '@/lib/shopier';

// Request body tipi
interface CheckoutRequest {
    orderId?: string;
    amount: number;
    currency?: 'TRY' | 'USD' | 'EUR';
    products?: {
        name: string;
        productId: string;
        productType?: number;
        quantity: number;
        price: number;
    }[];
    buyer: {
        id?: string;
        name: string;
        surname: string;
        email: string;
        phone: string;
        accountAge?: number;
    };
    billingAddress: {
        address: string;
        city: string;
        country?: string;
        postcode: string;
    };
    shippingAddress?: {
        address: string;
        city: string;
        country?: string;
        postcode: string;
    };
}

export async function POST(request: Request) {
    try {
        // Shopier instance oluştur
        const shopier = createShopier();

        // Request body'yi parse et
        const body: CheckoutRequest = await request.json();

        // Sipariş ID oluştur (gelen varsa kullan, yoksa rastgele üret)
        const orderId = body.orderId || `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

        // Ürün bilgilerini hazırla
        const products: ProductInfo[] = body.products?.map(p => ({
            name: p.name,
            product_id: p.productId,
            product_type: p.productType ?? 0,
            quantity: p.quantity,
            price: p.price,
            subtotal_price: p.price * p.quantity,
            total_price: p.price * p.quantity,
            subtotal_tax: 0,
            total_tax: 0
        })) || [{
            name: 'Sipariş',
            product_id: orderId,
            product_type: 0,
            quantity: 1,
            price: body.amount,
            subtotal_price: body.amount,
            total_price: body.amount,
            subtotal_tax: 0,
            total_tax: 0
        }];

        // Alıcı bilgilerini hazırla
        const buyer: BuyerInfo = {
            id: body.buyer.id || 'GUEST',
            name: body.buyer.name,
            surname: body.buyer.surname,
            email: body.buyer.email,
            phone: body.buyer.phone.replace(/\D/g, ''), // Sadece rakamlar
            account_age: body.buyer.accountAge ?? 0
        };

        // Adres bilgilerini hazırla
        const billingAddress: AddressInfo = {
            address: body.billingAddress.address,
            city: body.billingAddress.city,
            country: body.billingAddress.country || 'Turkey',
            postcode: body.billingAddress.postcode
        };

        const shippingAddress: AddressInfo = body.shippingAddress ? {
            address: body.shippingAddress.address,
            city: body.shippingAddress.city,
            country: body.shippingAddress.country || 'Turkey',
            postcode: body.shippingAddress.postcode
        } : billingAddress;

        // Sipariş verisini oluştur
        const order: OrderData = {
            platform_order_id: orderId,
            total_order_value: body.amount,
            currency: body.currency || 'TRY',
            products,
            buyer,
            billing_address: billingAddress,
            shipping_address: shippingAddress
        };

        // Form verilerini oluştur
        const formData = shopier.generatePaymentForm(order);

        // Response
        return NextResponse.json({
            success: true,
            orderId: orderId,
            endpoint: Shopier.PAYMENT_ENDPOINT,
            formData: formData
        });

    } catch (error) {
        console.error('Checkout error:', error);

        const errorMessage = error instanceof Error ? error.message : 'Bilinmeyen hata';

        return NextResponse.json(
            { success: false, error: errorMessage },
            { status: 500 }
        );
    }
}
