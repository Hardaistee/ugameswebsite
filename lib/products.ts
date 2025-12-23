/**
 * Products API Module
 * Backend API üzerinden ürün verilerine erişim sağlar.
 * WooCommerce bağımlılığı kaldırıldı - tamamen backend API kullanan yapı.
 */

import { API_ENDPOINTS, API_CONFIG } from './api-config';

// Product tipi
export interface Product {
    id: number;
    name: string;
    slug: string;
    sku?: string;
    price: string;
    regular_price: string;
    sale_price?: string;
    on_sale: boolean;
    featured?: boolean;
    stock_status: string;
    short_description?: string;
    description?: string;
    categories: Array<{ id: string | number; name: string; slug: string }>;
    images: Array<{ id?: number; src: string; name?: string; alt?: string }>;
    tags?: Array<{ id: string | number; name: string; slug: string }>;
    total_sales?: number;
    date_created?: string;
    date_modified?: string;
    permalink?: string;
}

// Kategori tipi
export interface Category {
    id: string | number;
    name: string;
    slug: string;
    count?: number;
}

/**
 * Backend'den tüm ürünleri getir
 */
export const getAllProducts = async (): Promise<Product[]> => {
    try {
        console.log(`[Products] Backend API'den ürünler çekiliyor...`);

        const response = await fetch(API_ENDPOINTS.PRODUCTS, {
            next: { revalidate: 60 }, // 60 saniye cache
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            console.error(`[Products] API hatası: ${response.status}`);
            return [];
        }

        const data = await response.json();

        if (data.success && data.products) {
            console.log(`[Products] ✅ ${data.products.length} ürün çekildi`);
            return data.products;
        }

        return [];
    } catch (error) {
        console.error('[Products] getAllProducts Error:', error);
        return [];
    }
};

/**
 * Slug ile tek ürün getir
 */
export const getProduct = async (slug: string): Promise<Product | null> => {
    try {
        const products = await getAllProducts();
        const product = products.find(p => p.slug === slug);

        if (product) {
            console.log(`[Products] Ürün bulundu: ${product.name}`);
            return product;
        }

        console.log(`[Products] Ürün bulunamadı: ${slug}`);
        return null;
    } catch (error) {
        console.error('[Products] getProduct Error:', error);
        return null;
    }
};

/**
 * ID ile tek ürün getir
 */
export const getProductById = async (id: number): Promise<Product | null> => {
    try {
        const products = await getAllProducts();
        return products.find(p => p.id === id) || null;
    } catch (error) {
        console.error('[Products] getProductById Error:', error);
        return null;
    }
};

/**
 * Kategoriye göre ürünleri getir
 */
export const getProductsByCategory = async (categorySlug: string, perPage = 20): Promise<Product[]> => {
    try {
        const products = await getAllProducts();
        const filtered = products.filter(p =>
            p.categories?.some(c => c.slug === categorySlug)
        );

        console.log(`[Products] Kategori "${categorySlug}": ${filtered.length} ürün bulundu`);
        return filtered.slice(0, perPage);
    } catch (error) {
        console.error('[Products] getProductsByCategory Error:', error);
        return [];
    }
};

/**
 * En çok satanları getir (total_sales'e göre)
 */
export const getBestSellers = async (perPage = 20): Promise<Product[]> => {
    try {
        const products = await getAllProducts();

        // total_sales'e göre sırala
        const sorted = [...products].sort((a, b) =>
            (b.total_sales || 0) - (a.total_sales || 0)
        );

        return sorted.slice(0, perPage);
    } catch (error) {
        console.error('[Products] getBestSellers Error:', error);
        return [];
    }
};

/**
 * Öne çıkan ürünleri getir
 */
export const getFeaturedProducts = async (perPage = 20): Promise<Product[]> => {
    try {
        const products = await getAllProducts();
        const featured = products.filter(p => p.featured);
        return featured.slice(0, perPage);
    } catch (error) {
        console.error('[Products] getFeaturedProducts Error:', error);
        return [];
    }
};

/**
 * İndirimli ürünleri getir
 */
export const getSaleProducts = async (perPage = 20): Promise<Product[]> => {
    try {
        const products = await getAllProducts();
        const onSale = products.filter(p => p.on_sale);
        return onSale.slice(0, perPage);
    } catch (error) {
        console.error('[Products] getSaleProducts Error:', error);
        return [];
    }
};

/**
 * Ürün ara
 */
export const searchProducts = async (query: string): Promise<Product[]> => {
    try {
        const products = await getAllProducts();
        const lowerQuery = query.toLowerCase();

        return products.filter(p =>
            p.name.toLowerCase().includes(lowerQuery) ||
            p.short_description?.toLowerCase().includes(lowerQuery) ||
            p.description?.toLowerCase().includes(lowerQuery)
        );
    } catch (error) {
        console.error('[Products] searchProducts Error:', error);
        return [];
    }
};

/**
 * Kategorileri getir (ürünlerden çıkar)
 */
export const getCategories = async (): Promise<Category[]> => {
    try {
        const products = await getAllProducts();
        const categoryMap = new Map<string, Category>();

        for (const product of products) {
            if (product.categories) {
                for (const cat of product.categories) {
                    const key = cat.slug;
                    if (!categoryMap.has(key)) {
                        categoryMap.set(key, {
                            id: cat.id,
                            name: cat.name,
                            slug: cat.slug,
                            count: 1
                        });
                    } else {
                        const existing = categoryMap.get(key)!;
                        existing.count = (existing.count || 0) + 1;
                    }
                }
            }
        }

        return Array.from(categoryMap.values()).sort((a, b) => (b.count || 0) - (a.count || 0));
    } catch (error) {
        console.error('[Products] getCategories Error:', error);
        return [];
    }
};

/**
 * Sipariş durumu sorgula
 */
export const getOrder = async (orderId: string) => {
    try {
        const response = await fetch(`${API_CONFIG.BACKEND_URL}/api/orders/${orderId}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Order fetch failed: ${response.status}`);
        }

        const data = await response.json();
        return data.order;
    } catch (error) {
        console.error('[Products] getOrder Error:', error);
        throw error;
    }
};

// Legacy export - geriye uyumluluk için
export const getProducts = async (page = 1, perPage = 20) => {
    const allProducts = await getAllProducts();
    const start = (page - 1) * perPage;
    return allProducts.slice(start, start + perPage);
};

// Legacy export - createOrder artık Shopier üzerinden
export const createOrder = async (data: any) => {
    console.warn('[Products] createOrder kullanımdan kaldırıldı. Shopier checkout kullanın.');
    throw new Error('createOrder depreciated. Use Shopier checkout instead.');
};

// Legacy export - getCoupon artık desteklenmiyor
export const getCoupon = async (code: string) => {
    console.warn('[Products] getCoupon kullanımdan kaldırıldı.');
    return null;
};
