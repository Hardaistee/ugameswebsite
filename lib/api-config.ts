// Frontend API Configuration
// Tüm API çağrıları bu dosyadan yapılmalı

export const API_CONFIG = {
    // Backend API URL
    BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001',

    // WooCommerce URL (sadece bilgi amaçlı, lib/woocommerce.ts'de kullanılıyor)
    WOOCOMMERCE_URL: process.env.NEXT_PUBLIC_WOOCOMMERCE_URL || '',
};

// Backend API endpoint'leri
export const API_ENDPOINTS = {
    // Auth
    LOGIN: `${API_CONFIG.BACKEND_URL}/api/auth/login`,
    REGISTER: `${API_CONFIG.BACKEND_URL}/api/auth/register`,

    // User
    PROFILE: `${API_CONFIG.BACKEND_URL}/api/user/profile`,
    ORDERS: `${API_CONFIG.BACKEND_URL}/api/user/orders`,

    // Products (Redis Cache)
    PRODUCTS: `${API_CONFIG.BACKEND_URL}/api/products`,
    CACHE_STATUS: `${API_CONFIG.BACKEND_URL}/api/cache/status`,
    CACHE_REFRESH: `${API_CONFIG.BACKEND_URL}/api/cache/refresh`,

    // Blog
    BLOGS: `${API_CONFIG.BACKEND_URL}/api/blogs`,
    BLOG_BY_SLUG: (slug: string) => `${API_CONFIG.BACKEND_URL}/api/blogs/${slug}`,

    // Chat (AI Assistant)
    CHAT: `${API_CONFIG.BACKEND_URL}/api/chat`,
};

// Helper function for API calls
export const getApiUrl = (endpoint: string) => `${API_CONFIG.BACKEND_URL}${endpoint}`;
