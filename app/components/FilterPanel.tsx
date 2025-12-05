'use client'
import React, { useState } from 'react'
import Icon from './Icon'

export default function FilterPanel({ onChange, initial }: { onChange: any, initial: any }) {
  const [category, setCategory] = useState(initial.category || 'all')
  const [min, setMin] = useState(initial.min ?? 0)
  const [max, setMax] = useState(initial.max ?? 999999)
  const [tags, setTags] = useState<string[]>(initial.tags || [])
  const [sort, setSort] = useState(initial.sort || 'default')

  function toggleTag(t: string) {
    setTags(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t])
  }

  function applyFilters() {
    onChange({ category, min, max, tags, sort })
  }

  function resetFilters() {
    setCategory('all')
    setMin(0)
    setMax(999999)
    setTags([])
    setSort('default')
    onChange({ category: 'all', min: 0, max: 999999, tags: [], sort: 'default' })
  }

  return (
    <div className="rounded-xl overflow-hidden border" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
      {/* Header */}
      <div className="px-5 py-4 border-b" style={{ borderColor: 'var(--border)', background: 'linear-gradient(135deg, var(--surface) 0%, var(--bg) 100%)' }}>
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5" style={{ color: 'var(--accent)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          <h3 className="font-bold text-lg" style={{ color: 'var(--text)' }}>Filtreler</h3>
        </div>
      </div>

      <div className="p-5 space-y-6">
        {/* Category Filter */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-semibold" style={{ color: 'var(--text)' }}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
            Kategori
          </label>
          <div className="relative">
            <select
              value={category}
              onChange={e => setCategory(e.target.value)}
              className="w-full border rounded-lg px-4 py-2.5 appearance-none cursor-pointer transition-all focus:ring-2 focus:ring-offset-1 font-medium"
              style={{
                background: 'var(--bg)',
                borderColor: 'var(--border)',
                color: 'var(--text)',
                outline: 'none',
                fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial'
              }}
              onFocus={(e) => e.target.style.borderColor = 'var(--accent)'}
              onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
            >
              <option value="all">Tüm Kategoriler</option>
              <option value="sosyal-medya">Sosyal Medya</option>
              <option value="instagram">Instagram</option>
              <option value="tiktok">TikTok</option>
              <option value="youtube">YouTube</option>
              <option value="pubg">PUBG Mobile</option>
              <option value="valorant">Valorant</option>
              <option value="lol">League of Legends</option>
              <option value="cs2">Counter-Strike 2</option>
            </select>
            <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" style={{ color: 'var(--muted)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Tags Filter */}
        <div className="space-y-3">
          <label className="flex items-center gap-2 text-sm font-semibold" style={{ color: 'var(--text)' }}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
            </svg>
            Etiketler
          </label>
          <div className="flex flex-wrap gap-2">
            {[
              { name: 'Vitrin', icon: 'crown', color: 'from-yellow-500 to-orange-500' },
              { name: 'Çok Satan', icon: 'fire', color: 'from-red-500 to-pink-500' },
              { name: 'Fırsat', icon: 'zap', color: 'from-green-500 to-emerald-500' }
            ].map(t => (
              <button
                key={t.name}
                onClick={() => toggleTag(t.name)}
                className={`px-4 py-2 border rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105 active:scale-95 flex items-center gap-2 ${tags.includes(t.name)
                    ? `bg-gradient-to-r ${t.color} text-white border-transparent shadow-md`
                    : 'hover:border-current'
                  }`}
                style={tags.includes(t.name) ? {} : {
                  background: 'var(--surface)',
                  borderColor: 'var(--border)',
                  color: 'var(--text)'
                }}
              >
                <Icon name={t.icon} className="w-4 h-4" />
                {t.name}
              </button>
            ))}
          </div>
        </div>

        {/* Sort Filter */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-semibold" style={{ color: 'var(--text)' }}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
            </svg>
            Sıralama
          </label>
          <div className="relative">
            <select
              value={sort}
              onChange={e => setSort(e.target.value)}
              className="w-full border rounded-lg px-4 py-2.5 appearance-none cursor-pointer transition-all focus:ring-2 focus:ring-offset-1 font-medium"
              style={{
                background: 'var(--bg)',
                borderColor: 'var(--border)',
                color: 'var(--text)',
                outline: 'none',
                fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial'
              }}
              onFocus={(e) => e.target.style.borderColor = 'var(--accent)'}
              onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
            >
              <option value="default">Önerilen</option>
              <option value="price_asc">Fiyat: Düşükten Yükseğe</option>
              <option value="price_desc">Fiyat: Yüksekten Düşüğe</option>
              <option value="newest">En Yeniler</option>
            </select>
            <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" style={{ color: 'var(--muted)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Price Range Filter */}
        <div className="space-y-3">
          <label className="flex items-center gap-2 text-sm font-semibold" style={{ color: 'var(--text)' }}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Fiyat Aralığı (TL)
          </label>
          <div className="grid grid-cols-2 gap-3">
            <div className="relative flex items-center border rounded-lg transition-all"
              style={{
                background: 'var(--bg)',
                borderColor: 'var(--border)',
              }}
            >
              <input
                type="number"
                value={min}
                onChange={e => setMin(Number(e.target.value))}
                placeholder="Min"
                className="flex-1 bg-transparent px-4 py-2.5 font-medium outline-none border-none"
                style={{
                  color: 'var(--text)',
                }}
                onFocus={(e) => e.currentTarget.parentElement!.style.borderColor = 'var(--accent)'}
                onBlur={(e) => e.currentTarget.parentElement!.style.borderColor = 'var(--border)'}
              />
              <span className="pr-4 text-base font-semibold select-none whitespace-nowrap" style={{ color: 'var(--text)' }}>TL</span>
            </div>
            <div className="relative flex items-center border rounded-lg transition-all"
              style={{
                background: 'var(--bg)',
                borderColor: 'var(--border)',
              }}
            >
              <input
                type="number"
                value={max === 999999 ? '' : max}
                onChange={e => setMax(e.target.value ? Number(e.target.value) : 999999)}
                placeholder="Max"
                className="flex-1 bg-transparent px-4 py-2.5 font-medium outline-none border-none"
                style={{
                  color: 'var(--text)',
                }}
                onFocus={(e) => e.currentTarget.parentElement!.style.borderColor = 'var(--accent)'}
                onBlur={(e) => e.currentTarget.parentElement!.style.borderColor = 'var(--border)'}
              />
              <span className="pr-4 text-base font-semibold select-none whitespace-nowrap" style={{ color: 'var(--text)' }}>TL</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-5 pb-5 pt-2 flex gap-3">
        <button
          onClick={applyFilters}
          className="flex-1 text-white rounded-lg px-4 py-3 font-semibold transition-all duration-200 hover:shadow-lg hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2"
          style={{ background: 'var(--accent)', color: '#000' }}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Uygula
        </button>
        <button
          onClick={resetFilters}
          className="px-4 py-3 rounded-lg font-semibold transition-all duration-200 hover:scale-[1.02] active:scale-95 border flex items-center gap-2"
          style={{
            background: 'var(--surface)',
            borderColor: 'var(--border)',
            color: 'var(--muted)'
          }}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Sıfırla
        </button>
      </div>
    </div>
  )
}
