import React from 'react'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t mt-8" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
      <div className="container mx-auto px-4 py-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="font-bold text-lg mb-4" style={{ color: 'var(--text)' }}>uGames</h3>
            <p className="text-sm mb-4" style={{ color: 'var(--muted)' }}>
              Unifor Yazılım ve Teknoloji bünyesinde hizmet veren modern ve güvenilir dijital ürün alışveriş platformu.
              Oyun hesapları, sosyal medya hizmetleri ve daha fazlası.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                aria-label="Twitter"
                className="w-9 h-9 flex items-center justify-center rounded-lg transition-all hover:scale-110 hover:shadow-md"
                style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}
              >
                <svg className="w-4 h-4" style={{ color: 'var(--text)' }} fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="#"
                aria-label="Discord"
                className="w-9 h-9 flex items-center justify-center rounded-lg transition-all hover:scale-110 hover:shadow-md"
                style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}
              >
                <svg className="w-4 h-4" style={{ color: 'var(--text)' }} fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                </svg>
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="w-9 h-9 flex items-center justify-center rounded-lg transition-all hover:scale-110 hover:shadow-md"
                style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}
              >
                <svg className="w-4 h-4" style={{ color: 'var(--text)' }} fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <div className="font-semibold mb-4 text-sm" style={{ color: 'var(--text)' }}>Hızlı Erişim</div>
            <ul className="space-y-2.5 text-sm" style={{ color: 'var(--muted)' }}>
              <li><Link href="/ilanlar" className="hover:underline transition-colors hover:text-[var(--accent)]">Tüm İlanlar</Link></li>
              <li><Link href="/tek-oyunculu" className="hover:underline transition-colors hover:text-[var(--accent)]">Tek Oyunculu Oyunlar</Link></li>
              <li><Link href="/cekilisler" className="hover:underline transition-colors hover:text-[var(--accent)]">Çekilişler</Link></li>
              <li><Link href="/iletisim" className="hover:underline transition-colors hover:text-[var(--accent)]">Yardım Merkezi</Link></li>
              <li><Link href="/iletisim" className="hover:underline transition-colors hover:text-[var(--accent)]">İletişim</Link></li>
            </ul>
          </div>

          {/* Legal Documents */}
          <div>
            <div className="font-semibold mb-4 text-sm" style={{ color: 'var(--text)' }}>Yasal Bilgiler</div>
            <ul className="space-y-2.5 text-sm" style={{ color: 'var(--muted)' }}>
              <li><Link href="/hakkimizda" className="hover:underline transition-colors hover:text-[var(--accent)]">Hakkımızda</Link></li>
              <li><Link href="/gizlilik-politikasi" className="hover:underline transition-colors hover:text-[var(--accent)]">Gizlilik Sözleşmesi</Link></li>
              <li><Link href="/mesafeli-satis-sozlesmesi" className="hover:underline transition-colors hover:text-[var(--accent)]">Mesafeli Satış Sözleşmesi</Link></li>
              <li><Link href="/iade-kosullari" className="hover:underline transition-colors hover:text-[var(--accent)]">Teslimat ve İade Şartları</Link></li>
              <li><Link href="/kullanim-kosullari" className="hover:underline transition-colors hover:text-[var(--accent)]">Kullanım Koşulları</Link></li>
            </ul>
          </div>

          {/* Security & Payment */}
          <div>
            <div className="font-semibold mb-4 text-sm" style={{ color: 'var(--text)' }}>Güvenlik & Ödeme</div>

            {/* SSL Certificate Badge */}
            <div className="mb-4">
              <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
                <svg className="w-5 h-5" style={{ color: '#10b981' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <div>
                  <div className="text-xs font-bold" style={{ color: 'var(--text)' }}>SSL Sertifikası</div>
                  <div className="text-xs" style={{ color: 'var(--muted)' }}>256-bit Şifreleme</div>
                </div>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="text-xs font-semibold mb-2" style={{ color: 'var(--muted)' }}>Ödeme Yöntemleri</div>
            <div className="flex flex-wrap gap-3">
              {/* Visa Logo */}
              <div className="h-auto w-auto flex items-center justify-center rounded">
                <img src="/images/visa.svg" alt="Visa" className="h-12 w-12 object-contain p-1" />
              </div>

              {/* MasterCard Logo */}
              <div className="h-auto w-auto flex items-center justify-center rounded">
                <img src="/images/mastercard.svg" alt="MasterCard" className="h-12 w-12 object-contain p-1" />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t pt-6" style={{ borderColor: 'var(--border)' }}>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs" style={{ color: 'var(--muted)' }}>
            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
              <div className="text-center md:text-left">
                © {new Date().getFullYear()} Unifor Yazılım ve Teknoloji (uGames) — Modern dijital ürün platformu. Tüm hakları saklıdır.
              </div>
              {/* Location in bottom */}
              <div className="hidden md:flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5" style={{ color: 'var(--accent)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Antalya/Konyaaltı, Pınarbaşı Mah. Pınarbaşı Cd. No:46</span>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/gizlilik-politikasi" className="hover:underline transition-colors hover:text-[var(--accent)]">Gizlilik</Link>
              <span>•</span>
              <Link href="/kullanim-kosullari" className="hover:underline transition-colors hover:text-[var(--accent)]">Şartlar</Link>
              <span>•</span>
              <Link href="/gizlilik-politikasi" className="hover:underline transition-colors hover:text-[var(--accent)]">Çerezler</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
