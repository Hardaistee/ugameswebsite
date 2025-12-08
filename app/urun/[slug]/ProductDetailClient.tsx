'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useCart } from '../../../context/CartContext'
import { FadeIn } from '../../components/animations/FadeIn'

interface ProductDetailClientProps {
    product: any
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
    const { addToCart } = useCart()
    const [selectedImage, setSelectedImage] = useState(0)

    if (!product) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center p-4">
                <h2 className="text-xl font-bold mb-2">Ürün Bulunamadı</h2>
                <p className="text-gray-500 mb-6">Aradığınız ürün mevcut değil.</p>
                <Link
                    href="/oyunlar"
                    className="px-6 py-3 rounded-lg font-bold text-white"
                    style={{ background: 'var(--accent)', color: '#000' }}
                >
                    Ürünlere Dön
                </Link>
            </div>
        )
    }

    const images = product.images || []
    const mainImage = images[selectedImage]?.src || '/placeholder.png'

    const [buttonState, setButtonState] = useState<'idle' | 'success' | 'exiting'>('idle')

    const handleAddToCart = () => {
        if (buttonState !== 'idle') return

        addToCart({
            id: product.id,
            name: product.name,
            price: product.price || product.regular_price || '0',
            image: images[0]?.src || '',
            quantity: 1,
            slug: product.slug || ''
        })

        // Start Animation (Slide In)
        setButtonState('success')

        // Wait, then Slide Out
        setTimeout(() => {
            setButtonState('exiting')

            // Reset to Idle (Hidden Left) after slide out finishes
            setTimeout(() => {
                setButtonState('idle')
            }, 300) // Match transition duration
        }, 2000)
    }

    // Parse description HTML safely
    const description = product.description || product.short_description || ''

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            {/* Breadcrumb */}
            <FadeIn delay={0.1}>
                <nav className="text-sm mb-6" style={{ color: 'var(--muted)' }}>
                    <Link href="/" className="hover:underline">Ana Sayfa</Link>
                    <span className="mx-2">/</span>
                    <Link href="/oyunlar" className="hover:underline">Ürünler</Link>
                    <span className="mx-2">/</span>
                    <span style={{ color: 'var(--text)' }}>{product.name}</span>
                </nav>
            </FadeIn>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Image Gallery */}
                <div className="lg:w-1/2">
                    <FadeIn direction="right" delay={0.2}>
                        {/* Main Image */}
                        <div className="aspect-square rounded-xl overflow-hidden mb-4 border" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
                            <img
                                src={mainImage}
                                alt={product.name}
                                className="w-full h-full object-contain"
                            />
                        </div>

                        {/* Thumbnails */}
                        {images.length > 1 && (
                            <div className="flex gap-2 overflow-x-auto pb-2">
                                {images.map((img: any, index: number) => (
                                    <button
                                        key={img.id || index}
                                        onClick={() => setSelectedImage(index)}
                                        className={`w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all ${selectedImage === index
                                            ? 'border-blue-500 scale-105'
                                            : 'border-transparent opacity-70 hover:opacity-100'
                                            }`}
                                    >
                                        <img
                                            src={img.src}
                                            alt={`${product.name} - ${index + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </FadeIn>
                </div>

                {/* Product Info */}
                <div className="lg:w-1/2">
                    <FadeIn direction="left" delay={0.3}>
                        {/* Categories */}
                        {product.categories && product.categories.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-3">
                                {product.categories.map((cat: any) => (
                                    <span
                                        key={cat.id}
                                        className="text-xs px-2 py-1 rounded-full"
                                        style={{ background: 'var(--accent)', color: '#000' }}
                                    >
                                        {cat.name}
                                    </span>
                                ))}
                            </div>
                        )}

                        <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

                        {/* Stock Status */}
                        <div className="mb-4">
                            {product.stock_status === 'instock' ? (
                                <span className="text-green-500 text-sm font-medium">✓ Stokta</span>
                            ) : (
                                <span className="text-red-500 text-sm font-medium">✗ Stokta Yok</span>
                            )}
                        </div>

                        {/* Price */}
                        <div className="mb-6">
                            {product.on_sale && product.regular_price && (
                                <span className="text-lg line-through mr-3" style={{ color: 'var(--muted)' }}>
                                    ₺{product.regular_price}
                                </span>
                            )}
                            <span className="text-3xl font-bold" style={{ color: 'var(--accent)' }}>
                                ₺{product.price || product.regular_price || '0'}
                            </span>
                        </div>

                        {/* Short Description */}
                        {product.short_description && (
                            <div
                                className="mb-6 text-sm leading-relaxed"
                                style={{ color: 'var(--muted)' }}
                                dangerouslySetInnerHTML={{ __html: product.short_description }}
                            />
                        )}

                        {/* Add to Cart Button */}
                        <button
                            onClick={handleAddToCart}
                            disabled={product.stock_status !== 'instock' || buttonState !== 'idle'}
                            className={`group relative w-full py-4 rounded-xl font-bold shadow-lg transition-transform overflow-hidden
                                ${product.stock_status !== 'instock' ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 active:scale-95'}
                            `}
                            style={{ background: 'var(--accent)', color: '#000' }}
                        >
                            {/* Original Content */}
                            <div className={`flex justify-center items-center gap-2 transition-opacity duration-300 ${buttonState !== 'idle' ? 'opacity-0' : 'opacity-100'}`}>
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                </svg>
                                <span>Sepete Ekle</span>
                            </div>

                            {/* Slide Overlay */}
                            <div
                                className={`absolute inset-0 bg-green-600 flex items-center justify-center gap-2 text-white font-bold
                                    ${buttonState === 'idle' ? '-translate-x-full transition-none' : ''}
                                    ${buttonState === 'success' ? 'translate-x-0 transition-transform duration-300 ease-out' : ''}
                                    ${buttonState === 'exiting' ? 'translate-x-full transition-transform duration-300 ease-in' : ''}
                                `}
                            >
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <span>Sepete Eklendi!</span>
                            </div>
                        </button>
                    </FadeIn>

                    {/* Product Meta */}
                    <div className="space-y-3 text-sm border-t pt-6" style={{ borderColor: 'var(--border)' }}>
                        {product.sku && (
                            <div className="flex">
                                <span className="w-24 font-medium">SKU:</span>
                                <span style={{ color: 'var(--muted)' }}>{product.sku}</span>
                            </div>
                        )}
                        {product.tags && product.tags.length > 0 && (
                            <div className="flex">
                                <span className="w-24 font-medium">Etiketler:</span>
                                <span style={{ color: 'var(--muted)' }}>
                                    {product.tags.map((t: any) => t.name).join(', ')}
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Full Description */}
            {description && (
                <div className="mt-12">
                    <h2 className="text-2xl font-bold mb-4 pb-2 border-b" style={{ borderColor: 'var(--border)' }}>
                        Ürün Açıklaması
                    </h2>
                    <div
                        className="prose prose-invert max-w-none leading-relaxed"
                        style={{ color: 'var(--text)' }}
                        dangerouslySetInnerHTML={{ __html: description }}
                    />
                </div>
            )}

            {/* Attributes */}
            {product.attributes && product.attributes.length > 0 && (
                <div className="mt-12">
                    <h2 className="text-2xl font-bold mb-4 pb-2 border-b" style={{ borderColor: 'var(--border)' }}>
                        Özellikler
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {product.attributes.map((attr: any) => (
                            <div
                                key={attr.id || attr.name}
                                className="p-4 rounded-lg"
                                style={{ background: 'var(--surface)' }}
                            >
                                <span className="font-medium">{attr.name}: </span>
                                <span style={{ color: 'var(--muted)' }}>
                                    {attr.options?.join(', ') || '-'}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}
