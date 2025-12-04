import type { Metadata } from 'next'
import './globals.css'
import Header from './components/Header'
import Footer from './components/Footer'
import CookieConsent from './components/CookieConsent'
import ThemeScript from './components/ThemeScript'
import BottomNav from './components/BottomNav'

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
    metadataBase: new URL('https://ugames.com'), // Update with your actual domain
    openGraph: {
        type: 'website',
        locale: 'tr_TR',
        url: 'https://ugames.com',
        siteName: 'uGames',
        title: 'uGames - Dijital Ürün Platformu',
        description: 'Oyun hesapları, e-pinler ve dijital ürünleri güvenilir şekilde alıp satın.',
        images: [
            {
                url: '/og-image.png', // You'll need to add this image to public/
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
        <html lang="tr">
            <head>
                <ThemeScript />
            </head>
            <body>
                <div className="min-h-screen flex flex-col" style={{ background: 'var(--bg)' }}>
                    <Header />
                    <main className="flex-1 w-full pb-20 md:pb-0">
                        {children}
                    </main>
                    <Footer />
                    <CookieConsent />
                    <BottomNav />
                </div>
            </body>
        </html>
    )
}
