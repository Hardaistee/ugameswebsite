import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

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
