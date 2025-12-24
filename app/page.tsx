import { Suspense } from 'react'
import { Metadata } from 'next'
import { getAllGames } from '@/lib/games'
import GamesPageClient from './components/GamesPageClient'

export const metadata: Metadata = {
    title: 'uGames - Dijital Oyun Mağazası | PC, PlayStation, Xbox Oyunları',
    description: 'uGames ile en uygun fiyatlı dijital oyun kodlarını satın alın. PC, PlayStation ve Xbox oyunları için anında teslimat, güvenli ödeme. Steam, Epic Games, PSN ve Xbox Game Pass kodları.',
    keywords: ['dijital oyun', 'oyun kodu', 'steam', 'playstation', 'xbox', 'pc oyunları', 'indirimli oyun'],
    openGraph: {
        title: 'uGames - Dijital Oyun Mağazası',
        description: 'En uygun fiyatlı dijital oyun kodları. Anında teslimat, güvenli ödeme.',
        type: 'website',
        url: 'https://ugames.com.tr',
    }
}

export const revalidate = 60; // Revalidate data every 60 seconds

export default async function HomePage() {
    // Fetch data directly from Redis (via Data Access Layer)
    const games = await getAllGames();

    return (
        <Suspense fallback={
            <div className="min-h-screen pb-12 flex items-center justify-center" style={{ background: 'var(--bg)' }}>
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4" style={{ borderColor: 'var(--accent)' }}></div>
                    <p style={{ color: 'var(--muted)' }}>Yükleniyor...</p>
                </div>
            </div>
        }>
            <GamesPageClient allProducts={games} />
        </Suspense>
    )
}
