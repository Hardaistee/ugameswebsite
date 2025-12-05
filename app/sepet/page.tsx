'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useCart } from '../../context/CartContext'

export default function CartPage() {
    const { cart, removeFromCart, cartTotal, clearCart } = useCart()
    const [loading, setLoading] = useState(false)

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        country: 'TR',
        city: '',
        state: '', // İlçe/Semt
        address_1: '',
        address_2: '', // Apartman vb.
        postcode: ''
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleCheckout = async () => {
        // Basic validation
        if (!formData.first_name || !formData.last_name || !formData.phone || !formData.email || !formData.address_1 || !formData.city || !formData.state || !formData.postcode) {
            alert('Lütfen zorunlu (*) alanları doldurunuz.')
            return
        }

        setLoading(true)
        try {
            // Prepare customer object for API
            const customer = {
                first_name: formData.first_name,
                last_name: formData.last_name,
                address_1: formData.address_1,
                address_2: formData.address_2,
                city: formData.state, // WC City usually maps to İlçe in TR context often, or City=Sehir State=Il. 
                // Let's standard mapping: City = Il (Istanbul), State = Ilce (Sisli) OR 
                // WC often uses City for 'Şehir' (Istanbul) and maybe Address 2 for District.
                // Standard: City = Istanbul, Postcode = 34xxx. 
                // Let's send City as the main City field.
                state: formData.city, // WC State often maps to Province code (TR34) if using standard codes. 
                // Safe bet: Send City name in city field.
                // Actually, let's map: city -> billing.city, state -> billing.state.
                postcode: formData.postcode,
                country: formData.country,
                email: formData.email,
                phone: formData.phone
            }

            const response = await fetch('/api/create-order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    items: cart,
                    customer: customer
                })
            })

            const data = await response.json()

            if (data.success) {
                clearCart()
                const baseUrl = process.env.NEXT_PUBLIC_WOOCOMMERCE_URL?.replace(/\/$/, '')
                if (baseUrl && data.orderId && data.orderKey) {
                    window.location.href = `${baseUrl}/odeme/order-pay/${data.orderId}/?pay_for_order=true&key=${data.orderKey}`
                } else {
                    alert('Order created ID: ' + data.orderId)
                }
            } else {
                alert('Sipariş oluşturulamadı: ' + (data.details || data.error))
            }
        } catch (error) {
            console.error(error)
            alert('Bir hata oluştu.')
        } finally {
            setLoading(false)
        }
    }

    if (cart.length === 0) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center p-4">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                </div>
                <h2 className="text-xl font-bold mb-2">Sepetiniz Boş</h2>
                <p className="text-gray-500 mb-6">Henüz sepetinize ürün eklemediniz.</p>
                <Link
                    href="/oyunlar"
                    className="px-6 py-3 rounded-lg font-bold transition-transform hover:scale-105"
                    style={{ background: 'var(--accent)', color: '#000' }}
                >
                    Alışverişe Başla
                </Link>
            </div>
        )
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">Alışveriş Sepeti ({cart.length} Ürün)</h1>

            <div className="flex flex-col lg:flex-row gap-8">
                <div className="flex-1 space-y-8">
                    {/* Cart Items */}
                    <div className="space-y-4">
                        {cart.map((item) => (
                            <div
                                key={item.id}
                                className="flex items-center gap-4 p-4 rounded-xl border"
                                style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}
                            >
                                <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                                    <img
                                        src={item.image || '/placeholder.png'}
                                        alt={item.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                <div className="flex-1 min-w-0">
                                    <h3 className="font-semibold line-clamp-1">{item.name}</h3>
                                    {item.slug && (
                                        <span className="text-xs text-blue-500">{item.slug}</span>
                                    )}
                                </div>

                                <div className="text-right">
                                    <div className="font-bold text-lg">₺{item.price}</div>
                                    {item.quantity > 1 && (
                                        <div className="text-xs text-gray-500">{item.quantity} adet</div>
                                    )}
                                </div>

                                <button
                                    onClick={() => removeFromCart(item.id)}
                                    className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                                >
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Checkout Form */}
                    <div className="p-6 rounded-xl border space-y-4" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
                        <h3 className="font-bold text-lg border-b pb-2 mb-4" style={{ color: 'var(--text)', borderColor: 'var(--border)' }}>Fatura Bilgileri</h3>

                        {/* Ad / Soyad */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text)' }}>Ad *</label>
                                <input
                                    name="first_name"
                                    value={formData.first_name}
                                    onChange={handleInputChange}
                                    className="w-full border rounded px-3 py-2"
                                    style={{ background: 'var(--bg)', borderColor: 'var(--border)', color: 'var(--text)' }}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text)' }}>Soyad *</label>
                                <input
                                    name="last_name"
                                    value={formData.last_name}
                                    onChange={handleInputChange}
                                    className="w-full border rounded px-3 py-2"
                                    style={{ background: 'var(--bg)', borderColor: 'var(--border)', color: 'var(--text)' }}
                                    required
                                />
                            </div>
                        </div>

                        {/* Ülke */}
                        <div>
                            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text)' }}>Ülke *</label>
                            <select
                                name="country"
                                value={formData.country}
                                onChange={handleInputChange}
                                className="w-full border rounded px-3 py-2"
                                style={{ background: 'var(--bg)', borderColor: 'var(--border)', color: 'var(--text)' }}
                                disabled // For now only TR fixed, or enable if needed
                            >
                                <option value="TR">Türkiye</option>
                            </select>
                        </div>

                        {/* Sokak Adresi */}
                        <div>
                            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text)' }}>Sokak adresi *</label>
                            <input
                                name="address_1"
                                placeholder="Bina numarası ve sokak adı"
                                value={formData.address_1}
                                onChange={handleInputChange}
                                className="w-full border rounded px-3 py-2 mb-2"
                                style={{ background: 'var(--bg)', borderColor: 'var(--border)', color: 'var(--text)' }}
                                required
                            />
                            <input
                                name="address_2"
                                placeholder="Apartman, daire, oda vb. (isteğe bağlı)"
                                value={formData.address_2}
                                onChange={handleInputChange}
                                className="w-full border rounded px-3 py-2"
                                style={{ background: 'var(--bg)', borderColor: 'var(--border)', color: 'var(--text)' }}
                            />
                        </div>

                        {/* Posta kodu / İlçe / Şehir */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text)' }}>Posta kodu *</label>
                                <input
                                    name="postcode"
                                    value={formData.postcode}
                                    onChange={handleInputChange}
                                    className="w-full border rounded px-3 py-2"
                                    style={{ background: 'var(--bg)', borderColor: 'var(--border)', color: 'var(--text)' }}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text)' }}>İlçe / Semt *</label>
                                <input
                                    name="state"
                                    value={formData.state}
                                    onChange={handleInputChange}
                                    className="w-full border rounded px-3 py-2"
                                    style={{ background: 'var(--bg)', borderColor: 'var(--border)', color: 'var(--text)' }}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text)' }}>Şehir *</label>
                                <select
                                    name="city"
                                    value={formData.city}
                                    onChange={handleInputChange}
                                    className="w-full border rounded px-3 py-2"
                                    style={{ background: 'var(--bg)', borderColor: 'var(--border)', color: 'var(--text)' }}
                                    required
                                >
                                    <option value="">Seçiniz</option>
                                    <option value="Adana">Adana</option>
                                    <option value="Adiyaman">Adıyaman</option>
                                    <option value="Afyonkarahisar">Afyonkarahisar</option>
                                    <option value="Agri">Ağrı</option>
                                    <option value="Amasya">Amasya</option>
                                    <option value="Ankara">Ankara</option>
                                    <option value="Antalya">Antalya</option>
                                    <option value="Artvin">Artvin</option>
                                    <option value="Aydin">Aydın</option>
                                    <option value="Balikesir">Balıkesir</option>
                                    <option value="Bilecik">Bilecik</option>
                                    <option value="Bingol">Bingöl</option>
                                    <option value="Bitlis">Bitlis</option>
                                    <option value="Bolu">Bolu</option>
                                    <option value="Burdur">Burdur</option>
                                    <option value="Bursa">Bursa</option>
                                    <option value="Canakkale">Çanakkale</option>
                                    <option value="Cankiri">Çankırı</option>
                                    <option value="Corum">Çorum</option>
                                    <option value="Denizli">Denizli</option>
                                    <option value="Diyarbakir">Diyarbakır</option>
                                    <option value="Edirne">Edirne</option>
                                    <option value="Elazig">Elazığ</option>
                                    <option value="Erzincan">Erzincan</option>
                                    <option value="Erzurum">Erzurum</option>
                                    <option value="Eskisehir">Eskişehir</option>
                                    <option value="Gaziantep">Gaziantep</option>
                                    <option value="Giresun">Giresun</option>
                                    <option value="Gumushane">Gümüşhane</option>
                                    <option value="Hakkari">Hakkari</option>
                                    <option value="Hatay">Hatay</option>
                                    <option value="Isparta">Isparta</option>
                                    <option value="Mersin">Mersin</option>
                                    <option value="Istanbul">İstanbul</option>
                                    <option value="Izmir">İzmir</option>
                                    <option value="Kars">Kars</option>
                                    <option value="Kastamonu">Kastamonu</option>
                                    <option value="Kayseri">Kayseri</option>
                                    <option value="Kirklareli">Kırklareli</option>
                                    <option value="Kirsehir">Kırşehir</option>
                                    <option value="Kocaeli">Kocaeli</option>
                                    <option value="Konya">Konya</option>
                                    <option value="Kutahya">Kütahya</option>
                                    <option value="Malatya">Malatya</option>
                                    <option value="Manisa">Manisa</option>
                                    <option value="Kahramanmaras">Kahramanmaraş</option>
                                    <option value="Mardin">Mardin</option>
                                    <option value="Mugla">Muğla</option>
                                    <option value="Mus">Muş</option>
                                    <option value="Nevsehir">Nevşehir</option>
                                    <option value="Nigde">Niğde</option>
                                    <option value="Ordu">Ordu</option>
                                    <option value="Rize">Rize</option>
                                    <option value="Sakarya">Sakarya</option>
                                    <option value="Samsun">Samsun</option>
                                    <option value="Siirt">Siirt</option>
                                    <option value="Sinop">Sinop</option>
                                    <option value="Sivas">Sivas</option>
                                    <option value="Tekirdag">Tekirdağ</option>
                                    <option value="Tokat">Tokat</option>
                                    <option value="Trabzon">Trabzon</option>
                                    <option value="Tunceli">Tunceli</option>
                                    <option value="Sanliurfa">Şanlıurfa</option>
                                    <option value="Usak">Uşak</option>
                                    <option value="Van">Van</option>
                                    <option value="Yozgat">Yozgat</option>
                                    <option value="Zonguldak">Zonguldak</option>
                                    <option value="Aksaray">Aksaray</option>
                                    <option value="Bayburt">Bayburt</option>
                                    <option value="Karaman">Karaman</option>
                                    <option value="Kirikkale">Kırıkkale</option>
                                    <option value="Batman">Batman</option>
                                    <option value="Sirnak">Şırnak</option>
                                    <option value="Bartin">Bartın</option>
                                    <option value="Ardahan">Ardahan</option>
                                    <option value="Igdir">Iğdır</option>
                                    <option value="Yalova">Yalova</option>
                                    <option value="Karabuk">Karabük</option>
                                    <option value="Kilis">Kilis</option>
                                    <option value="Osmaniye">Osmaniye</option>
                                    <option value="Duzce">Düzce</option>
                                </select>
                            </div>
                        </div>

                        {/* Telefon / E-posta */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text)' }}>Telefon *</label>
                                <input
                                    name="phone"
                                    type="tel"
                                    placeholder="05xxxxxxxxx"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    className="w-full border rounded px-3 py-2"
                                    style={{ background: 'var(--bg)', borderColor: 'var(--border)', color: 'var(--text)' }}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text)' }}>E-posta adresi *</label>
                                <input
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full border rounded px-3 py-2"
                                    style={{ background: 'var(--bg)', borderColor: 'var(--border)', color: 'var(--text)' }}
                                    required
                                />
                            </div>
                        </div>

                    </div>
                </div>

                {/* Summary */}
                <div className="lg:w-80 flex-shrink-0">
                    <div
                        className="p-6 rounded-xl border sticky top-24"
                        style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}
                    >
                        <h3 className="font-bold text-lg mb-4">Sipariş Özeti</h3>

                        <div className="flex justify-between items-center mb-4 text-gray-500">
                            <span>Ara Toplam</span>
                            <span>₺{cartTotal.toFixed(2)}</span>
                        </div>

                        <div className="border-t pt-4 mb-6 flex justify-between items-center font-bold text-xl">
                            <span>Toplam</span>
                            <span>₺{cartTotal.toFixed(2)}</span>
                        </div>

                        <button
                            onClick={handleCheckout}
                            disabled={loading}
                            className={`w-full py-4 rounded-xl font-bold shadow-lg transition-transform hover:scale-105 active:scale-95 flex justify-center items-center gap-2 ${loading ? 'opacity-75 cursor-not-allowed' : ''}`}
                            style={{ background: 'var(--accent)', color: '#000' }}
                        >
                            {loading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    İşleniyor...
                                </>
                            ) : (
                                <>
                                    Ödemeye Geç
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
