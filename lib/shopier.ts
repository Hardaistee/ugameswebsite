/**
 * Shopier Payment Integration for Next.js
 * 
 * Bu modül, Shopier ödeme altyapısını Next.js projelerine entegre etmek için
 * gerekli tüm fonksiyonları içerir.
 * 
 * @author Shopier Integration Module
 * @version 2.0.0
 */

import crypto from 'crypto';

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

export interface ShopierConfig {
    apiKey: string;
    apiSecret: string;
    websiteIndex: number;
}

export interface ProductInfo {
    name: string;
    product_id: string;
    product_type: number; // 0: Fiziksel ürün, 1: Dijital ürün
    quantity: number;
    variation?: string[];
    price: number;
    discount_price?: number;
    subtotal_price: number;
    total_price: number;
    subtotal_tax: number;
    total_tax: number;
}

export interface BuyerInfo {
    id: string;
    name: string;
    surname: string;
    email: string;
    phone: string;
    account_age: number; // Gün cinsinden hesap yaşı
}

export interface AddressInfo {
    address: string;
    city: string;
    country: string;
    postcode: string;
}

export interface OrderData {
    platform_order_id: string;
    total_order_value: number;
    currency: 'TRY' | 'USD' | 'EUR';
    products: ProductInfo[];
    buyer: BuyerInfo;
    billing_address: AddressInfo;
    shipping_address: AddressInfo;
}

export interface ShopierCallbackData {
    status: string;
    platform_order_id: string;
    payment_id: string;
    installment: string;
    random_nr: string;
    signature: string;
}

// ============================================================================
// SHOPIER CLASS
// ============================================================================

export class Shopier {
    private config: ShopierConfig;

    // Shopier API endpoint
    public static readonly PAYMENT_ENDPOINT = 'https://www.shopier.com/ShowProduct/api_pay4.php';

    constructor(config: ShopierConfig) {
        this.config = config;
    }

    /**
     * Para birimi kodunu Shopier formatına çevirir
     */
    private getCurrencyCode(currency: string): number {
        switch (currency) {
            case 'TRY': return 0;
            case 'USD': return 1;
            case 'EUR': return 2;
            default: return 0;
        }
    }

    /**
     * Ödeme formu verilerini oluşturur
     * Bu veriler hidden form olarak Shopier'e POST edilir
     */
    public generatePaymentForm(order: OrderData): Record<string, string | number> {
        const random_nr = Math.floor(Math.random() * 900000) + 100000;
        const currencyCode = this.getCurrencyCode(order.currency);

        // Fiyatı tam olarak "150.00" formatında string yap (imza için kritik!)
        const totalOrderValueStr = Number(order.total_order_value).toFixed(2);

        // İmza için veri hazırla (PHP ile birebir aynı format)
        const dataToSign = `${random_nr}${order.platform_order_id}${totalOrderValueStr}${currencyCode}`;

        // HMAC-SHA256 imza oluştur
        const signature = crypto
            .createHmac('sha256', this.config.apiSecret)
            .update(dataToSign)
            .digest('base64');

        // Ürün isimlerini PHP formatında hazırla (her birinin sonunda ;)
        const productNames = order.products
            .map(p => p.name.replace(/["']/g, ''))
            .map(name => name + ';')
            .join('');

        // Genel sipariş bilgileri
        const generalInfo = {
            discount_total: '0.00',
            discount_tax: '0.00',
            shipping_total: '0.00',
            shipping_tax: '0.00',
            cart_tax: '0.00',
            total: totalOrderValueStr,
            total_tax: '0.00',
            order_key: order.platform_order_id
        };

        // Shopier'e gönderilecek tüm form alanları
        return {
            API_key: this.config.apiKey,
            website_index: this.config.websiteIndex,
            use_adress: 0, // 0: Fatura adresi, 1: Teslimat adresi
            platform_order_id: order.platform_order_id,
            product_info: JSON.stringify(order.products),
            general_info: JSON.stringify(generalInfo),
            product_name: productNames,
            product_type: order.products[0]?.product_type ?? 0,
            buyer_name: order.buyer.name,
            buyer_surname: order.buyer.surname,
            buyer_email: order.buyer.email,
            buyer_account_age: order.buyer.account_age,
            buyer_id_nr: order.buyer.id,
            buyer_phone: order.buyer.phone,
            billing_address: order.billing_address.address,
            billing_city: order.billing_address.city,
            billing_country: order.billing_address.country,
            billing_postcode: order.billing_address.postcode,
            shipping_address: order.shipping_address.address,
            shipping_city: order.shipping_address.city,
            shipping_country: order.shipping_address.country,
            shipping_postcode: order.shipping_address.postcode,
            total_order_value: totalOrderValueStr,
            currency: currencyCode,
            platform: 0,
            is_in_frame: 0,
            current_language: 0, // 0: Türkçe
            modul_version: '2.0.0',
            random_nr: random_nr,
            signature: signature
        };
    }

    /**
     * Callback'ten gelen imzayı doğrular
     * Güvenlik için kritik - sahte callback'leri engeller
     */
    public verifyCallback(data: ShopierCallbackData): boolean {
        const expectedSignature = crypto
            .createHmac('sha256', this.config.apiSecret)
            .update(data.random_nr + data.platform_order_id)
            .digest('base64');

        return data.signature === expectedSignature;
    }
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Ortam değişkenlerinden Shopier config oluşturur
 */
export function getShopierConfig(): ShopierConfig {
    const apiKey = process.env.SHOPIER_API_KEY;
    const apiSecret = process.env.SHOPIER_API_SECRET;
    const websiteIndex = parseInt(process.env.SHOPIER_WEBSITE_INDEX || '1', 10);

    if (!apiKey || !apiSecret) {
        throw new Error('SHOPIER_API_KEY ve SHOPIER_API_SECRET ortam değişkenleri tanımlanmalı');
    }

    return { apiKey, apiSecret, websiteIndex };
}

/**
 * Yeni bir Shopier instance oluşturur (ortam değişkenlerinden)
 */
export function createShopier(): Shopier {
    return new Shopier(getShopierConfig());
}
