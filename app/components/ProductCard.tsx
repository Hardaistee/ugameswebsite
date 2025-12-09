'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useCart } from '../../context/CartContext'

interface ProductCardProps {
  product: any
  variant?: 'game' | 'epin'
  size?: 'normal' | 'large'
}

export default function ProductCard({ product, variant = 'epin', size = 'normal' }: ProductCardProps) {
  const [fav, setFav] = useState(false)
  const [popping, setPopping] = useState(false)
  const [imageError, setImageError] = useState(false)

  const isGame = variant === 'game'
  const isLarge = size === 'large'
  const linkPath = product.slug ? `/urun/${product.slug}` : `/urun/${product.id}`

  // Get image source
  const imageSrc = product.images?.[0] || product.image || ''

  // Format price with 2 decimal places
  const formatPrice = (price: any) => {
    const num = parseFloat(price)
    return isNaN(num) ? '0.00' : num.toFixed(2)
  }

  function handleFav(e: React.MouseEvent | React.TouchEvent) {
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
  const [buttonState, setButtonState] = useState<'idle' | 'success' | 'exiting'>('idle')

  // Sepete Ekle Butonu
  function handleAddToCart(e: React.MouseEvent | React.TouchEvent) {
    e.preventDefault()
    e.stopPropagation()

    if (buttonState !== 'idle') return

    addToCart({
      id: parseInt(product.id.toString().replace(/\D/g, '')) || Number(product.id),
      name: product.title || product.name,
      price: product.price ? product.price.toString() : '0',
      image: product.images?.[0] || product.image || '',
      quantity: 1,
      slug: product.slug || ''
    })

    setButtonState('success')
    setTimeout(() => {
      setButtonState('exiting')
      setTimeout(() => setButtonState('idle'), 300)
    }, 2000)
  }

  return (
    <Link
      href={linkPath}
      className="block h-full group cursor-pointer select-none"
      style={{ WebkitTapHighlightColor: 'transparent' }}
    >
      <div
        className={`border rounded-lg overflow-hidden card-shadow h-full flex flex-col transition-all duration-200
          active:scale-[0.98]
          md:hover:shadow-xl 
          md:hover:-translate-y-1 
          md:hover:scale-[1.01]
        `}
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
          {/* Optimized Image with Next.js */}
          {imageSrc && !imageError ? (
            <Image
              src={imageSrc}
              alt={product.title || product.name || 'Product'}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
              className="object-cover transition-all duration-300 md:group-hover:scale-110"
              loading="lazy"
              quality={75}
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-800">
              <span className="text-gray-500 text-sm">Resim yok</span>
            </div>
          )}

          {/* ... Badges and Overlays (Aynı kalıyor) ... */}

          {/* Hot Badge */}
          {isGame && (product.badge === 'Çok Satan' || product.tags?.includes('Çok Satan')) && (
            <div className="absolute top-2 right-2 bg-gradient-to-r from-orange-500 to-red-500 text-white text-[10px] font-bold px-2 py-1 rounded shadow-lg pointer-events-none">
              Hot
            </div>
          )}

          {/* Vertical Badge */}
          {!isGame && product.badge && (
            <div
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-[10px] font-bold px-1.5 py-4 rounded-r-md shadow-lg pointer-events-none"
              style={{ writingMode: 'vertical-rl', transform: 'translateY(-50%) rotate(180deg)' }}
            >
              <div className="whitespace-nowrap tracking-wider">
                {product.badge.toUpperCase()}
              </div>
            </div>
          )}

          {/* Platform Badges */}
          {isGame && product.platform === 'PC' && (
            <div className="absolute bottom-2 left-2 bg-blue-600/90 text-white text-[10px] font-bold px-2 py-1 rounded backdrop-blur-sm pointer-events-none">
              PC
            </div>
          )}
          {isGame && product.platform === 'PlayStation' && (
            <div className="absolute bottom-2 left-2 bg-blue-500/90 text-white text-[10px] font-bold px-2 py-1 rounded backdrop-blur-sm pointer-events-none">
              PS
            </div>
          )}
          {isGame && product.platform === 'Xbox' && (
            <div className="absolute bottom-2 left-2 bg-green-600/90 text-white text-[10px] font-bold px-2 py-1 rounded backdrop-blur-sm pointer-events-none">
              XBOX
            </div>
          )}

          {/* Favorite Button */}
          {!isGame && (
            <button
              onClick={handleFav}
              onTouchEnd={(e) => {
                e.stopPropagation()
                handleFav(e as any)
              }}
              aria-pressed={fav}
              aria-label={fav ? 'Favorilerden çıkar' : 'Favorilere ekle'}
              className="absolute right-3 top-3 rounded-full p-2 shadow-md transition-transform md:hover:scale-110 min-w-[44px] min-h-[44px] flex items-center justify-center z-10"
              style={{ background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(8px)', touchAction: 'manipulation' }}
            >
              <svg
                className={`w-5 h-5 transition-all ${fav ? 'text-red-500 scale-110' : 'text-gray-400'} ${popping ? 'pop' : ''}`}
                viewBox="0 0 24 24"
                fill={fav ? 'currentColor' : 'none'}
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden="true"
              >
                <path d="M12 21s-7-4.35-9-7.5C1.5 10.8 4 7 7.5 7c1.9 0 3.5 1.2 4.5 3 1-1.8 2.6-3 4.5-3C20 7 22.5 10.8 21 13.5 19 16.65 12 21 12 21z" />
              </svg>
            </button>
          )}
        </div>

        {/* Content */}
        <div className={`${isLarge ? 'p-4' : 'p-3'} flex flex-col flex-1`}>
          {/* Seller */}
          {!isGame && product.seller && (
            <div className="text-sm mb-1" style={{ color: 'var(--muted)' }}>
              {product.seller}
            </div>
          )}

          {/* Title */}
          <h3
            className={`font-semibold ${isLarge ? 'text-base mb-2' : 'text-sm mb-2'} line-clamp-2 ${isGame ? 'min-h-[2.5rem] md:group-hover:text-opacity-80' : 'min-h-[3rem]'
              } transition-colors`}
            style={{ color: 'var(--text)' }}
          >
            {product.title}
          </h3>

          {/* Description */}
          {isGame && isLarge && (
            <p className="text-xs mb-3 line-clamp-2" style={{ color: 'var(--muted)' }}>
              Anında teslimat garantisi
            </p>
          )}

          {/* Delivery Badge */}
          {!isGame && product.deliveryBadge && (
            <div className="mt-3 flex items-center gap-1.5 text-xs text-green-600 dark:text-green-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span className="font-medium">{product.deliveryBadge}</span>
            </div>
          )}

          {/* Price Section */}
          <div className={`${isGame ? 'flex items-center gap-2 mb-3 mt-auto' : 'mt-auto pt-3 border-t flex flex-wrap items-center gap-2'}`} style={!isGame ? { borderColor: 'var(--border)' } : {}}>
            <div className="flex flex-col">
              {product.oldPrice && (
                <span className={`${isLarge ? 'text-sm' : 'text-xs'} line-through`} style={{ color: 'var(--muted)' }}>
                  {isGame ? `₺${formatPrice(product.oldPrice)}` : `${formatPrice(product.oldPrice)} TL`}
                </span>
              )}
              <span className={`${isLarge ? 'text-xl' : isGame ? 'text-base' : 'text-xl'} font-bold price-text`}>
                {isGame ? `₺${formatPrice(product.price)}` : `${formatPrice(product.price)} TL`}
              </span>
            </div>

            {/* Discount Badge */}
            {product.discount && (
              <div className="ml-auto px-2 py-1 rounded bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-bold whitespace-nowrap">
                {isGame ? `-%${product.discount}` : `%${product.discount}`}
              </div>
            )}

            {isGame && isLarge && product.oldPrice && (
              <span className="text-xs ml-2 hidden sm:block" style={{ color: 'var(--muted)' }}>
                'den Başlayan
              </span>
            )}
          </div>

          {/* Action Button - POINTER EVENTS AUTO OLMALI */}
          {isGame && (
            <button
              onClick={handleAddToCart}
              onTouchEnd={(e) => {
                e.stopPropagation()
                handleAddToCart(e)
              }}
              disabled={buttonState !== 'idle'}
              className={`relative w-full text-center z-20 ${isLarge ? 'py-3' : 'py-2'} rounded font-semibold transition-transform overflow-hidden
                ${buttonState === 'idle' ? 'active:scale-95' : ''}
              `}
              style={{
                background: 'var(--accent)',
                color: '#000',
                touchAction: 'manipulation'
              }}
            >
              {/* Original Content */}
              <div className={`flex justify-center items-center gap-2 transition-opacity duration-300 ${buttonState !== 'idle' ? 'opacity-0' : 'opacity-100'}`}>
                <span>Sepete Ekle</span>
              </div>

              {/* Slide Overlay */}
              <div
                className={`absolute inset-0 bg-green-600 flex items-center justify-center gap-2 text-white font-bold text-sm
                  ${buttonState === 'idle' ? '-translate-x-full transition-none' : ''}
                  ${buttonState === 'success' ? 'translate-x-0 transition-transform duration-300 ease-out' : ''}
                  ${buttonState === 'exiting' ? 'translate-x-full transition-transform duration-300 ease-in' : ''}
                `}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Eklendi</span>
              </div>
            </button>
          )}
        </div>
      </div>
    </Link>
  )
}
