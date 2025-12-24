'use client'

import React, { useState } from 'react'
import Link from 'next/link'

interface CheckoutClientProps {
    product: {
        id: string
        title: string
        price: number
        oldPrice?: number | null
        discount?: number | null
        platform: string
        images?: string[]
        image?: string
    }
}

export default function CheckoutClient({ product }: CheckoutClientProps) {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    // Form state
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        city: 'İstanbul',
        address: '',
        note: '',
        terms: false
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!formData.terms) {
            setError('Lütfen sözleşmeleri kabul edin.')
            return
        }

        setLoading(true)
        setError(null)

        try {
            const response = await fetch('/api/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    amount: product.price,
                    currency: 'TRY',
                    products: [{
                        name: product.title,
                        productId: product.id,
                        productType: 1, // Dijital ürün
                        quantity: 1,
                        price: product.price
                    }],
                    buyer: {
                        name: formData.firstName,
                        surname: formData.lastName,
                        email: formData.email,
                        phone: formData.phone.replace(/\D/g, ''),
                        accountAge: 0
                    },
                    billingAddress: {
                        address: formData.address || formData.city,
                        city: formData.city,
                        country: 'Turkey',
                        postcode: '34000'
                    }
                })
            })

            const data = await response.json()

            if (!data.success) {
                throw new Error(data.error || 'Ödeme başlatılamadı')
            }

            // Shopier'e yönlendir
            const form = document.createElement('form')
            form.method = 'POST'
            form.action = data.endpoint
            form.style.display = 'none'

            Object.entries(data.formData).forEach(([key, value]) => {
                const input = document.createElement('input')
                input.type = 'hidden'
                input.name = key
                input.value = String(value)
                form.appendChild(input)
            })

            document.body.appendChild(form)
            form.submit()

        } catch (err) {
            setError(err instanceof Error ? err.message : 'Bir hata oluştu')
            setLoading(false)
        }
    }

    // Türkiye şehirleri
    const cities = [
        'Adana', 'Adıyaman', 'Afyonkarahisar', 'Ağrı', 'Aksaray', 'Amasya', 'Ankara', 'Antalya', 'Ardahan', 'Artvin',
        'Aydın', 'Balıkesir', 'Bartın', 'Batman', 'Bayburt', 'Bilecik', 'Bingöl', 'Bitlis', 'Bolu', 'Burdur',
        'Bursa', 'Çanakkale', 'Çankırı', 'Çorum', 'Denizli', 'Diyarbakır', 'Düzce', 'Edirne', 'Elazığ', 'Erzincan',
        'Erzurum', 'Eskişehir', 'Gaziantep', 'Giresun', 'Gümüşhane', 'Hakkari', 'Hatay', 'Iğdır', 'Isparta', 'İstanbul',
        'İzmir', 'Kahramanmaraş', 'Karabük', 'Karaman', 'Kars', 'Kastamonu', 'Kayseri', 'Kırıkkale', 'Kırklareli', 'Kırşehir',
        'Kilis', 'Kocaeli', 'Konya', 'Kütahya', 'Malatya', 'Manisa', 'Mardin', 'Mersin', 'Muğla', 'Muş',
        'Nevşehir', 'Niğde', 'Ordu', 'Osmaniye', 'Rize', 'Sakarya', 'Samsun', 'Siirt', 'Sinop', 'Sivas',
        'Şanlıurfa', 'Şırnak', 'Tekirdağ', 'Tokat', 'Trabzon', 'Tunceli', 'Uşak', 'Van', 'Yalova', 'Yozgat', 'Zonguldak'
    ]

    return (
        <div className="min-h-screen pb-12" style={{ background: 'var(--bg)' }}>
            <div className="max-w-6xl mx-auto px-4 py-8">
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 mb-6 text-sm">
                    <Link href="/" className="hover:underline" style={{ color: 'var(--muted)' }}>Ana Sayfa</Link>
                    <span style={{ color: 'var(--muted)' }}>/</span>
                    <Link href={`/oyun/${product.id}`} className="hover:underline" style={{ color: 'var(--muted)' }}>{product.title}</Link>
                    <span style={{ color: 'var(--muted)' }}>/</span>
                    <span style={{ color: 'var(--text)' }}>Ödeme</span>
                </div>

                <h1 className="text-3xl font-black mb-8" style={{ color: 'var(--text)' }}>
                    Ödeme
                </h1>

                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left Column - User Information Form */}
                        <div className="lg:col-span-2">
                            <div className="rounded-xl p-6 border" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
                                <h2 className="text-xl font-bold mb-6" style={{ color: 'var(--text)' }}>
                                    İletişim Bilgileri
                                </h2>

                                <div className="space-y-4">
                                    {/* Name Row */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text)' }}>
                                                Ad *
                                            </label>
                                            <input
                                                type="text"
                                                name="firstName"
                                                value={formData.firstName}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-3 rounded-lg border outline-none focus:ring-2 focus:ring-opacity-50"
                                                style={{
                                                    background: 'var(--bg)',
                                                    borderColor: 'var(--border)',
                                                    color: 'var(--text)'
                                                }}
                                                placeholder="Adınız"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text)' }}>
                                                Soyad *
                                            </label>
                                            <input
                                                type="text"
                                                name="lastName"
                                                value={formData.lastName}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-3 rounded-lg border outline-none focus:ring-2 focus:ring-opacity-50"
                                                style={{
                                                    background: 'var(--bg)',
                                                    borderColor: 'var(--border)',
                                                    color: 'var(--text)'
                                                }}
                                                placeholder="Soyadınız"
                                            />
                                        </div>
                                    </div>

                                    {/* Email */}
                                    <div>
                                        <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text)' }}>
                                            E-posta Adresi *
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
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
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
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

                                    {/* City */}
                                    <div>
                                        <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text)' }}>
                                            Şehir *
                                        </label>
                                        <select
                                            name="city"
                                            value={formData.city}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 rounded-lg border outline-none focus:ring-2 focus:ring-opacity-50"
                                            style={{
                                                background: 'var(--bg)',
                                                borderColor: 'var(--border)',
                                                color: 'var(--text)'
                                            }}
                                        >
                                            {cities.map(city => (
                                                <option key={city} value={city}>{city}</option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Additional Notes */}
                                    <div>
                                        <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text)' }}>
                                            Sipariş Notu (İsteğe Bağlı)
                                        </label>
                                        <textarea
                                            name="note"
                                            value={formData.note}
                                            onChange={handleChange}
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
                                            name="terms"
                                            checked={formData.terms}
                                            onChange={handleChange}
                                            className="mt-1"
                                            id="terms"
                                        />
                                        <label htmlFor="terms" className="text-sm" style={{ color: 'var(--muted)' }}>
                                            <a href="/mesafeli-satis-sozlesmesi" target="_blank" className="underline hover:no-underline" style={{ color: 'var(--accent)' }}>
                                                Mesafeli Satış Sözleşmesi
                                            </a>
                                            {' '}ve{' '}
                                            <a href="/gizlilik-politikasi" target="_blank" className="underline hover:no-underline" style={{ color: 'var(--accent)' }}>
                                                Gizlilik Politikası
                                            </a>
                                            'nı okudum, kabul ediyorum.
                                        </label>
                                    </div>

                                    {/* Error Message */}
                                    {error && (
                                        <div className="p-4 rounded-lg bg-red-50 border border-red-200">
                                            <p className="text-sm text-red-600">{error}</p>
                                        </div>
                                    )}
                                </div>
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
                                    <div
                                        className="aspect-video rounded-lg overflow-hidden mb-4"
                                        style={{
                                            backgroundImage: 'url(/images/placeholder.png)',
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center'
                                        }}
                                    >
                                        <img
                                            src={product.images?.[0] || product.image}
                                            alt={product.title}
                                            className="w-full h-full object-contain"
                                        />
                                    </div>
                                    <h3 className="font-semibold mb-2" style={{ color: 'var(--text)' }}>
                                        {product.title}
                                    </h3>
                                    <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--muted)' }}>
                                        <span className="px-2 py-1 rounded text-xs font-medium" style={{ background: 'var(--bg)' }}>
                                            {product.platform}
                                        </span>
                                        {product.discount && product.discount > 0 && (
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
                                    disabled={loading}
                                    className="w-full py-4 rounded-lg font-bold text-lg transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                                    style={{
                                        background: 'var(--accent)',
                                        color: 'var(--bg)'
                                    }}
                                >
                                    {loading ? 'Yönlendiriliyor...' : 'Ödemeyi Tamamla'}
                                </button>

                                {/* Security Icons */}
                                <div className="mt-6 pt-6 border-t" style={{ borderColor: 'var(--border)' }}>
                                    <div className="flex items-center justify-center gap-3 mb-3">
                                        <svg className="w-5 h-5" style={{ color: 'var(--muted)' }} fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                        </svg>
                                        <span className="text-sm font-medium" style={{ color: 'var(--muted)' }}>
                                            Güvenli Ödeme - Shopier
                                        </span>
                                    </div>
                                    <p className="text-xs text-center" style={{ color: 'var(--muted)' }}>
                                        Ürün anında e-posta adresinize gönderilecek
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
