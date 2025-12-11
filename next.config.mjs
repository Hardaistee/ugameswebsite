/** @type {import('next').NextConfig} */
const nextConfig = {
    // Enable React strict mode for better development experience
    reactStrictMode: true,

    // Configure image optimization
    images: {
        // Remote patterns for external images (WooCommerce)
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'payment.ugames.com.tr',
                pathname: '/wp-content/uploads/**',
            },
            {
                protocol: 'https',
                hostname: 'pay.ugames.com.tr',
                pathname: '/wp-content/uploads/**',
            },
        ],
        // Optimize images with modern formats
        formats: ['image/avif', 'image/webp'],
        // Device sizes for responsive images
        deviceSizes: [640, 750, 828, 1080, 1200, 1920],
        imageSizes: [16, 32, 48, 64, 96, 128, 256],
    },

    // Environment variables
    env: {
        SKIP_SELECTION_SCREEN: process.env.NEXT_PUBLIC_SKIP_SELECTION_SCREEN,
    },
}

export default nextConfig
