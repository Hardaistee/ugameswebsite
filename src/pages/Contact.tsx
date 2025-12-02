import React from 'react'

export default function Contact() {
    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold mb-8 text-center" style={{ color: 'var(--text)' }}>İletişim</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                {/* Contact Info */}
                <div>
                    <h2 className="text-xl font-bold mb-6" style={{ color: 'var(--text)' }}>Bize Ulaşın</h2>
                    <p className="mb-8" style={{ color: 'var(--muted)' }}>
                        Her türlü soru, görüş ve öneriniz için aşağıdaki iletişim kanallarından bize ulaşabilirsiniz.
                        Ekibimiz en kısa sürede size dönüş yapacaktır.
                    </p>

                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ background: 'var(--surface)' }}>
                                <svg className="w-5 h-5" style={{ color: 'var(--accent)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-bold mb-1" style={{ color: 'var(--text)' }}>Adres</h3>
                                <p className="text-sm" style={{ color: 'var(--muted)' }}>
                                    Teknoloji Mah. Bilişim Cad. No:123<br />
                                    Kadıköy / İstanbul
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ background: 'var(--surface)' }}>
                                <svg className="w-5 h-5" style={{ color: 'var(--accent)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-bold mb-1" style={{ color: 'var(--text)' }}>E-posta</h3>
                                <p className="text-sm" style={{ color: 'var(--muted)' }}>
                                    info@ugames.com<br />
                                    destek@ugames.com
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ background: 'var(--surface)' }}>
                                <svg className="w-5 h-5" style={{ color: 'var(--accent)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-bold mb-1" style={{ color: 'var(--text)' }}>Telefon</h3>
                                <p className="text-sm" style={{ color: 'var(--muted)' }}>
                                    0850 123 45 67<br />
                                    (Hafta içi 09:00 - 18:00)
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="p-6 rounded-xl border" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
                    <h2 className="text-xl font-bold mb-6" style={{ color: 'var(--text)' }}>İletişim Formu</h2>
                    <form className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text)' }}>Adınız</label>
                                <input
                                    type="text"
                                    className="w-full px-3 py-2 rounded-lg border bg-transparent focus:ring-2 focus:ring-[var(--accent)] outline-none transition-all"
                                    style={{ borderColor: 'var(--border)', color: 'var(--text)' }}
                                    placeholder="Adınız"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text)' }}>Soyadınız</label>
                                <input
                                    type="text"
                                    className="w-full px-3 py-2 rounded-lg border bg-transparent focus:ring-2 focus:ring-[var(--accent)] outline-none transition-all"
                                    style={{ borderColor: 'var(--border)', color: 'var(--text)' }}
                                    placeholder="Soyadınız"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text)' }}>E-posta Adresi</label>
                            <input
                                type="email"
                                className="w-full px-3 py-2 rounded-lg border bg-transparent focus:ring-2 focus:ring-[var(--accent)] outline-none transition-all"
                                style={{ borderColor: 'var(--border)', color: 'var(--text)' }}
                                placeholder="ornek@email.com"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text)' }}>Konu</label>
                            <select
                                className="w-full px-3 py-2 rounded-lg border bg-transparent focus:ring-2 focus:ring-[var(--accent)] outline-none transition-all"
                                style={{ borderColor: 'var(--border)', color: 'var(--text)' }}
                            >
                                <option>Genel Bilgi</option>
                                <option>Sipariş Durumu</option>
                                <option>Teknik Destek</option>
                                <option>İade/İptal</option>
                                <option>Diğer</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text)' }}>Mesajınız</label>
                            <textarea
                                rows={4}
                                className="w-full px-3 py-2 rounded-lg border bg-transparent focus:ring-2 focus:ring-[var(--accent)] outline-none transition-all"
                                style={{ borderColor: 'var(--border)', color: 'var(--text)' }}
                                placeholder="Mesajınızı buraya yazın..."
                            ></textarea>
                        </div>

                        <button
                            type="button"
                            className="w-full py-3 rounded-lg font-bold text-white transition-all hover:opacity-90 hover:shadow-lg"
                            style={{ background: 'var(--accent)' }}
                        >
                            Gönder
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
