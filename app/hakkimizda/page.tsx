'use client'
import React from 'react'

export default function About() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <h1 className="text-3xl font-bold mb-8" style={{ color: 'var(--text)' }}>Hakkımızda</h1>

            <div className="prose dark:prose-invert max-w-none" style={{ color: 'var(--text)' }}>
                <p className="mb-4">
                    <strong>Unifor Yazılım ve Teknoloji</strong> bünyesinde hizmet veren <strong>uGames</strong>,
                    dijital oyun dünyasında güvenilir ve hızlı alışverişin adresi olarak yola çıkmıştır.
                    Oyuncuların ihtiyaç duyduğu oyun hesapları, epin kodları, oyun paraları ve diğer dijital ürünleri
                    en uygun fiyatlarla ve güvenli ödeme altyapısıyla sunmayı hedefliyoruz.
                </p>

                <h2 className="text-xl font-bold mt-8 mb-4">Vizyonumuz</h2>
                <p className="mb-4">
                    Türkiye'nin ve dünyanın önde gelen dijital oyun pazaryeri platformlarından biri olmak ve
                    oyunculara kesintisiz, güvenli bir alışveriş deneyimi sunmak.
                </p>

                <h2 className="text-xl font-bold mt-8 mb-4">Misyonumuz</h2>
                <p className="mb-4">
                    Müşteri memnuniyetini her zaman ön planda tutarak, 7/24 canlı destek hizmeti,
                    anında teslimat garantisi ve güvenli ödeme yöntemleri ile kullanıcılarımızın
                    oyun keyfini bölmeden ihtiyaçlarına ulaşmalarını sağlamak.
                </p>

                <h2 className="text-xl font-bold mt-8 mb-4">Neden uGames?</h2>
                <ul className="list-disc pl-5 mb-4 space-y-2">
                    <li><strong>Güvenli Alışveriş:</strong> 256-bit SSL sertifikası ve 3D Secure ödeme altyapısı.</li>
                    <li><strong>Hızlı Teslimat:</strong> Otomatik teslimat sistemi ile satın aldığınız ürünler anında hesabınızda.</li>
                    <li><strong>7/24 Destek:</strong> Her türlü soru ve sorununuz için uzman destek ekibimiz yanınızda.</li>
                    <li><strong>Uygun Fiyatlar:</strong> Piyasadaki en rekabetçi fiyatlarla bütçe dostu alışveriş.</li>
                </ul>

                <h2 className="text-xl font-bold mt-8 mb-4">İletişim Bilgileri</h2>
                <p className="mb-4">
                    <strong>Şirket Ünvanı:</strong> Unifor Yazılım ve Teknoloji<br />
                    <strong>Marka:</strong> uGames<br />
                    <strong>Adres:</strong> Pınarbaşı Mah. Pınarbaşı Cd. No:46, Konyaaltı/Antalya<br />
                    <strong>E-posta:</strong> support@unifor.info<br />
                    <strong>Telefon:</strong> +90 530 909 62 18<br />
                    <strong>Vergi No:</strong> 4140662799
                </p>
            </div>
        </div>
    )
}
