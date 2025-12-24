import { Suspense } from 'react'
import { Metadata } from 'next'
import { getAllGames } from '@/lib/games'
import GameSearchClient from '@/app/components/GameSearchClient'

export const metadata: Metadata = {
  title: 'Oyun Ara | uGames',
  description: 'PC, PlayStation ve Xbox için dijital oyun kodlarını arayın ve satın alın. İndirimli oyunlar, çok satanlar ve tüm kategorilerde binlerce oyun.',
  keywords: ['oyun ara', 'dijital oyun', 'indirimli oyunlar', 'pc oyunları', 'playstation oyunları', 'xbox oyunları'],
  openGraph: {
    title: 'Oyun Ara | uGames',
    description: 'Binlerce dijital oyun arasından arama yapın.',
    type: 'website',
    url: 'https://ugames.com.tr/oyun-ara',
  }
}

export const revalidate = 60; // Revalidate data every 60 seconds

export default async function GameSearch() {
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
      <GameSearchClient allGames={games} />
    </Suspense>
  )
}

