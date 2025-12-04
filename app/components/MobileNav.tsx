'use client'
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Icon from './Icon'

export default function MobileNav({ open, onClose }: { open: boolean, onClose: () => void }) {
  if (!open) return null

  const pathname = usePathname()
  const mode = process.env.NEXT_PUBLIC_HOMEPAGE_MODE || 'marketplace'

  // Context-aware kategoriler - oyun veya pazaryeri sayfasına göre
  const isGamesPage = pathname === '/oyunlar' ||
    pathname?.startsWith('/oyunlar') ||
    pathname?.startsWith('/oyun-ara') ||
    pathname?.startsWith('/oyun/') ||
    pathname?.startsWith('/odeme/') ||
    (mode === 'games_only' && pathname === '/')

  const gameCategories = [
    { name: 'Anasayfa', path: '/oyunlar', icon: 'home' },
    { name: 'Tüm Oyunlar', path: '/oyun-ara', icon: 'gamepad' },
    { name: 'PC Oyunları', path: '/oyun-ara?platform=pc', icon: 'gamepad' },
    { name: 'PlayStation', path: '/oyun-ara?platform=playstation', icon: 'gamepad' },
    { name: 'Xbox', path: '/oyun-ara?platform=xbox', icon: 'gamepad' },
    { name: 'İndirimdekiler', path: '/oyun-ara?category=discounted', icon: 'fire' },
    { name: 'Çok Satanlar', path: '/oyun-ara?category=bestsellers', icon: 'crown' }
  ]

  const marketplaceCategories = [
    { name: 'Anasayfa', path: '/pazaryeri', icon: 'home' },
    { name: 'Sosyal Medya', path: '/ilanlar?category=sosyal-medya', icon: 'mobile' },
    { name: 'PUBG', path: '/ilanlar?category=pubg', icon: 'gamepad' },
    { name: 'Valorant', path: '/ilanlar?category=valorant', icon: 'target' },
    { name: 'LoL', path: '/ilanlar?category=lol', icon: 'sword' },
    { name: 'CS2', path: '/cs2-skin-pazari', icon: 'gun' },
    { name: 'İlan Pazarı', path: '/ilan-pazari', icon: 'shop' },
    { name: 'Günün Fırsatları', path: '/ilanlar?badge=Günün Fırsatı', icon: 'fire' }
  ]

  // games_only modunda sadece oyun kategorileri, multiple modunda sayfa bazlı
  const categories = (mode === 'games_only' || isGamesPage) ? gameCategories : marketplaceCategories

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="absolute left-0 top-0 bottom-0 w-80 max-w-[85vw] shadow-2xl overflow-auto animate-slide-in" style={{ background: 'var(--bg)' }}>
        {/* Header */}
        <div className="sticky top-0 z-10 px-6 py-4 border-b flex items-center justify-between" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
          <div className="flex items-center gap-3">
            <img
              src="/images/Yeni Proje-17.png"
              alt="uGames"
              className="h-8 w-auto"
            />
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
            style={{ color: 'var(--text)' }}
            aria-label="Menüyü kapat"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Auth Buttons */}
        <div className="px-6 py-4 border-b" style={{ borderColor: 'var(--border)' }}>
          <div className="flex gap-3">
            <Link
              href="/login"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 rounded-lg font-semibold text-center transition-all hover:scale-[1.02] active:scale-95"
              style={{ background: 'var(--surface)', color: 'var(--text)', border: '1px solid var(--border)' }}
            >
              Giriş Yap
            </Link>
            <Link
              href="/register"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 rounded-lg font-semibold text-center transition-all hover:scale-[1.02] active:scale-95"
              style={{ background: 'var(--accent)', color: 'var(--bg)' }}
            >
              Kayıt Ol
            </Link>
          </div>
        </div>

        {/* Page Selector - Sadece multiple modda göster */}
        {mode === 'multiple' && (
          <div className="px-6 py-4 border-b" style={{ borderColor: 'var(--border)' }}>
            <div className="text-xs font-bold mb-3" style={{ color: 'var(--muted)' }}>SAYFA SEÇİMİ</div>
            <div className="grid grid-cols-2 gap-2">
              <Link
                href="/oyunlar"
                onClick={onClose}
                className={`px-4 py-3 rounded-lg font-semibold text-sm text-center transition-all ${isGamesPage ? 'shadow-lg' : 'opacity-70'}`}
                style={isGamesPage ? {
                  background: 'var(--accent)',
                  color: 'var(--bg)'
                } : {
                  background: 'var(--surface)',
                  color: 'var(--text)',
                  border: '1px solid var(--border)'
                }}
              >
                Oyunlar
              </Link>
              <Link
                href="/pazaryeri"
                onClick={onClose}
                className={`px-4 py-3 rounded-lg font-semibold text-sm text-center transition-all ${!isGamesPage ? 'shadow-lg' : 'opacity-70'}`}
                style={!isGamesPage ? {
                  background: 'var(--accent)',
                  color: 'var(--bg)'
                } : {
                  background: 'var(--surface)',
                  color: 'var(--text)',
                  border: '1px solid var(--border)'
                }}
              >
                Pazaryeri
              </Link>
            </div>
          </div>
        )}

        {/* Categories */}
        <div className="px-6 py-4">
          <div className="text-xs font-bold mb-3" style={{ color: 'var(--muted)' }}>
            {isGamesPage ? 'OYUN KATEGORİLERİ' : 'PAZARYERI KATEGORİLERİ'}
          </div>
          <nav className="flex flex-col gap-1">
            {categories.map((cat) => {
              const isActive = pathname === cat.path || pathname?.startsWith(cat.path)
              return (
                <Link
                  key={cat.name}
                  href={cat.path}
                  onClick={onClose}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive ? 'shadow-md' : 'hover:bg-gray-100 dark:hover:bg-white/5'}`}
                  style={isActive ? {
                    background: 'var(--surface)',
                    color: 'var(--accent)',
                    border: '1px solid var(--border)'
                  } : {
                    color: 'var(--text)'
                  }}
                >
                  <Icon name={cat.icon} className="w-5 h-5" />
                  <span className="font-medium">{cat.name}</span>
                </Link>
              )
            })}
          </nav>
        </div>

        {/* Footer Links */}
        <div className="px-6 py-4 border-t mt-auto" style={{ borderColor: 'var(--border)' }}>
          <div className="text-xs font-bold mb-3" style={{ color: 'var(--muted)' }}>BİLGİ</div>
          <div className="flex flex-col gap-2">
            <Link href="/hakkimizda" onClick={onClose} className="text-sm py-2" style={{ color: 'var(--text)' }}>Hakkımızda</Link>
            <Link href="/iletisim" onClick={onClose} className="text-sm py-2" style={{ color: 'var(--text)' }}>İletişim</Link>
            <Link href="/gizlilik-politikasi" onClick={onClose} className="text-sm py-2" style={{ color: 'var(--text)' }}>Gizlilik Politikası</Link>
            <Link href="/kullanim-kosullari" onClick={onClose} className="text-sm py-2" style={{ color: 'var(--text)' }}>Kullanım Koşulları</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
