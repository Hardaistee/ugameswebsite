import SelectionPage from './selection/page'
import GamesPage from './oyunlar/page'

export default function HomePage() {
    // Ana sayfa modu: 'games_only' (sadece oyunlar) veya 'multiple' (seçim paneli)
    const mode = process.env.NEXT_PUBLIC_HOMEPAGE_MODE || 'multiple'

    // games_only: Direkt oyunlar sayfasını göster, pazaryeri erişimi yok
    if (mode === 'games_only') {
        return <GamesPage />
    }

    // multiple: Seçim paneli göster (Oyunlar veya Pazaryeri seçimi)
    return <SelectionPage />
}
