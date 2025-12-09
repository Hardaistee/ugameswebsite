'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import MobileNav from './MobileNav'
import Icon from './Icon'
import { useCart } from '../../context/CartContext'
import { useAuth } from '../../context/AuthContext'

export default function Header() {
  const [open, setOpen] = useState(false)
  const [showCategoryPanel, setShowCategoryPanel] = useState(false)
  const [showCS2Panel, setShowCS2Panel] = useState(false)
  const [showUserPanel, setShowUserPanel] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { user, logout } = useAuth()

  // Export setOpen to window for BottomNav to use
  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).__openMobileMenu = () => setOpen(true)
    }
  }, [])

  useEffect(() => {
    setMounted(true)
    // Always use dark mode
    document.documentElement.classList.add('dark')
  }, [])

  const router = useRouter()
  const pathname = usePathname()

  // Homepage modunu kontrol et
  const mode = process.env.NEXT_PUBLIC_HOMEPAGE_MODE || 'marketplace'
  const isGamesPage = pathname === '/oyunlar' ||
    pathname?.startsWith('/oyunlar') ||
    pathname?.startsWith('/oyun-ara') ||
    pathname?.startsWith('/oyun/') ||
    pathname?.startsWith('/odeme/') ||
    (mode === 'games_only' && pathname === '/')

  // Sayfa moduna ve games_only ayarına göre kategoriler
  const categories = (isGamesPage || mode === 'games_only') ? [
    { name: 'PC Oyunları', path: '/oyun-ara?platform=pc', icon: 'gamepad', color: 'from-blue-500 to-cyan-500' },
    { name: 'PlayStation Oyunları', path: '/oyun-ara?platform=playstation', icon: 'gamepad', color: 'from-blue-500 to-indigo-500' },
    { name: 'Xbox Oyunları', path: '/oyun-ara?platform=xbox', icon: 'gamepad', color: 'from-green-500 to-emerald-500' },
    { name: 'Oyun Keyleri', path: '/oyun-ara?category=game-keys', icon: 'key', color: 'from-purple-500 to-pink-500' },
    { name: 'İndirimdeki Oyunlar', path: '/oyun-ara?category=discounted', icon: 'fire', color: 'from-red-500 to-orange-500' }
  ] : [
    { name: 'Sosyal Medya', path: '/ilanlar?category=sosyal-medya', icon: 'mobile', color: 'from-pink-500 to-rose-500' },
    { name: 'PUBG', path: '/ilanlar?category=pubg', icon: 'gamepad', color: 'from-orange-500 to-red-500' },
    { name: 'Valorant', path: '/ilanlar?category=valorant', icon: 'valorant', color: 'from-red-500 to-pink-500' },
    { name: 'LoL', path: '/ilanlar?category=lol', icon: 'sword', color: 'from-blue-500 to-cyan-500' },
    { name: 'CS2', path: '/ilanlar?category=cs2', icon: 'gun', color: 'from-gray-600 to-gray-800' },
    { name: 'İlan Pazarı', path: '/ilan-pazari', icon: 'shop', color: 'from-teal-500 to-cyan-500' },
    { name: 'Günün Fırsatları', path: '/ilanlar?badge=Günün Fırsatı', icon: 'fire', color: 'from-yellow-500 to-orange-500' },
    { name: 'Çekilişler', path: '/cekilisler', icon: 'gift', color: 'from-green-500 to-emerald-500' }
  ]

  function onSearchSubmit(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      const q = (e.target as HTMLInputElement).value.trim()
      // Oyun sayfasındaysa oyun arama sayfasına yönlendir
      if (isGamesPage) {
        router.push(`/oyun-ara${q ? `?search=${encodeURIComponent(q)}` : ''}`)
      } else {
        router.push(`/ilanlar${q ? `?search=${encodeURIComponent(q)}` : ''}`)
      }
    }
  }

  const { cart } = useCart()
  const cartItemCount = cart.reduce((acc: number, item: any) => acc + item.quantity, 0)

  return (
    <>
      <header className="border-b" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
        {/* TIER 1: Top Info Bar */}
        <div className="hidden md:block border-b" style={{ borderColor: 'var(--border)', background: 'var(--bg)' }}>
          <div className="max-w-6xl mx-auto px-4 py-1.5">
            <div className="flex items-center justify-between text-xs" style={{ color: 'var(--muted)' }}>
              {/* Left: Contact Info */}
              <div className="flex items-center gap-4">
                <a href="mailto:support@unifor.info" className="flex items-center gap-1.5 hover:text-[var(--accent)] transition-colors">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  support@unifor.info
                </a>
                <span className="text-[var(--border)]">|</span>
                <div className="flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Güvenli Alışveriş - SSL Sertifikalı
                </div>
              </div>

              {/* Right: Blog + Social Media */}
              <div className="flex items-center gap-4">
                <Link href="/blog" className="hover:text-[var(--accent)] transition-colors font-medium">
                  Blog
                </Link>
                <span className="text-[var(--border)]">|</span>
                <div className="flex items-center gap-3">
                  <a href="#" className="hover:text-[var(--accent)] transition-colors" aria-label="Instagram">
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </a>
                  <a href="#" className="hover:text-[var(--accent)] transition-colors" aria-label="Twitter">
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>
                  <a href="#" className="hover:text-[var(--accent)] transition-colors" aria-label="Discord">
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* TIER 2: Main Navigation */}
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-4">
          <div className="flex items-center gap-3">
            <button aria-label="Mobil menüyü aç" onClick={() => setOpen(true)} className="lg:hidden p-2 rounded hover:bg-gray-100 dark:hover:bg-white/5">
              {/* hamburger */}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            <Link href="/" className="flex items-center">
              <img
                src="/images/Yeni Proje-17.png"
                alt="uGames Logo"
                className="h-10 w-auto"
              />
            </Link>
          </div>

          <div className="hidden lg:block flex-1 px-4">
            <input
              aria-label="Ara"
              placeholder="Arama yapın..."
              onKeyDown={onSearchSubmit}
              className="w-full border rounded px-3 py-2"
              style={{ background: 'var(--bg)', borderColor: 'var(--border)', color: 'var(--text)' }}
            />
          </div>


          <div className="ml-auto flex items-center gap-2">
            {/* Cart Icon */}
            <Link
              href="/sepet"
              className="relative p-2 rounded hover:bg-gray-100 dark:hover:bg-white/5 mr-1"
              aria-label="Sepet"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {mounted && cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-sm">
                  {cartItemCount}
                </span>
              )}
            </Link>

            <div className="hidden sm:flex items-center gap-3">
              {user ? (
                <div
                  className="relative"
                  onMouseEnter={() => setShowUserPanel(true)}
                  onMouseLeave={() => setShowUserPanel(false)}
                >
                  <button
                    aria-label="Kullanıcı menüsü"
                    aria-expanded={showUserPanel}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium focus:outline-none hover:bg-white/5 transition-colors min-h-[44px]"
                    style={{ color: 'var(--text)' }}
                  >
                    <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-xs text-white">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="hidden md:inline">{user.name}</span>
                    <svg className={`w-4 h-4 opacity-70 transition-transform ${showUserPanel ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* User Dropdown */}
                  {showUserPanel && (
                    <div
                      className="absolute top-full right-0 mt-1 w-52 rounded-lg shadow-xl border overflow-hidden z-50 animate-slide-in"
                      style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}
                    >
                      <div className="p-3 border-b" style={{ borderColor: 'var(--border)', background: 'var(--bg)' }}>
                        <div className="font-bold text-sm truncate">{user.name}</div>
                        <div className="text-xs opacity-70 truncate">{user.email}</div>
                      </div>
                      <Link
                        href="/profil"
                        className="flex items-center gap-2 px-4 py-3 text-sm hover:bg-white/5 transition-colors"
                        style={{ color: 'var(--text)' }}
                      >
                        <Icon name="user" className="w-4 h-4" />
                        Profilim
                      </Link>
                      <Link
                        href="/profil"
                        className="flex items-center gap-2 px-4 py-3 text-sm hover:bg-white/5 transition-colors"
                        style={{ color: 'var(--text)' }}
                      >
                        <Icon name="shop" className="w-4 h-4" />
                        Siparişlerim
                      </Link>
                      <button
                        onClick={logout}
                        className="w-full flex items-center gap-2 px-4 py-3 text-sm text-red-500 hover:bg-red-500/10 transition-colors text-left border-t"
                        style={{ borderColor: 'var(--border)' }}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Çıkış Yap
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <Link href="/giris" className="text-sm whitespace-nowrap hover:underline" style={{ color: 'var(--text)' }}>Giriş Yap</Link>
                  <Link href="/kayit" className="px-3 py-2 rounded text-sm transition-transform hover:scale-105 whitespace-nowrap font-medium" style={{ background: 'var(--accent)', color: '#000' }}>Kayıt Ol</Link>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="lg:hidden px-4 py-3 border-t" style={{ borderColor: 'var(--border)' }}>
          <input
            aria-label="Ara"
            placeholder={isGamesPage ? "Oyun ara..." : "Ara..."}
            onKeyDown={onSearchSubmit}
            className="w-full border rounded-lg px-4 py-2.5"
            style={{
              background: 'var(--bg)',
              borderColor: 'var(--border)',
              color: 'var(--text)',
              fontSize: '16px' // Prevents iOS zoom
            }}
          />
        </div>

        {/* TIER 3: Category Navigation Bar - Hidden on Mobile */}
        <div className="hidden md:block border-t" style={{ borderColor: 'var(--border)', background: 'var(--bg)' }}>
          <div className="max-w-6xl mx-auto px-4">
            <nav className="flex items-center gap-3 py-2 justify-center">
              {/* Kategoriler Dropdown Button - Sol tarafta */}
              <div
                className="relative"
                onMouseEnter={() => setShowCategoryPanel(true)}
                onMouseLeave={() => setShowCategoryPanel(false)}
              >
                <button
                  aria-label="Kategoriler menüsü"
                  aria-expanded={showCategoryPanel}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap text-sm font-bold transition-all hover:scale-105 relative overflow-hidden group min-h-[44px]"
                  style={{
                    color: 'var(--text)',
                    background: 'var(--surface)'
                  }}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                  <span>Kategoriler</span>
                  <svg className={`w-3 h-3 transition-transform ${showCategoryPanel ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown Panel */}
                {showCategoryPanel && (
                  <div
                    className="absolute top-full left-0 mt-0.5 w-80 rounded-lg shadow-2xl border overflow-hidden z-50 animate-slide-in"
                    style={{
                      background: 'var(--surface)',
                      borderColor: 'var(--border)'
                    }}
                  >
                    <div className="p-4 border-b" style={{ borderColor: 'var(--border)', background: 'var(--bg)' }}>
                      <h3 className="font-bold text-base flex items-center gap-2" style={{ color: 'var(--text)' }}>
                        <svg className="w-5 h-5" style={{ color: 'var(--accent)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                        </svg>
                        Tüm Kategoriler
                      </h3>
                      <p className="text-xs mt-1" style={{ color: 'var(--muted)' }}>Keşfetmek için bir kategori seçin</p>
                    </div>
                    <div className="p-2 max-h-96 overflow-y-auto scrollbar-hide">
                      {categories.map((cat) => (
                        <Link
                          key={cat.name}
                          href={cat.path}
                          className="flex items-center gap-3 px-3 py-3 rounded-lg transition-all hover:scale-[1.02] relative overflow-hidden group"
                          style={{
                            color: 'var(--text)',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'var(--bg)'
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'transparent'
                          }}
                        >
                          {/* Gradient background on hover */}
                          <div className={`absolute inset-0 bg-gradient-to-r ${cat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />

                          <div
                            className="w-11 h-11 rounded-lg flex items-center justify-center relative z-10 shadow-md"
                            style={{
                              background: 'rgba(255, 255, 255, 0.1)'
                            }}
                          >
                            {cat.name === 'PC Oyunları' ? (
                              <img
                                src="/images/pciconlight.png"
                                alt="PC"
                                className="w-5 h-5"
                              />
                            ) : cat.name === 'PlayStation Oyunları' ? (
                              <img
                                src="/images/psicon.svg"
                                alt="PlayStation"
                                className="w-5 h-5"
                              />
                            ) : cat.name === 'Xbox Oyunları' ? (
                              <img
                                src="/images/xboxicon.svg"
                                alt="Xbox"
                                className="w-5 h-5"
                              />
                            ) : (
                              <Icon name={cat.icon} className="w-5 h-5" style={{ color: 'var(--accent)' }} />
                            )}
                          </div>


                          <div className="flex-1 relative z-10">
                            <div className="font-semibold text-sm">{cat.name}</div>
                            <div className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>
                              {isGamesPage ? (
                                <>
                                  {cat.name === 'PC Oyunları' && 'Steam, Epic Games, Origin'}
                                  {cat.name === 'PlayStation Oyunları' && 'PS4, PS5 Oyunları'}
                                  {cat.name === 'Xbox Oyunları' && 'Xbox One, Series X/S'}
                                  {cat.name === 'Oyun Keyleri' && 'Random Steam Keyleri'}
                                  {cat.name === 'İndirimdeki Oyunlar' && 'Sınırlı Süreli İndirimler'}
                                  {cat.name === 'Çok Satanlar' && 'En Popüler Oyunlar'}
                                </>
                              ) : (
                                <>
                                  {cat.name === 'Sosyal Medya' && 'Instagram, TikTok, Twitter'}
                                  {cat.name === 'PUBG' && 'UC, Hesaplar, Skinler'}
                                  {cat.name === 'Valorant' && 'VP, Hesaplar, Skinler'}
                                  {cat.name === 'LoL' && 'RP, Hesaplar, Skinler'}
                                  {cat.name === 'CS2' && 'Hesaplar, Skinler, Prime'}
                                  {cat.name === 'İlan Pazarı' && 'Tüm İlanlar'}
                                  {cat.name === 'Günün Fırsatları' && 'Sınırlı Süreli İndirimler'}
                                  {cat.name === 'Çekilişler' && 'Ücretsiz Kazanç Fırsatları'}
                                </>
                              )}
                            </div>
                          </div>

                          <svg className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity relative z-10" style={{ color: 'var(--accent)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      ))}
                    </div>

                    <div className="p-3 border-t" style={{ borderColor: 'var(--border)', background: 'var(--bg)' }}>
                      <Link
                        href={isGamesPage ? "/oyunlar" : "/ilanlar"}
                        className="block text-center py-2.5 px-4 rounded-lg font-semibold text-sm transition-all hover:scale-[1.02] hover:shadow-lg"
                        style={{
                          background: 'var(--accent)',
                          color: '#1a1a1a'
                        }}
                      >
                        {isGamesPage ? 'Tüm Oyunları Gör →' : 'Tüm İlanları Gör →'}
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Tüm Kategoriler - Orijinal linkler */}
              {categories.map((cat) => {
                // CS2 için özel dropdown - sadece ilan pazarı sayfalarında
                if (cat.name === 'CS2' && !isGamesPage) {
                  return (
                    <div
                      key={cat.name}
                      className="relative"
                      onMouseEnter={() => setShowCS2Panel(true)}
                      onMouseLeave={() => setShowCS2Panel(false)}
                    >
                      <button
                        className="flex items-center gap-1.5 px-3 py-2 rounded-lg whitespace-nowrap text-sm font-medium transition-all hover:scale-105 relative overflow-hidden group"
                        style={{ color: 'var(--text)', background: showCS2Panel ? 'var(--surface)' : 'transparent' }}
                      >
                        <div className={`absolute inset-0 bg-gradient-to-r ${cat.color} opacity-0 group-hover:opacity-10 transition-opacity`} />
                        <Icon name={cat.icon} className="w-4 h-4 relative z-10" style={{ color: 'var(--accent)' }} />
                        <span className="relative z-10">{cat.name}</span>
                        <svg className={`w-3 h-3 relative z-10 transition-transform ${showCS2Panel ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>

                      {/* CS2 Dropdown Panel */}
                      {showCS2Panel && (
                        <div
                          className="absolute top-full left-0 mt-0.5 w-72 rounded-lg shadow-2xl border overflow-hidden z-50 animate-slide-in"
                          style={{
                            background: 'var(--surface)',
                            borderColor: 'var(--border)'
                          }}
                        >
                          <div className="p-3 border-b" style={{ borderColor: 'var(--border)', background: 'var(--bg)' }}>
                            <h3 className="font-bold text-sm flex items-center gap-2" style={{ color: 'var(--text)' }}>
                              <Icon name="gun" className="w-4 h-4" style={{ color: 'var(--accent)' }} />
                              CS2 Kategorileri
                            </h3>
                          </div>
                          <div className="p-2">
                            <Link
                              href="/cs2-skin-pazari"
                              className="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all hover:scale-[1.02] relative overflow-hidden group"
                              style={{ color: 'var(--text)' }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.background = 'var(--bg)'
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.background = 'transparent'
                              }}
                            >
                              <div
                                className="w-9 h-9 rounded-lg flex items-center justify-center shadow-sm"
                                style={{
                                  background: 'rgba(255, 255, 255, 0.1)'
                                }}
                              >
                                <Icon name="gun" className="w-5 h-5" style={{ color: 'var(--accent)' }} />
                              </div>
                              <div className="flex-1">
                                <div className="font-semibold text-sm">CS2 Skin Pazarı</div>
                                <div className="text-xs" style={{ color: 'var(--muted)' }}>Silah skinleri</div>
                              </div>
                            </Link>

                            <Link
                              href="/cs2-hesap"
                              className="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all hover:scale-[1.02] relative overflow-hidden group"
                              style={{ color: 'var(--text)' }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.background = 'var(--bg)'
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.background = 'transparent'
                              }}
                            >
                              <div
                                className="w-9 h-9 rounded-lg flex items-center justify-center shadow-sm"
                                style={{
                                  background: 'rgba(255, 255, 255, 0.1)'
                                }}
                              >
                                <Icon name="user" className="w-5 h-5" style={{ color: 'var(--accent)' }} />
                              </div>
                              <div className="flex-1">
                                <div className="font-semibold text-sm">CS2 Hesap</div>
                                <div className="text-xs" style={{ color: 'var(--muted)' }}>Prime hesaplar</div>
                              </div>
                            </Link>

                            <Link
                              href="/cs2-kasa"
                              className="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all hover:scale-[1.02] relative overflow-hidden group"
                              style={{ color: 'var(--text)' }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.background = 'var(--bg)'
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.background = 'transparent'
                              }}
                            >
                              <div
                                className="w-9 h-9 rounded-lg flex items-center justify-center shadow-sm"
                                style={{
                                  background: 'rgba(255, 255, 255, 0.1)'
                                }}
                              >
                                <Icon name="shop" className="w-5 h-5" style={{ color: 'var(--accent)' }} />
                              </div>
                              <div className="flex-1">
                                <div className="font-semibold text-sm">CS2 Kasa</div>
                                <div className="text-xs" style={{ color: 'var(--muted)' }}>Kasalar ve anahtarlar</div>
                              </div>
                            </Link>
                          </div>
                        </div>
                      )}
                    </div>
                  )
                }

                // Diğer kategoriler için normal link
                return (
                  <Link
                    key={cat.name}
                    href={cat.path}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-lg whitespace-nowrap text-sm font-medium transition-all hover:scale-105 relative overflow-hidden group"
                    style={{ color: 'var(--text)' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'var(--surface)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent'
                    }}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-r ${cat.color} opacity-0 group-hover:opacity-10 transition-opacity`} />
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
                      <Icon name={cat.icon} className="w-5 h-5 relative z-10" style={{ color: 'var(--accent)' }} />
                    )}
                    <span className="relative z-10">{cat.name}</span>
                  </Link>
                )
              })}
            </nav>
          </div>
        </div>
      </header>

      <MobileNav open={open} onClose={() => setOpen(false)} />
    </>
  )
}
