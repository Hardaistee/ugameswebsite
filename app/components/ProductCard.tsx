'use client'
import React from 'react'
import Link from 'next/link'

interface ProductCardProps {
  product: any
}

export default function ProductCard({ product }: ProductCardProps) {
  const linkPath = `/oyun/${product.id}`

  return (
    <Link href={linkPath} className="block h-full group">
      <div
        className="border rounded-lg overflow-hidden card-shadow hover:shadow-xl transition-all duration-300 hover:-translate-y-2 h-full flex flex-col"
        style={{
          background: 'var(--surface)',
          borderColor: 'var(--border)'
        }}
      >
        {/* Image Container */}
        <div
          className="relative aspect-square overflow-hidden flex items-center justify-center"
          style={{
            background: 'var(--bg)',
            backgroundImage: 'url(/images/placeholder.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <img
            src={product.images?.[0] || product.image}
            alt={product.title}
            className="w-full h-full object-contain transition-all duration-300 group-hover:scale-110"
          />

          {/* Hot Badge - Top Right */}
          {(product.categories?.includes('Çok Satan')) && (
            <div className="absolute top-2 right-2 bg-gradient-to-r from-orange-500 to-red-500 text-white text-[10px] font-bold px-2 py-1 rounded shadow-lg">
              Hot
            </div>
          )}

          {/* Platform Badge - Bottom Left */}
          {product.platform && (
            <div className={`absolute bottom-2 left-2 text-white text-[10px] font-bold px-2 py-1 rounded backdrop-blur-sm ${product.platform === 'PC' ? 'bg-blue-600/90' :
              product.platform === 'PlayStation' ? 'bg-blue-500/90' :
                'bg-green-600/90'
              }`}>
              {product.platform}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-2 md:p-3 flex flex-col flex-1">
          {/* Title */}
          <h3
            className="font-semibold text-xs md:text-sm mb-1 md:mb-2 line-clamp-2 group-hover:text-opacity-80 transition-colors"
            style={{ color: 'var(--text)' }}
          >
            {product.title}
          </h3>

          {/* Price Section */}
          <div className="flex items-center gap-1 md:gap-2 mb-2 md:mb-3 flex-wrap">
            <span className="text-sm md:text-base font-bold price-text">
              ₺{product.price}
            </span>
            {product.oldPrice && (
              <span className="text-[10px] md:text-xs line-through" style={{ color: 'var(--muted)' }}>
                ₺{product.oldPrice}
              </span>
            )}
            {product.discount && (
              <span className="text-[10px] md:text-xs font-semibold text-green-600">
                %{product.discount} indirim
              </span>
            )}
          </div>

          {/* Spacer to push button to bottom */}
          <div className="flex-1"></div>

          {/* Action Button */}
          <div
            className="w-full text-center py-1.5 md:py-2 rounded font-semibold transition-all hover:scale-105 active:scale-95 text-xs md:text-sm cursor-pointer mt-auto"
            style={{
              background: 'var(--accent)',
              color: 'var(--bg)'
            }}
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              window.location.href = `/odeme/${product.id}`
            }}
          >
            Hemen Al
          </div>
        </div>
      </div>
    </Link>
  )
}
