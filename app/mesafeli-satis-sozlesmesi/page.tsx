'use client'
import React from 'react'

export default function DistanceSalesAgreement() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <h1 className="text-3xl font-bold mb-8" style={{ color: 'var(--text)' }}>Mesafeli Satış Sözleşmesi</h1>

            <div className="prose dark:prose-invert max-w-none text-sm" style={{ color: 'var(--text)' }}>
                <p className="mb-4 font-bold">MADDE 1 - TARAFLAR</p>
                <p className="mb-4">
                    <strong>1.1. SATICI:</strong><br />
                    Ünvanı: Unifor Yazılım ve Teknoloji<br />
                    Adres: Pınarbaşı Mah. Pınarbaşı Cd. No:46, Konyaaltı/Antalya<br />
                    Telefon: +90 530 909 62 18<br />
                    E-posta: support@unifor.info<br />
                    Vergi No: 4140662799
                </p>

                <p className="mb-4">
                    <strong>1.2. ALICI:</strong><br />
                    Adı/Soyadı/Ünvanı: [Müşteri Adı]<br />
                    Adresi: [Müşteri Adresi]<br />
                    Telefon: [Müşteri Telefonu]<br />
                    E-posta: [Müşteri E-posta]
                </p>

                <p className="mb-4 font-bold">MADDE 2 - KONU</p>
                <p className="mb-4">
                    İşbu sözleşmenin konusu, ALICI'nın SATICI'ya ait www.ugames.com internet sitesinden elektronik ortamda siparişini yaptığı
                    aşağıda nitelikleri ve satış fiyatı belirtilen ürünün satışı ve teslimi ile ilgili olarak
                    6502 sayılı Tüketicinin Korunması Hakkında Kanun ve Mesafeli Sözleşmeler Yönetmeliği hükümleri gereğince tarafların hak ve yükümlülüklerinin saptanmasıdır.
                </p>

                <p className="mb-4 font-bold">MADDE 3 - SÖZLEŞME KONUSU ÜRÜN</p>
                <p className="mb-4">
                    Ürünlerin Cinsi ve Türü, Miktarı, Marka/Modeli, Rengi, Satış Bedeli site üzerinde belirtildiği gibidir.
                </p>

                <p className="mb-4 font-bold">MADDE 4 - GENEL HÜKÜMLER</p>
                <p className="mb-4">
                    4.1. ALICI, www.ugames.com internet sitesinde sözleşme konusu ürünün temel nitelikleri, satış fiyatı ve ödeme şekli ile teslimata ilişkin ön bilgileri okuyup bilgi sahibi olduğunu ve elektronik ortamda gerekli teyidi verdiğini beyan eder.
                </p>
                <p className="mb-4">
                    4.2. Sözleşme konusu ürün, yasal 30 günlük süreyi aşmamak koşulu ile her bir ürün için ALICI'nın yerleşim yerinin uzaklığına bağlı olarak internet sitesinde ön bilgiler içinde açıklanan süre içinde ALICI veya gösterdiği adresteki kişi/kuruluşa teslim edilir. Dijital ürünlerde teslimat anında gerçekleşir.
                </p>

                <p className="mb-4 font-bold">MADDE 5 - CAYMA HAKKI</p>
                <p className="mb-4">
                    ALICI, sözleşme konusu ürünün kendisine veya gösterdiği adresteki kişi/kuruluşa tesliminden itibaren 14 gün içinde cayma hakkına sahiptir.
                    Ancak, Mesafeli Sözleşmeler Yönetmeliği'nin 15. maddesi gereğince, elektronik ortamda anında ifa edilen hizmetler veya tüketiciye anında teslim edilen gayrimaddi mallar (oyun kodları, epinler, dijital içerikler vb.) cayma hakkı kapsamı dışındadır.
                    Bu nedenle, sitemiz üzerinden satın alınan ve kullanılmış/görüntülenmiş dijital kodların iadesi mümkün değildir.
                </p>

                <div className="p-4 rounded-lg mt-8" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                    <p className="text-xs italic">
                        * Bu metin taslak niteliğindedir. Lütfen kendi şirket bilgilerinize ve güncel yasal düzenlemelere göre düzenleyiniz.
                    </p>
                </div>
            </div>
        </div>
    )
}
