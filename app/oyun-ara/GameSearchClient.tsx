'use client'
import React, { useMemo, useState, useEffect, useRef, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import ProductCard from '../components/ProductCard'

interface GameSearchClientProps {
    products: any[]
}

function GameSearchContent({ products: allProducts }: GameSearchClientProps) {
    const searchParams = useSearchParams()
    const router = useRouter()

    // URL'den parametreleri oku
    function parseFromQuery() {
        const q = new URLSearchParams(searchParams?.toString() || "")
        const search = q.get('search') || ''
        const category = q.get('category') || 'all'
        const platform = q.get('platform') || 'all'
        const min = Number(q.get('min') || 0)
        const max = Number(q.get('max') || 999999)
        const sort = q.get('sort') || 'default'
        const filter = q.get('filter') || ''
        return { search, category, platform, min, max, sort, filter }
    }

    const [filters, setFilters] = useState(() => parseFromQuery())
    const [visibleCount, setVisibleCount] = useState(12)
    const [showMobileFilters, setShowMobileFilters] = useState(false)

    // URL değiştiğinde filtreleri güncelle
    useEffect(() => {
        const parsed = parseFromQuery()
        setFilters(parsed)
    }, [searchParams?.toString() || ""])

    // Oyunları filtrele ve sırala
    const games = useMemo(() => {
        let list = allProducts.filter(game => {
            // Arama filtresi
            if (filters.search) {
                const query = filters.search.toLowerCase()
                const titleMatch = game.title?.toLowerCase().includes(query) || game.name?.toLowerCase().includes(query)
                if (!titleMatch) return false
            }

            // Platform filtresi
            if (filters.platform !== 'all') {
                if (filters.platform === 'pc' && game.platform !== 'PC') return false
                if (filters.platform === 'playstation' && game.platform !== 'PlayStation') return false
                if (filters.platform === 'xbox' && game.platform !== 'Xbox') return false
            }

            // Kategori filtresi
            if (filters.category !== 'all') {
                if (filters.category === 'discounted' && !game.discount) return false
                if (filters.category === 'bestsellers' && game.badge !== 'Çok Satan' && !game.tags?.some((t: any) => t.name === 'Çok Satan')) return false
                if (filters.category === 'pc' && game.platform !== 'PC') return false
                if (filters.category === 'playstation' && game.platform !== 'PlayStation') return false
                if (filters.category === 'xbox' && game.platform !== 'Xbox') return false
                if (filters.category === 'game-keys' && !game.categories?.some((c: any) => c.slug === 'random-oyun-keyleri')) return false
            }

            // Filter query param (for bestsellers link etc)
            if (filters.filter === 'bestsellers') {
                if (game.badge !== 'Çok Satan' && game.total_sales < 10) return false
            }

            // Fiyat filtresi
            if (game.price < filters.min) return false
            if (game.price > filters.max) return false

            return true
        })

        // Sıralama
        if (filters.sort === 'price_asc') list = list.sort((a, b) => a.price - b.price)
        else if (filters.sort === 'price_desc') list = list.sort((a, b) => b.price - a.price)
        else if (filters.sort === 'newest') list = list.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0))
        else if (filters.sort === 'name_asc') list = list.sort((a, b) => (a.title || '').localeCompare(b.title || ''))
        else if (filters.sort === 'name_desc') list = list.sort((a, b) => (b.title || '').localeCompare(a.title || ''))

        return list
    }, [allProducts, filters])

    // Filtreleri URL'e senkronize et
    useEffect(() => {
        const q = new URLSearchParams()
        if (filters.search) q.set('search', filters.search)
        if (filters.category && filters.category !== 'all') q.set('category', filters.category)
        if (filters.platform && filters.platform !== 'all') q.set('platform', filters.platform)
        if (filters.min) q.set('min', String(filters.min))
        if (filters.max && filters.max < 999999) q.set('max', String(filters.max))
        if (filters.sort && filters.sort !== 'default') q.set('sort', filters.sort)
        if (filters.filter) q.set('filter', filters.filter)
        router.replace(`/oyun-ara?${q.toString()}`)
    }, [filters, router])

    const visible = games.slice(0, visibleCount)
    const modalRef = useRef<HTMLDivElement | null>(null)

    // Focus trap for mobile filters
    useEffect(() => {
        if (!showMobileFilters) return
        const root = modalRef.current
        if (!root) return

        const focusableSelector = 'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
        const nodeList = root.querySelectorAll(focusableSelector)
        const nodes: HTMLElement[] = Array.prototype.slice.call(nodeList)
        const first = nodes[0]
        const last = nodes[nodes.length - 1]

        function onKey(e: any) {
            if (e.key === 'Escape') {
                setShowMobileFilters(false)
            } else if (e.key === 'Tab') {
                if (nodes.length === 0) {
                    e.preventDefault()
                    return
                }
                if (e.shiftKey) {
                    if (document.activeElement === first) {
                        e.preventDefault()
                        last.focus()
                    }
                } else {
                    if (document.activeElement === last) {
                        e.preventDefault()
                        first.focus()
                    }
                }
            }
        }

        const prev = document.body.style.overflow
        document.body.style.overflow = 'hidden'

        setTimeout(() => first && first.focus(), 50)
        document.addEventListener('keydown', onKey)
        return () => {
            document.removeEventListener('keydown', onKey)
            document.body.style.overflow = prev
        }
    }, [showMobileFilters])

    // Get page title based on filters
    const pageTitle = useMemo(() => {
        if (filters.search) return `"${filters.search}" için sonuçlar`
        if (filters.platform === 'pc') return 'PC Oyunları'
        if (filters.platform === 'playstation') return 'PlayStation Oyunları'
        if (filters.platform === 'xbox') return 'Xbox Oyunları'
        if (filters.category === 'bestsellers' || filters.filter === 'bestsellers') return 'Çok Satanlar'
        if (filters.category === 'discounted') return 'İndirimdeki Oyunlar'
        if (filters.category === 'game-keys') return 'Oyun Keyleri'
        return 'Oyun Ara'
    }, [filters])

    return (
        <div className="min-h-screen pb-12" style={{ background: 'var(--bg)' }}>
            <div className="max-w-7xl mx-auto px-4 py-6">
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 mb-4 text-sm">
                    <Link href="/" className="hover:underline" style={{ color: 'var(--muted)' }}>Ana Sayfa</Link>
                    <span style={{ color: 'var(--muted)' }}>/</span>
                    <Link href="/oyunlar" className="hover:underline" style={{ color: 'var(--muted)' }}>Oyunlar</Link>
                    {(filters.platform !== 'all' || filters.category !== 'all' || filters.filter) && (
                        <>
                            <span style={{ color: 'var(--muted)' }}>/</span>
                            <span className="font-medium" style={{ color: 'var(--text)' }}>
                                {pageTitle}
                            </span>
                        </>
                    )}
                </div>

                {/* Header Section */}
                <div className="mb-6">
                    <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--text)' }}>
                        {pageTitle}
                    </h1>
                    <p className="text-sm" style={{ color: 'var(--muted)' }}>{games.length} oyun bulundu</p>
                </div>

                {/* Mobile filter button */}
                <div className="lg:hidden mb-4">
                    <button
                        onClick={() => setShowMobileFilters(true)}
                        aria-expanded={showMobileFilters}
                        aria-controls="mobile-filter-dialog"
                        className="w-full px-4 py-3 border rounded-lg font-semibold transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2"
                        style={{
                            background: 'var(--surface)',
                            borderColor: 'var(--border)',
                            color: 'var(--text)'
                        }}
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                        </svg>
                        Filtrele ve Sırala
                    </button>
                </div>

                <div className="lg:flex lg:gap-5">
                    {/* Sidebar Filters - Desktop only */}
                    <aside className="hidden lg:block w-80 flex-shrink-0">
                        <div className="sticky top-6">
                            <div className="rounded-xl overflow-hidden border" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
                                <div className="px-5 py-4 border-b" style={{ borderColor: 'var(--border)' }}>
                                    <h3 className="font-bold text-lg" style={{ color: 'var(--text)' }}>Filtreler</h3>
                                </div>

                                <div className="p-5 space-y-6">
                                    {/* Platform Filter */}
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold" style={{ color: 'var(--text)' }}>Platform</label>
                                        <select
                                            value={filters.platform}
                                            onChange={e => setFilters(prev => ({ ...prev, platform: e.target.value }))}
                                            className="w-full border rounded-lg px-4 py-2.5 appearance-none cursor-pointer transition-all focus:ring-2 focus:ring-offset-1 font-medium"
                                            style={{
                                                background: 'var(--bg)',
                                                borderColor: 'var(--border)',
                                                color: 'var(--text)',
                                                outline: 'none'
                                            }}
                                        >
                                            <option value="all">Tüm Platformlar</option>
                                            <option value="pc">PC</option>
                                            <option value="playstation">PlayStation</option>
                                            <option value="xbox">Xbox</option>
                                        </select>
                                    </div>

                                    {/* Category Filter */}
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold" style={{ color: 'var(--text)' }}>Kategori</label>
                                        <select
                                            value={filters.category}
                                            onChange={e => setFilters(prev => ({ ...prev, category: e.target.value }))}
                                            className="w-full border rounded-lg px-4 py-2.5 appearance-none cursor-pointer transition-all focus:ring-2 focus:ring-offset-1 font-medium"
                                            style={{
                                                background: 'var(--bg)',
                                                borderColor: 'var(--border)',
                                                color: 'var(--text)',
                                                outline: 'none'
                                            }}
                                        >
                                            <option value="all">Tüm Kategoriler</option>
                                            <option value="discounted">İndirimdeki Oyunlar</option>
                                            <option value="bestsellers">Çok Satanlar</option>
                                            <option value="game-keys">Oyun Keyleri</option>
                                        </select>
                                    </div>

                                    {/* Price Range */}
                                    <div className="space-y-3">
                                        <label className="text-sm font-semibold" style={{ color: 'var(--text)' }}>Fiyat Aralığı (TL)</label>
                                        <div className="grid grid-cols-2 gap-3">
                                            <input
                                                type="number"
                                                value={filters.min || ''}
                                                onChange={e => setFilters(prev => ({ ...prev, min: Number(e.target.value) }))}
                                                placeholder="Min"
                                                className="border rounded-lg px-4 py-2.5 font-medium outline-none transition-all"
                                                style={{
                                                    background: 'var(--bg)',
                                                    borderColor: 'var(--border)',
                                                    color: 'var(--text)'
                                                }}
                                            />
                                            <input
                                                type="number"
                                                value={filters.max === 999999 ? '' : filters.max}
                                                onChange={e => setFilters(prev => ({ ...prev, max: e.target.value ? Number(e.target.value) : 999999 }))}
                                                placeholder="Max"
                                                className="border rounded-lg px-4 py-2.5 font-medium outline-none transition-all"
                                                style={{
                                                    background: 'var(--bg)',
                                                    borderColor: 'var(--border)',
                                                    color: 'var(--text)'
                                                }}
                                            />
                                        </div>
                                    </div>

                                    {/* Sort */}
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold" style={{ color: 'var(--text)' }}>Sıralama</label>
                                        <select
                                            value={filters.sort}
                                            onChange={e => setFilters(prev => ({ ...prev, sort: e.target.value }))}
                                            className="w-full border rounded-lg px-4 py-2.5 appearance-none cursor-pointer transition-all focus:ring-2 focus:ring-offset-1 font-medium"
                                            style={{
                                                background: 'var(--bg)',
                                                borderColor: 'var(--border)',
                                                color: 'var(--text)',
                                                outline: 'none'
                                            }}
                                        >
                                            <option value="default">Önerilen</option>
                                            <option value="price_asc">Fiyat: Düşükten Yükseğe</option>
                                            <option value="price_desc">Fiyat: Yüksekten Düşüğe</option>
                                            <option value="newest">En Yeniler</option>
                                            <option value="name_asc">İsme Göre: A-Z</option>
                                            <option value="name_desc">İsme Göre: Z-A</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </aside>

                    <div className="flex-1 min-w-0">
                        {/* Sort dropdown - desktop only */}
                        <div className="hidden lg:flex items-center justify-between mb-4">
                            <div className="text-sm" style={{ color: 'var(--muted)' }}>
                                {games.length} sonuç gösteriliyor
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-medium" style={{ color: 'var(--text)' }}>Sırala:</span>
                                <select
                                    value={filters.sort}
                                    onChange={e => setFilters(prev => ({ ...prev, sort: e.target.value }))}
                                    className="border rounded-lg px-4 py-2 pr-10 appearance-none cursor-pointer text-sm font-medium transition-all focus:ring-2 focus:ring-offset-1"
                                    style={{
                                        background: 'var(--surface)',
                                        borderColor: 'var(--border)',
                                        color: 'var(--text)',
                                        outline: 'none'
                                    }}
                                >
                                    <option value="default">Önerilen</option>
                                    <option value="price_asc">Fiyat: Düşükten Yükseğe</option>
                                    <option value="price_desc">Fiyat: Yüksekten Düşüğe</option>
                                    <option value="newest">En Yeniler</option>
                                    <option value="name_asc">İsme Göre: A-Z</option>
                                    <option value="name_desc">İsme Göre: Z-A</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid gap-4 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {visible.map((game, i) => (
                                <div key={game.id} className="staggered-item h-full" style={{ ['--i' as any]: i }}>
                                    <ProductCard product={game} variant="game" size="normal" />
                                </div>
                            ))}
                        </div>

                        {visible.length === 0 && (
                            <div className="mt-12 text-center">
                                <div className="inline-flex flex-col items-center gap-4 p-8 rounded-xl" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                                    <svg className="w-16 h-16" style={{ color: 'var(--muted)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <div>
                                        <p className="font-semibold text-lg mb-1" style={{ color: 'var(--text)' }}>Oyun bulunamadı</p>
                                        <p className="text-sm" style={{ color: 'var(--muted)' }}>Filtreleri değiştirmeyi deneyin</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {visibleCount < games.length && (
                            <div className="mt-8 text-center">
                                <button
                                    onClick={() => setVisibleCount(c => c + 12)}
                                    className="px-6 py-3 border rounded-lg font-semibold transition-all hover:scale-[1.02] active:scale-95 inline-flex items-center gap-2"
                                    style={{
                                        background: 'var(--surface)',
                                        borderColor: 'var(--border)',
                                        color: 'var(--text)'
                                    }}
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                    Daha Fazla Yükle
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile filter modal */}
            {showMobileFilters && (
                <div className="fixed inset-0 bg-black/50 overlay-backdrop flex items-end lg:hidden z-50 animate-in fade-in duration-200" role="presentation" onClick={() => setShowMobileFilters(false)}>
                    <div
                        id="mobile-filter-dialog"
                        ref={modalRef}
                        role="dialog"
                        aria-modal="true"
                        aria-label="Filtreler"
                        className="w-full max-h-[90vh] overflow-auto rounded-t-2xl animate-in slide-in-from-bottom duration-300"
                        style={{ background: 'var(--surface)' }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="sticky top-0 z-10 px-5 py-4 border-b flex items-center justify-between" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
                            <h3 className="font-bold text-lg" style={{ color: 'var(--text)' }}>Filtreler</h3>
                            <button
                                aria-label="Filtreleri kapat"
                                onClick={() => setShowMobileFilters(false)}
                                className="p-2 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-white/5"
                                style={{ color: 'var(--text)' }}
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="p-4 space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold" style={{ color: 'var(--text)' }}>Platform</label>
                                <select
                                    value={filters.platform}
                                    onChange={e => setFilters(prev => ({ ...prev, platform: e.target.value }))}
                                    className="w-full border rounded-lg px-4 py-2.5"
                                    style={{ background: 'var(--bg)', borderColor: 'var(--border)', color: 'var(--text)' }}
                                >
                                    <option value="all">Tüm Platformlar</option>
                                    <option value="pc">PC</option>
                                    <option value="playstation">PlayStation</option>
                                    <option value="xbox">Xbox</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold" style={{ color: 'var(--text)' }}>Kategori</label>
                                <select
                                    value={filters.category}
                                    onChange={e => setFilters(prev => ({ ...prev, category: e.target.value }))}
                                    className="w-full border rounded-lg px-4 py-2.5"
                                    style={{ background: 'var(--bg)', borderColor: 'var(--border)', color: 'var(--text)' }}
                                >
                                    <option value="all">Tüm Kategoriler</option>
                                    <option value="discounted">İndirimdeki Oyunlar</option>
                                    <option value="bestsellers">Çok Satanlar</option>
                                    <option value="game-keys">Oyun Keyleri</option>
                                </select>
                            </div>
                            <div className="space-y-3">
                                <label className="text-sm font-semibold" style={{ color: 'var(--text)' }}>Fiyat Aralığı (TL)</label>
                                <div className="grid grid-cols-2 gap-3">
                                    <input
                                        type="number"
                                        value={filters.min || ''}
                                        onChange={e => setFilters(prev => ({ ...prev, min: Number(e.target.value) }))}
                                        placeholder="Min"
                                        className="border rounded-lg px-4 py-2.5"
                                        style={{ background: 'var(--bg)', borderColor: 'var(--border)', color: 'var(--text)' }}
                                    />
                                    <input
                                        type="number"
                                        value={filters.max === 999999 ? '' : filters.max}
                                        onChange={e => setFilters(prev => ({ ...prev, max: e.target.value ? Number(e.target.value) : 999999 }))}
                                        placeholder="Max"
                                        className="border rounded-lg px-4 py-2.5"
                                        style={{ background: 'var(--bg)', borderColor: 'var(--border)', color: 'var(--text)' }}
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold" style={{ color: 'var(--text)' }}>Sıralama</label>
                                <select
                                    value={filters.sort}
                                    onChange={e => setFilters(prev => ({ ...prev, sort: e.target.value }))}
                                    className="w-full border rounded-lg px-4 py-2.5"
                                    style={{ background: 'var(--bg)', borderColor: 'var(--border)', color: 'var(--text)' }}
                                >
                                    <option value="default">Önerilen</option>
                                    <option value="price_asc">Fiyat: Düşükten Yükseğe</option>
                                    <option value="price_desc">Fiyat: Yüksekten Düşüğe</option>
                                    <option value="newest">En Yeniler</option>
                                    <option value="name_asc">İsme Göre: A-Z</option>
                                    <option value="name_desc">İsme Göre: Z-A</option>
                                </select>
                            </div>
                            <button
                                onClick={() => setShowMobileFilters(false)}
                                className="w-full py-3 rounded-lg font-semibold"
                                style={{ background: 'var(--accent)', color: '#000' }}
                            >
                                Uygula
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default function GameSearchClient({ products }: GameSearchClientProps) {
    return (
        <Suspense fallback={
            <div className="min-h-screen pb-12 flex items-center justify-center" style={{ background: 'var(--bg)' }}>
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4" style={{ borderColor: 'var(--accent)' }}></div>
                    <p style={{ color: 'var(--muted)' }}>Yükleniyor...</p>
                </div>
            </div>
        }>
            <GameSearchContent products={products} />
        </Suspense>
    )
}
