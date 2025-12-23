import { Suspense } from 'react'
import { getAllGames } from '@/lib/games'
import GameSearchClient from '@/app/components/GameSearchClient'

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

