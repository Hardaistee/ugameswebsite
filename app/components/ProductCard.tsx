'use client'
import React, { useState } from 'react'
import Link from 'next/link'

interface ProductCardProps {
  product: any
  size?: 'normal' | 'large'
}

export default function ProductCard({ product, size = 'normal' }: ProductCardProps) {
  const isLarge = size === 'large'
  const linkPath = `/oyun/${product.id}`
  const checkoutPath = `/odeme/${product.id}`

  return (
    <Link href={linkPath} className="block h-full group">
      <div
        className={`border rounded-lg overflow-hidden card-shadow hover:shadow-xl transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] h-full`}
        style={{
          background: 'var(--surface)',
          borderColor: 'var(--border)'
        }}
      >
        {/* Image Container */}
        <div
          className={`relative ${isLarge ? 'aspect-video' : 'aspect-square'} overflow-hidden flex items-center justify-center`}
          style={{ background: 'var(--bg)' }}
        >
          {/* Image */}
          <img
            src={product.images?.[0] || product.image}
            alt={product.title}
            className="w-full h-full object-cover transition-all duration-300 group-hover:scale-110"
          />

          {/* Discount Badge - Top Left */}
          {product.discount && (
            <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded shadow-lg">
              -%{product.discount}
            </div>
          )}

          {/* Hot Badge - Top Right */}
          {(product.badge === 'Çok Satan' || product.tags?.includes('Çok Satan')) && (
            <div className="absolute top-2 right-2 bg-gradient-to-r from-orange-500 to-red-500 text-white text-[10px] font-bold px-2 py-1 rounded shadow-lg">
              Hot
            </div>
          )}

          {/* Platform Badges */}
          {product.platform === 'PC' && (
            <div className="absolute bottom-2 left-2 bg-blue-600/90 text-white text-[10px] font-bold px-2 py-1 rounded backdrop-blur-sm">
              PC
            </div>
          )}
          {product.platform === 'PlayStation' && (
            <div className="absolute bottom-2 left-2 bg-blue-500/90 text-white text-[10px] font-bold px-2 py-1 rounded backdrop-blur-sm">
              PS
            </div>
          )}
          {product.platform === 'Xbox' && (
            <div className="absolute bottom-2 left-2 bg-green-600/90 text-white text-[10px] font-bold px-2 py-1 rounded backdrop-blur-sm">
              XBOX
            </div>
          )}
        </div>

        {/* Content */}
        <div className={`${isLarge ? 'p-4' : 'p-3'} flex flex-col flex-1`}>
          {/* Title */}
          <h3
            className={`font-semibold ${isLarge ? 'text-base mb-2' : 'text-sm mb-2'} line-clamp-2 group-hover:text-opacity-80 transition-colors`}
            style={{ color: 'var(--text)' }}
          >
            {product.title}
          </h3>

          {/* Large game description */}
          {isLarge && (
            <p className="text-xs mb-3 line-clamp-2" style={{ color: 'var(--muted)' }}>
              Anında teslimat garantisi
            </p>
          )}

          {/* Price Section */}
          <div className="flex items-center gap-2 mb-3">
            {product.oldPrice && (
              <span className={`${isLarge ? 'text-sm' : 'text-xs'} line-through`} style={{ color: 'var(--muted)' }}>
                ₺{product.oldPrice}
              </span>
            )}
            <span className={`${isLarge ? 'text-xl' : 'text-base'} font-bold price-text`}>
              ₺{product.price}
            </span>
            {isLarge && product.oldPrice && (
              <span className="text-xs" style={{ color: 'var(--muted)' }}>
                'den Başlayan Fiyatlarla
              </span>
            )}
          </div>

          {/* Action Button */}
          <div
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              window.location.href = checkoutPath
            }}
            className={`w-full text-center ${isLarge ? 'py-3' : 'py-2'} rounded font-semibold transition-all hover:scale-105 active:scale-95 text-sm cursor-pointer`}
            style={{
              background: 'var(--accent)',
              color: 'var(--bg)'
            }}
          >
            Hemen Al
          </div>
        </div>
      </div>
    </Link>
  )
}
