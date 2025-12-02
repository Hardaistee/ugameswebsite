import React from 'react'

export default function PrivacyPolicy() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <h1 className="text-3xl font-bold mb-8" style={{ color: 'var(--text)' }}>Gizlilik ve Çerez Politikası</h1>

            <div className="prose dark:prose-invert max-w-none" style={{ color: 'var(--text)' }}>
                <h2 className="text-xl font-bold mb-4">Gizlilik Politikası</h2>
                <p className="mb-4">
                    uGames olarak kişisel verilerinizin güvenliği hususuna azami hassasiyet göstermekteyiz.
                    6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") uyarınca, kişisel verileriniz aşağıda açıklanan kapsamda işlenmektedir.
                </p>
                <p className="mb-4">
                    <strong>Toplanan Veriler:</strong> Ad, soyad, e-posta adresi, telefon numarası, sipariş bilgileri ve IP adresi gibi veriler,
                    hizmetlerimizin sunulması ve yasal yükümlülüklerin yerine getirilmesi amacıyla toplanmaktadır.
                </p>
                <p className="mb-4">
                    <strong>Verilerin Korunması:</strong> Kişisel verileriniz, yetkisiz erişime, kayba veya ifşaya karşı
                    gerekli teknik ve idari tedbirler alınarak korunmaktadır. Ödeme bilgileriniz (kredi kartı vb.) sistemlerimizde saklanmamaktadır.
                </p>

                <h2 className="text-xl font-bold mt-8 mb-4">Çerez (Cookie) Politikası</h2>
                <p className="mb-4">
                    Web sitemizde, kullanıcı deneyimini iyileştirmek, site trafiğini analiz etmek ve kişiselleştirilmiş içerik sunmak amacıyla çerezler kullanılmaktadır.
                </p>

                <h3 className="text-lg font-bold mt-4 mb-2">Kullanılan Çerez Türleri</h3>
                <ul className="list-disc pl-5 mb-4 space-y-2">
                    <li><strong>Zorunlu Çerezler:</strong> Sitenin düzgün çalışması için gerekli olan çerezlerdir. (Örn: Oturum açma bilgileri)</li>
                    <li><strong>Analitik Çerezler:</strong> Ziyaretçilerin siteyi nasıl kullandığını analiz etmemize yardımcı olur. (Örn: Google Analytics)</li>
                    <li><strong>Pazarlama Çerezleri:</strong> İlgi alanlarınıza göre reklamlar sunmak için kullanılır.</li>
                </ul>

                <p className="mb-4">
                    Tarayıcı ayarlarınızdan çerez tercihlerinizi dilediğiniz zaman değiştirebilirsiniz.
                    Ancak zorunlu çerezlerin engellenmesi durumunda sitenin bazı özellikleri çalışmayabilir.
                </p>
            </div>
        </div>
    )
}
