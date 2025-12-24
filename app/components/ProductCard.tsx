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
        className="border rounded-lg overflow-hidden card-shadow hover:shadow-xl transition-all duration-300 hover:-translate-y-2 h-full"
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

          {/* Discount Badge - Top Left */}
          {product.discount && (
            <div className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded shadow-lg">
              -%{product.discount}
            </div>
          )}

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
        <div className="p-2 md:p-3">
          {/* Title */}
          <h3
            className="font-semibold text-xs md:text-sm mb-1 md:mb-2 line-clamp-2 group-hover:text-opacity-80 transition-colors"
            style={{ color: 'var(--text)' }}
          >
            {product.title}
          </h3>

          {/* Price Section */}
          <div className="flex items-center gap-1 md:gap-2 mb-2 md:mb-3">
            {product.oldPrice && (
              <span className="text-[10px] md:text-xs line-through" style={{ color: 'var(--muted)' }}>
                ₺{product.oldPrice}
              </span>
            )}
            <span className="text-sm md:text-base font-bold price-text">
              ₺{product.price}
            </span>
          </div>

          {/* Action Button */}
          <div
            className="w-full text-center py-1.5 md:py-2 rounded font-semibold transition-all hover:scale-105 active:scale-95 text-xs md:text-sm cursor-pointer"
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
