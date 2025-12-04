'use client'
import React from 'react'

export default function TermsOfUse() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <h1 className="text-3xl font-bold mb-8" style={{ color: 'var(--text)' }}>Kullanım Koşulları</h1>

            <div className="prose dark:prose-invert max-w-none" style={{ color: 'var(--text)' }}>
                <p className="mb-4">
                    Bu internet sitesine girmeniz veya bu internet sitesindeki herhangi bir bilgiyi kullanmanız aşağıdaki koşulları kabul ettiğiniz anlamına gelir.
                </p>

                <h2 className="text-xl font-bold mt-8 mb-4">1. Genel Kurallar</h2>
                <p className="mb-4">
                    uGames, dilediği zaman bu yasal uyarı sayfasının içeriğini güncelleme yetkisini saklı tutmaktadır.
                    Kullanıcıların siteye her girişte yasal uyarı sayfasını ziyaret etmeleri tavsiye edilmektedir.
                </p>

                <h2 className="text-xl font-bold mt-8 mb-4">2. Fikri Mülkiyet Hakları</h2>
                <p className="mb-4">
                    Bu internet sitesinde bulunan bilgiler, yazılar, resimler, markalar, slogan ve diğer işaretler ile sair sınaî ve fikri mülkiyet haklarına ilişkin bilgilerin korunmasına yönelik programlarla, sayfa düzeni ve işbu internet sitesinin sunumu uGames'in mülkiyetindedir.
                    Bu internet sitesindeki bilgilerin ya da bu internet sitesi sayfalarına ilişkin her tür veritabanı, web sitesi, software-code'ların kısmen ya da tamamen kopyalanması, değiştirilmesi, yayımlanması, online ya da diğer bir medya kullanılmak suretiyle gönderimi, dağıtımı, satılması yasaktır.
                </p>

                <h2 className="text-xl font-bold mt-8 mb-4">3. Sorumluluk Reddi</h2>
                <p className="mb-4">
                    uGames, site üzerindeki bilgilerin doğruluğu ve güncelliği konusunda azami özeni göstermekle birlikte,
                    sitede yer alan bilgilerin hatalı veya eksik olmasından kaynaklanabilecek zararlardan sorumlu tutulamaz.
                    Kullanıcı, siteyi kullanırken yasalara ve genel ahlak kurallarına uymayı taahhüt eder.
                </p>

                <h2 className="text-xl font-bold mt-8 mb-4">4. Hesap Güvenliği</h2>
                <p className="mb-4">
                    Üye, hesap bilgilerinin (kullanıcı adı ve şifre) güvenliğinden kendisi sorumludur.
                    Hesap bilgilerinin üçüncü kişilerle paylaşılması veya çalınması durumunda doğacak zararlardan uGames sorumlu değildir.
                </p>

                <h2 className="text-xl font-bold mt-8 mb-4">5. İletişim</h2>
                <p className="mb-4">
                    Kullanım koşulları ile ilgili sorularınız için bizimle iletişime geçebilirsiniz:<br />
                    <strong>E-posta:</strong> support@unifor.info<br />
                    <strong>Telefon:</strong> +90 530 909 62 18<br />
                    <strong>Adres:</strong> Pınarbaşı Mah. Pınarbaşı Cd. No:46, Konyaaltı/Antalya
                </p>

                <h2 className="text-xl font-bold mt-8 mb-4">6. Yetkili Mahkeme</h2>
                <p className="mb-4">
                    İşbu sözleşmeden doğabilecek her türlü uyuşmazlıkta Antalya Mahkemeleri ve İcra Daireleri yetkilidir.
                    Tüketici işlemlerinde tüketici, yerleşim yerinin bulunduğu veya tüketici işleminin yapıldığı yerdeki
                    Tüketici Hakem Heyetine başvurabilir.
                </p>

                <p className="text-sm mt-8" style={{ color: 'var(--muted)' }}>
                    <strong>Son Güncelleme Tarihi:</strong> 04 Aralık 2024
                </p>
            </div>
        </div>
    )
}
