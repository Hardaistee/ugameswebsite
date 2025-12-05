'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { useCart } from '../../context/CartContext'

interface ProductCardProps {
  product: any
  variant?: 'game' | 'epin'
  size?: 'normal' | 'large'
}

export default function ProductCard({ product, variant = 'epin', size = 'normal' }: ProductCardProps) {
  const [fav, setFav] = useState(false)
  const [popping, setPopping] = useState(false)
  const [loaded, setLoaded] = useState(false)

  const isGame = variant === 'game'
  const isLarge = size === 'large'

  function handleFav(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    setFav(v => {
      const next = !v
      if (next) {
        setPopping(true)
        setTimeout(() => setPopping(false), 350)
      }
      return next
    })
  }

  const { addToCart } = useCart()

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()

    // Convert price string to expected format if needed, or pass as is
    addToCart({
      id: parseInt(product.id.toString().replace(/\D/g, '')) || Number(product.id),
      name: product.title || product.name,
      price: product.price ? product.price.toString() : '0',
      image: product.images?.[0] || product.image || '',
      quantity: 1,
      slug: product.slug || ''
    })

    // Optional: Show visual feedback (for now just alert or log)
    // alert('Sepete eklendi!')
  }

  const linkPath = product.slug ? `/urun/${product.slug}` : `/urun/${product.id}`

  return (
    <Link href={linkPath} className="block h-full group">
      <div
        className={`border rounded-lg overflow-hidden card-shadow hover:shadow-xl transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] h-full ${isLarge ? '' : ''
          }`}
        style={{
          background: 'var(--surface)',
          borderColor: 'var(--border)'
        }}
      >
        {/* Image Container */}
        <div
          className={`relative ${isGame
            ? (isLarge ? 'aspect-video' : 'aspect-square')
            : 'h-48'
            } overflow-hidden flex items-center justify-center`}
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
            <div className={`absolute ${isGame ? 'top-2 left-2' : 'left-0 top-3'} bg-red-500 text-white text-xs font-bold px-2 py-1 ${isGame ? 'rounded' : 'rounded-r-md'} shadow-lg`}>
              {isGame ? `-%${product.discount}` : `%${product.discount}`}
            </div>
          )}

          {/* Hot Badge - Top Right (for games) */}
          {isGame && (product.badge === 'Çok Satan' || product.tags?.includes('Çok Satan')) && (
            <div className="absolute top-2 right-2 bg-gradient-to-r from-orange-500 to-red-500 text-white text-[10px] font-bold px-2 py-1 rounded shadow-lg">
              Hot
            </div>
          )}

          {/* Vertical Badge - Left Side (for epin) */}
          {!isGame && product.badge && (
            <div
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-[10px] font-bold px-1.5 py-4 rounded-r-md shadow-lg"
              style={{ writingMode: 'vertical-rl', transform: 'translateY(-50%) rotate(180deg)' }}
            >
              <div className="whitespace-nowrap tracking-wider">
                {product.badge.toUpperCase()}
              </div>
            </div>
          )}

          {/* Platform Badges (for games) */}
          {isGame && product.platform === 'PC' && (
            <div className="absolute bottom-2 left-2 bg-blue-600/90 text-white text-[10px] font-bold px-2 py-1 rounded backdrop-blur-sm">
              PC
            </div>
          )}
          {isGame && product.platform === 'PlayStation' && (
            <div className="absolute bottom-2 left-2 bg-blue-500/90 text-white text-[10px] font-bold px-2 py-1 rounded backdrop-blur-sm">
              PS
            </div>
          )}
          {isGame && product.platform === 'Xbox' && (
            <div className="absolute bottom-2 left-2 bg-green-600/90 text-white text-[10px] font-bold px-2 py-1 rounded backdrop-blur-sm">
              XBOX
            </div>
          )}

          {/* Favorite Button (only for epin) */}
          {!isGame && (
            <button
              onClick={handleFav}
              aria-pressed={fav}
              className="absolute right-3 top-3 rounded-full p-1.5 shadow-md transition-transform hover:scale-110"
              title={fav ? 'Favorilerden çıkar' : 'Favorilere ekle'}
              style={{ background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(8px)' }}
            >
              <svg
                className={`w-5 h-5 transition-all ${fav ? 'text-red-500 scale-110' : 'text-gray-400'} ${popping ? 'pop' : ''}`}
                viewBox="0 0 24 24"
                fill={fav ? 'currentColor' : 'none'}
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M12 21s-7-4.35-9-7.5C1.5 10.8 4 7 7.5 7c1.9 0 3.5 1.2 4.5 3 1-1.8 2.6-3 4.5-3C20 7 22.5 10.8 21 13.5 19 16.65 12 21 12 21z" />
              </svg>
            </button>
          )}
        </div>

        {/* Content */}
        <div className={`${isLarge ? 'p-4' : 'p-3'} flex flex-col flex-1`}>
          {/* Seller (only for epin) */}
          {!isGame && product.seller && (
            <div className="text-sm mb-1" style={{ color: 'var(--muted)' }}>
              {product.seller}
            </div>
          )}

          {/* Title */}
          <h3
            className={`font-semibold ${isLarge ? 'text-base mb-2' : 'text-sm mb-2'} line-clamp-2 ${isGame ? 'group-hover:text-opacity-80' : 'min-h-[3rem]'
              } transition-colors`}
            style={{ color: 'var(--text)' }}
          >
            {product.title}
          </h3>

          {/* Large game description */}
          {isGame && isLarge && (
            <p className="text-xs mb-3 line-clamp-2" style={{ color: 'var(--muted)' }}>
              Anında teslimat garantisi
            </p>
          )}

          {/* Delivery Badge (for epin) */}
          {!isGame && product.deliveryBadge && (
            <div className="mt-3 flex items-center gap-1.5 text-xs text-green-600 dark:text-green-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span className="font-medium">{product.deliveryBadge}</span>
            </div>
          )}

          {/* Price Section */}
          <div className={`${isGame ? 'flex items-center gap-2 mb-3' : 'mt-auto pt-3 border-t'}`} style={!isGame ? { borderColor: 'var(--border)' } : {}}>
            {product.oldPrice && (
              <span className={`${isLarge ? 'text-sm' : 'text-xs'} line-through ${isGame ? '' : 'mb-1 block'}`} style={{ color: 'var(--muted)' }}>
                {isGame ? `₺${product.oldPrice}` : `${product.oldPrice} TL`}
              </span>
            )}
            <span className={`${isLarge ? 'text-xl' : isGame ? 'text-base' : 'text-xl'} font-bold price-text ${isGame ? '' : 'block'}`}>
              {isGame ? `₺${product.price}` : `${product.price} TL`}
            </span>
            {isGame && isLarge && product.oldPrice && (
              <span className="text-xs" style={{ color: 'var(--muted)' }}>
                'den Başlayan Fiyatlarla
              </span>
            )}
          </div>

          {/* Action Button (only for games) */}
          {isGame && (
            <button
              onClick={handleAddToCart}
              className={`w-full text-center ${isLarge ? 'py-3' : 'py-2'} rounded font-semibold transition-all hover:scale-105 active:scale-95 text-sm cursor-pointer border-none`}
              style={{
                background: 'var(--accent)',
                color: '#000'
              }}
            >
              Sepete Ekle
            </button>
          )}
        </div>
      </div>
    </Link>
  )
}
