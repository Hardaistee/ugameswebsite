import React from 'react'

export default function SellerCard({ seller, rating }: { seller: string, rating?: number }) {
  return (
    <div className="p-4 border rounded transition-all hover:shadow-lg hover:-translate-y-1" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all hover:scale-110" style={{ background: 'var(--bg)', color: 'var(--accent)', border: '2px solid var(--border)' }}>
          {seller.charAt(0).toUpperCase()}
        </div>
        <div>
          <div className="font-semibold" style={{ color: 'var(--text)' }}>{seller}</div>
          <div className="text-sm flex items-center gap-1" style={{ color: 'var(--muted)' }}>
            {rating ? (
              <>
                <span className="text-yellow-500">⭐</span>
                <span>{rating}</span>
              </>
            ) : (
              'Satıcı puanı yok'
            )}
          </div>
        </div>
      </div>
      <div className="mt-4 flex gap-2">
        <button className="flex-1 border rounded px-3 py-2 text-sm font-medium transition-all hover:scale-[1.02] inline-flex items-center justify-center gap-1" style={{ background: 'var(--bg)', borderColor: 'var(--border)', color: 'var(--text)' }}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          Mağaza
        </button>
        <button className="flex-1 rounded px-3 py-2 text-sm font-medium transition-all hover:scale-[1.02] hover:shadow-md inline-flex items-center justify-center gap-1" style={{ background: 'var(--accent)', color: '#000' }}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          Mesaj
        </button>
      </div>
    </div>
  )
}
