'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '../../context/AuthContext'
import Icon from './Icon'

export default function MobileNav({ open, onClose }: { open: boolean, onClose: () => void }) {
  const pathname = usePathname()
  const mode = process.env.NEXT_PUBLIC_HOMEPAGE_MODE || 'multiple'
  const { user, logout } = useAuth()

  // Context-aware kategoriler - oyun veya pazaryeri sayfasına göre
  const isGamesPage = pathname === '/oyunlar' ||
    pathname?.startsWith('/oyunlar') ||
    pathname?.startsWith('/oyun-ara') ||
    pathname?.startsWith('/oyun/') ||
    pathname?.startsWith('/odeme/') ||
    (mode === 'games_only' && pathname === '/')

  const gameCategories = [
    { name: 'Anasayfa', path: '/oyunlar', icon: 'home', color: 'from-blue-500 to-cyan-500' },
    { name: 'PC Oyunları', path: '/oyun-ara?platform=pc', icon: 'gamepad', color: 'from-blue-500 to-cyan-500' },
    { name: 'PlayStation Oyunları', path: '/oyun-ara?platform=playstation', icon: 'gamepad', color: 'from-blue-500 to-indigo-500' },
    { name: 'Xbox Oyunları', path: '/oyun-ara?platform=xbox', icon: 'gamepad', color: 'from-green-500 to-emerald-500' },
    { name: 'Oyun Keyleri', path: '/oyun-ara?category=game-keys', icon: 'key', color: 'from-purple-500 to-pink-500' },
    { name: 'İndirimdeki Oyunlar', path: '/oyun-ara?category=discounted', icon: 'fire', color: 'from-red-500 to-orange-500' }
  ]

  const marketplaceCategories = [
    { name: 'Anasayfa', path: '/pazaryeri', icon: 'home', color: 'from-pink-500 to-rose-500' },
    { name: 'Sosyal Medya', path: '/ilanlar?category=sosyal-medya', icon: 'mobile', color: 'from-pink-500 to-rose-500' },
    { name: 'PUBG', path: '/ilanlar?category=pubg', icon: 'gamepad', color: 'from-orange-500 to-red-500' },
    { name: 'Valorant', path: '/ilanlar?category=valorant', icon: 'target', color: 'from-red-500 to-pink-500' },
    { name: 'LoL', path: '/ilanlar?category=lol', icon: 'sword', color: 'from-blue-500 to-cyan-500' },
    { name: 'CS2', path: '/ilanlar?category=cs2', icon: 'gun', color: 'from-gray-600 to-gray-800' },
    { name: 'İlan Pazari', path: '/ilan-pazari', icon: 'shop', color: 'from-teal-500 to-cyan-500' },
    { name: 'Günün Fırsatları', path: '/ilanlar?badge=Günün Fırsatı', icon: 'fire', color: 'from-yellow-500 to-orange-500' },
    { name: 'Çekilisler', path: '/cekilisler', icon: 'gift', color: 'from-green-500 to-emerald-500' }
  ]

  // games_only modunda sadece oyun kategorileri, multiple modunda sayfa bazlı
  const categories = (mode === 'games_only' || isGamesPage) ? gameCategories : marketplaceCategories

  // Early return AFTER all hooks
  if (!open) return null

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

        {/* Auth Buttons / User Profile */}
        <div className="px-6 py-4 border-b" style={{ borderColor: 'var(--border)' }}>
          {user ? (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center text-lg text-white">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="font-bold" style={{ color: 'var(--text)' }}>{user.name}</div>
                  <div className="text-xs opacity-70" style={{ color: 'var(--muted)' }}>{user.email}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Link
                  href="/profil"
                  onClick={onClose}
                  className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg border border-transparent hover:border-gray-700 bg-white/5 transition-all text-sm font-medium"
                  style={{ color: 'var(--text)' }}
                >
                  <Icon name="user" className="w-4 h-4" />
                  Profilim
                </Link>
                <button
                  onClick={() => {
                    logout();
                    onClose();
                  }}
                  className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg border border-transparent bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-all text-sm font-medium"
                >
                  <Icon name="logout" className="w-4 h-4" />
                  Çıkış Yap
                </button>
              </div>
            </div>
          ) : (
            <div className="flex gap-3">
              <Link
                href="/giris"
                onClick={onClose}
                className="flex-1 px-4 py-2.5 rounded-lg font-semibold text-center transition-all hover:scale-[1.02] active:scale-95"
                style={{ background: 'var(--surface)', color: 'var(--text)', border: '1px solid var(--border)' }}
              >
                Giriş Yap
              </Link>
              <Link
                href="/kayit"
                onClick={onClose}
                className="flex-1 px-4 py-2.5 rounded-lg font-semibold text-center transition-all hover:scale-[1.02] active:scale-95"
                style={{ background: 'var(--accent)', color: '#000' }}
              >
                Kayıt Ol
              </Link>
            </div>
          )}
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
                  color: '#000'
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
                  color: '#000'
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
                  className={`relative overflow-hidden flex items-center gap-3 px-4 py-3 rounded-lg transition-all group ${isActive ? 'shadow-md' : ''}`}
                  style={isActive ? {
                    background: 'var(--surface)',
                    color: 'var(--accent)',
                    border: '1px solid var(--border)'
                  } : {
                    color: 'var(--text)'
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) e.currentTarget.style.background = 'var(--surface)'
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) e.currentTarget.style.background = 'transparent'
                  }}
                >
                  {/* Gradient background on hover/active */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${cat.color} opacity-0 group-hover:opacity-5 transition-opacity`} />

                  {/* Platform-specific icons */}
                  {cat.name === 'PC Oyunları' ? (
                    <img
                      src="/images/pciconlight.png"
                      alt="PC"
                      className="w-5 h-5 relative z-10"
                    />
                  ) : cat.name === 'PlayStation Oyunları' ? (
                    <img
                      src="/images/psicon.svg"
                      alt="PlayStation"
                      className="w-5 h-5 relative z-10"
                    />
                  ) : cat.name === 'Xbox Oyunları' ? (
                    <img
                      src="/images/xboxicon.svg"
                      alt="Xbox"
                      className="w-5 h-5 relative z-10"
                    />
                  ) : (
                    <Icon name={cat.icon} className="w-5 h-5 relative z-10" />
                  )}

                  <span className="font-medium relative z-10">{cat.name}</span>
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
