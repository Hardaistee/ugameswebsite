'use client'
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Icon from './Icon'

export default function MobileNav({ open, onClose }: { open: boolean, onClose: () => void }) {
  const pathname = usePathname()

  const categories = [
    { name: 'Anasayfa', path: '/oyunlar', icon: 'home', color: 'from-blue-500 to-cyan-500' },
    { name: 'PC Oyunları', path: '/oyun-ara?platform=pc', icon: 'gamepad', color: 'from-blue-500 to-cyan-500' },
    { name: 'PlayStation Oyunları', path: '/oyun-ara?platform=playstation', icon: 'gamepad', color: 'from-blue-500 to-indigo-500' },
    { name: 'Xbox Oyunları', path: '/oyun-ara?platform=xbox', icon: 'gamepad', color: 'from-green-500 to-emerald-500' },
    { name: 'İndirimdeki Oyunlar', path: '/oyun-ara?category=discounted', icon: 'fire', color: 'from-red-500 to-orange-500' },
    { name: 'Çok Satanlar', path: '/oyun-ara?category=bestsellers', icon: 'crown', color: 'from-yellow-500 to-orange-500' }
  ]

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
              src="/images/Yeni Proje-16.png"
              alt="uGames"
              className="h-8 w-auto"
            />
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            style={{ color: 'var(--text)' }}
            aria-label="Menüyü kapat"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Categories */}
        <div className="px-6 py-4">
          <div className="text-xs font-bold mb-3" style={{ color: 'var(--muted)' }}>
            OYUN KATEGORİLERİ
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
                      src="/images/pcicondark.png"
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
