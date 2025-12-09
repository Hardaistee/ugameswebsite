import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { CartProvider } from '../context/CartContext'
import { AuthProvider } from '../context/AuthContext'
import Header from './components/Header'
import Footer from './components/Footer'
import CookieConsent from './components/CookieConsent'
import ThemeScript from './components/ThemeScript'
import BottomNav from './components/BottomNav'
import ChatWidget from './components/ChatWidget'

// Next.js Font Optimization - Self-hosted, no render blocking
const inter = Inter({
    subsets: ['latin', 'latin-ext'],
    weight: ['400', '500', '600', '700', '800', '900'],
    display: 'swap',
    variable: '--font-inter',
})

export const metadata: Metadata = {
    title: {
        default: 'uGames - Dijital Ürün Platformu',
        template: '%s | uGames'
    },
    description: 'Oyun hesapları, e-pinler ve dijital ürünleri güvenilir şekilde alıp satın. CS2, Valorant, PUBG ve daha fazlası.',
    keywords: ['oyun hesabı', 'epin', 'dijital ürün', 'cs2', 'valorant', 'pubg', 'steam', 'oyun'],
    authors: [{ name: 'uGames' }],
    creator: 'uGames',
    publisher: 'uGames',
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    metadataBase: new URL('https://ugames.com.tr'),
    openGraph: {
        type: 'website',
        locale: 'tr_TR',
        url: 'https://ugames.com.tr',
        siteName: 'uGames',
        title: 'uGames - Dijital Ürün Platformu',
        description: 'Oyun hesapları, e-pinler ve dijital ürünleri güvenilir şekilde alıp satın.',
        images: [
            {
                url: '/og-image.png',
                width: 1200,
                height: 630,
                alt: 'uGames',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'uGames - Dijital Ürün Platformu',
        description: 'Oyun hesapları, e-pinler ve dijital ürünleri güvenilir şekilde alıp satın.',
    },
    icons: {
        icon: '/images/favicon.png',
        shortcut: '/images/favicon.png',
        apple: '/images/favicon.png',
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="tr" className={inter.variable} suppressHydrationWarning>
            <head>
                {/* Accessibility: Theme color for mobile browsers */}
                <meta name="theme-color" content="#1c1c1c" />

                {/* Performance: DNS prefetch for API */}
                <link rel="dns-prefetch" href="https://ugames.com.tr" />

                <ThemeScript />
            </head>
            <body className={`${inter.className} flex flex-col min-h-screen antialiased`}>
                <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-black focus:rounded">
                    Ana içeriğe atla
                </a>
                <AuthProvider>
                    <CartProvider>
                        <Header />
                        <main id="main-content" className="flex-grow pt-16" role="main">
                            {children}
                        </main>
                        <Footer />
                        <BottomNav />
                        <ChatWidget />
                        <CookieConsent />
                    </CartProvider>
                </AuthProvider>
            </body>
        </html>
    )
}

