import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import gamesData from '../data/games.json'

export default function Checkout() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [product, setProduct] = useState<any>(null)

    useEffect(() => {
        const game = gamesData.find((g: any) => g.id === id)
        if (game) {
            setProduct(game)
        } else {
            navigate('/tek-oyunculu')
        }
    }, [id, navigate])

    if (!product) {
        return <div style={{ background: 'var(--bg)', minHeight: '100vh' }} />
    }

    return (
        <div className="min-h-screen pb-12" style={{ background: 'var(--bg)' }}>
            <div className="max-w-6xl mx-auto px-4 py-8">
                {/* Page Title */}
                <h1 className="text-3xl font-black mb-8" style={{ color: 'var(--text)' }}>
                    Ödeme
                </h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - User Information Form */}
                    <div className="lg:col-span-2">
                        <div className="rounded-xl p-6 border" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
                            <h2 className="text-xl font-bold mb-6" style={{ color: 'var(--text)' }}>
                                İletişim Bilgileri
                            </h2>

                            <form className="space-y-4">
                                {/* Name */}
                                <div>
                                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text)' }}>
                                        Ad Soyad *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full px-4 py-3 rounded-lg border outline-none focus:ring-2 focus:ring-opacity-50"
                                        style={{
                                            background: 'var(--bg)',
                                            borderColor: 'var(--border)',
                                            color: 'var(--text)'
                                        }}
                                        placeholder="Ad ve soyadınızı girin"
                                    />
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text)' }}>
                                        E-posta Adresi *
                                    </label>
                                    <input
                                        type="email"
                                        required
                                        className="w-full px-4 py-3 rounded-lg border outline-none focus:ring-2 focus:ring-opacity-50"
                                        style={{
                                            background: 'var(--bg)',
                                            borderColor: 'var(--border)',
                                            color: 'var(--text)'
                                        }}
                                        placeholder="ornek@email.com"
                                    />
                                    <p className="text-xs mt-1" style={{ color: 'var(--muted)' }}>
                                        Ürün bu e-posta adresine gönderilecek
                                    </p>
                                </div>

                                {/* Phone */}
                                <div>
                                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text)' }}>
                                        Telefon Numarası *
                                    </label>
                                    <input
                                        type="tel"
                                        required
                                        className="w-full px-4 py-3 rounded-lg border outline-none focus:ring-2 focus:ring-opacity-50"
                                        style={{
                                            background: 'var(--bg)',
                                            borderColor: 'var(--border)',
                                            color: 'var(--text)'
                                        }}
                                        placeholder="5XX XXX XX XX"
                                    />
                                </div>

                                {/* Additional Notes */}
                                <div>
                                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text)' }}>
                                        Sipariş Notu (İsteğe Bağlı)
                                    </label>
                                    <textarea
                                        rows={3}
                                        className="w-full px-4 py-3 rounded-lg border outline-none focus:ring-2 focus:ring-opacity-50"
                                        style={{
                                            background: 'var(--bg)',
                                            borderColor: 'var(--border)',
                                            color: 'var(--text)'
                                        }}
                                        placeholder="Varsa özel taleplerinizi buraya yazabilirsiniz"
                                    />
                                </div>

                                {/* Terms Checkbox */}
                                <div className="flex items-start gap-3 pt-4">
                                    <input
                                        type="checkbox"
                                        required
                                        className="mt-1"
                                        id="terms"
                                    />
                                    <label htmlFor="terms" className="text-sm" style={{ color: 'var(--muted)' }}>
                                        <a href="/mesafeli-satis-sozlesmesi" className="underline hover:no-underline" style={{ color: 'var(--accent)' }}>
                                            Mesafeli Satış Sözleşmesi
                                        </a>
                                        {' '}ve{' '}
                                        <a href="/gizlilik-politikasi" className="underline hover:no-underline" style={{ color: 'var(--accent)' }}>
                                            Gizlilik Politikası
                                        </a>
                                        'nı okudum, kabul ediyorum.
                                    </label>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Right Column - Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="rounded-xl p-6 border sticky top-4" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
                            <h2 className="text-xl font-bold mb-6" style={{ color: 'var(--text)' }}>
                                Sipariş Özeti
                            </h2>

                            {/* Product Card */}
                            <div className="mb-6">
                                <div className="aspect-video rounded-lg overflow-hidden mb-4">
                                    <img
                                        src={product.images?.[0]}
                                        alt={product.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <h3 className="font-semibold mb-2" style={{ color: 'var(--text)' }}>
                                    {product.title}
                                </h3>
                                <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--muted)' }}>
                                    <span className="px-2 py-1 rounded text-xs font-medium" style={{ background: 'var(--bg)' }}>
                                        {product.platform}
                                    </span>
                                    {product.discount > 0 && (
                                        <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
                                            -{product.discount}%
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Price Breakdown */}
                            <div className="space-y-3 py-4 border-t border-b" style={{ borderColor: 'var(--border)' }}>
                                <div className="flex justify-between">
                                    <span style={{ color: 'var(--muted)' }}>Ürün Fiyatı</span>
                                    {product.oldPrice ? (
                                        <div className="text-right">
                                            <div className="line-through text-sm" style={{ color: 'var(--muted)' }}>
                                                ₺{product.oldPrice}
                                            </div>
                                            <div className="font-bold" style={{ color: 'var(--text)' }}>
                                                ₺{product.price}
                                            </div>
                                        </div>
                                    ) : (
                                        <span className="font-bold" style={{ color: 'var(--text)' }}>
                                            ₺{product.price}
                                        </span>
                                    )}
                                </div>
                                {product.oldPrice && (
                                    <div className="flex justify-between text-green-600">
                                        <span>İndirim</span>
                                        <span className="font-bold">
                                            -₺{(product.oldPrice - product.price).toFixed(2)}
                                        </span>
                                    </div>
                                )}
                            </div>

                            {/* Total */}
                            <div className="flex justify-between items-center mt-4 mb-6">
                                <span className="text-lg font-bold" style={{ color: 'var(--text)' }}>Toplam</span>
                                <span className="text-2xl font-black" style={{ color: 'var(--accent)' }}>
                                    ₺{product.price}
                                </span>
                            </div>

                            {/* Payment Button */}
                            <button
                                type="submit"
                                className="w-full py-4 rounded-lg font-bold text-lg transition-all hover:scale-[1.02] active:scale-[0.98]"
                                style={{
                                    background: 'var(--accent)',
                                    color: 'var(--bg)'
                                }}
                            >
                                Ödemeyi Tamamla
                            </button>

                            {/* Security Icons */}
                            <div className="mt-6 pt-6 border-t" style={{ borderColor: 'var(--border)' }}>
                                <div className="flex items-center justify-center gap-3 mb-3">
                                    <svg className="w-5 h-5" style={{ color: 'var(--muted)' }} fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                    </svg>
                                    <span className="text-sm font-medium" style={{ color: 'var(--muted)' }}>
                                        Güvenli Ödeme
                                    </span>
                                </div>
                                <p className="text-xs text-center" style={{ color: 'var(--muted)' }}>
                                    Ürün anında e-posta adresinize gönderilecek
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
