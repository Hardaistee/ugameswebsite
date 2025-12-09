import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
import { API_ENDPOINTS } from './api-config';

// İstemci tarafında bu kütüphaneyi doğrudan kullanmamalıyız (Secret Key güvenliği için).
// Bu dosya sadece Server Component'ler veya API Route'lar içinde kullanılmalı.

if (!process.env.NEXT_PUBLIC_WOOCOMMERCE_URL || !process.env.WOOCOMMERCE_KEY || !process.env.WOOCOMMERCE_SECRET) {
    throw new Error("WooCommerce environment variables are missing.");
}

const api = new WooCommerceRestApi({
    url: process.env.NEXT_PUBLIC_WOOCOMMERCE_URL,
    consumerKey: process.env.WOOCOMMERCE_KEY,
    consumerSecret: process.env.WOOCOMMERCE_SECRET,
    version: "wc/v3",
});

export const getProducts = async (page = 1, perPage = 20) => {
    try {
        const response = await api.get("products", {
            page,
            per_page: perPage,
            status: "publish",
        });
        return response.data;
    } catch (error) {
        console.error("WooCommerce getProducts Error:", error);
        return [];
    }
};

// Tüm ürünleri Redis cache'den veya WooCommerce'den çek
// NEXT_PUBLIC_REDIS_ONLY=true → Sadece Redis'ten çeker (hızlı)
// NEXT_PUBLIC_REDIS_ONLY=false → Redis + WooCommerce fallback (hybrid)

const REDIS_ONLY = process.env.NEXT_PUBLIC_REDIS_ONLY === 'true';

export const getAllProducts = async () => {
    // 1. Redis cache'den çekmeyi dene (Backend API üzerinden)
    try {
        console.log(`[WooCommerce] Redis cache'den çekiliyor... (Redis Only: ${REDIS_ONLY})`);
        const cacheResponse = await fetch(API_ENDPOINTS.PRODUCTS, {
            next: { revalidate: 60 }, // 60 saniye cache - build sırasında da çalışır
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (cacheResponse.ok) {
            const cacheData = await cacheResponse.json();
            if (cacheData.success && cacheData.products && cacheData.products.length > 0) {
                console.log(`[WooCommerce] ✅ Redis cache'den ${cacheData.products.length} ürün çekildi`);
                return cacheData.products;
            }
        }

        // Redis boş veya hata
        if (REDIS_ONLY) {
            console.log(`[WooCommerce] ⚠️ Redis cache boş ve REDIS_ONLY=true, boş dizi dönüyor`);
            return [];
        }

        console.log(`[WooCommerce] Cache boş veya hata, WooCommerce'den çekilecek...`);
    } catch (cacheError) {
        if (REDIS_ONLY) {
            console.log(`[WooCommerce] ❌ Redis erişilemedi ve REDIS_ONLY=true: ${cacheError}`);
            return [];
        }
        console.log(`[WooCommerce] ⚠️ Cache erişilemedi, fallback yapılıyor: ${cacheError}`);
    }

    // 2. Fallback: WooCommerce API'den direkt çek (sadece hybrid modda)
    try {
        let allProducts: any[] = [];
        let page = 1;
        const perPage = 100;

        while (true) {
            const response = await api.get("products", {
                page,
                per_page: perPage,
                status: "publish",
            });

            const products = response.data;
            allProducts = [...allProducts, ...products];

            console.log(`[WooCommerce] Sayfa ${page}: ${products.length} ürün çekildi (Toplam: ${allProducts.length})`);

            if (products.length < perPage) break;
            page++;
        }

        console.log(`[WooCommerce] Toplam ${allProducts.length} ürün WooCommerce'den çekildi.`);
        return allProducts;
    } catch (error) {
        console.error("WooCommerce getAllProducts Error:", error);
        return [];
    }
};


export const getProduct = async (slug: string) => {
    try {
        const response = await api.get("products", {
            slug,
        });
        return response.data[0] || null;
    } catch (error) {
        console.error("WooCommerce getProduct Error:", error);
        return null;
    }
};

export const getProductsByCategory = async (categorySlug: string, perPage = 20) => {
    try {
        // First get category ID from slug
        const catResponse = await api.get("products/categories", {
            slug: categorySlug,
        });
        const category = catResponse.data[0];

        if (!category) {
            console.error(`Category not found: ${categorySlug}`);
            return [];
        }

        const response = await api.get("products", {
            category: category.id,
            per_page: perPage,
            status: "publish",
        });
        return response.data;
    } catch (error) {
        console.error("WooCommerce getProductsByCategory Error:", error);
        return [];
    }
};

export const getBestSellers = async (perPage = 20) => {
    try {
        const response = await api.get("products", {
            orderby: "popularity",
            order: "desc",
            per_page: perPage,
            status: "publish",
        });
        return response.data;
    } catch (error) {
        console.error("WooCommerce getBestSellers Error:", error);
        return [];
    }
};

export const getCategories = async () => {
    try {
        const response = await api.get("products/categories", {
            per_page: 100,
        });
        return response.data;
    } catch (error) {
        console.error("WooCommerce getCategories Error:", error);
        return [];
    }
};

export const createOrder = async (data: any) => {
    try {
        const response = await api.post("orders", data);
        return response.data;
    } catch (error) {
        console.error("WooCommerce createOrder Error:", error);
        throw error;
    }
};

export default api;
