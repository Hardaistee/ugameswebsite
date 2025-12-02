import React from 'react'

export default function ReturnConditions() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <h1 className="text-3xl font-bold mb-8" style={{ color: 'var(--text)' }}>İade ve Teslimat Koşulları</h1>

            <div className="prose dark:prose-invert max-w-none" style={{ color: 'var(--text)' }}>
                <h2 className="text-xl font-bold mb-4">Teslimat Koşulları</h2>
                <p className="mb-4">
                    <strong>Dijital Ürünler:</strong> Satın aldığınız E-pin, oyun kodu, hediye kartı gibi dijital ürünler,
                    ödeme onayının hemen ardından sistemde kayıtlı e-posta adresinize gönderilir ve/veya site üzerindeki "Siparişlerim" sayfasında görüntülenir.
                    Teslimat süresi genellikle anlıktır ancak sistemsel yoğunluğa bağlı olarak kısa süreli gecikmeler yaşanabilir.
                </p>
                <p className="mb-4">
                    <strong>Oyun Hesapları:</strong> Satın alınan oyun hesaplarının bilgileri, güvenlik kontrollerinin ardından
                    en kısa sürede (genellikle 15-60 dakika içinde) tarafınıza iletilir.
                </p>

                <h2 className="text-xl font-bold mt-8 mb-4">İade Koşulları</h2>
                <p className="mb-4">
                    6502 sayılı Tüketicinin Korunması Hakkında Kanun ve Mesafeli Sözleşmeler Yönetmeliği uyarınca;
                </p>
                <ul className="list-disc pl-5 mb-4 space-y-2">
                    <li>
                        <strong>Dijital Kodlar ve E-pinler:</strong> Elektronik ortamda anında ifa edilen hizmetler veya tüketiciye anında teslim edilen gayrimaddi mallar kapsamında olduğundan,
                        <strong>teslim edildikten sonra iadesi ve iptali mümkün değildir.</strong> Kodun hatalı olması durumunda, sağlayıcı firma ile iletişime geçilerek kontrol sağlanır ve hata doğrulanırsa değişim yapılır.
                    </li>
                    <li>
                        <strong>Oyun Hesapları:</strong> Teslim edilen hesap bilgilerinin hatalı olması veya hesabın taahhüt edilen özelliklere sahip olmaması durumunda,
                        teslimattan sonraki 24 saat içinde bildirim yapılması koşuluyla iade veya değişim hakkınız saklıdır.
                        Kullanıcı hatasından kaynaklanan (ban yeme, şifre unutma vb.) durumlarda iade kabul edilmez.
                    </li>
                </ul>

                <h2 className="text-xl font-bold mt-8 mb-4">İade Süreci</h2>
                <p className="mb-4">
                    İade talepleriniz için "İletişim" sayfasından veya canlı destek hattımızdan bize ulaşabilirsiniz.
                    Talebini incelendikten sonra, iade koşullarına uygun bulunması durumunda ödemeniz 3-7 iş günü içinde
                    ödeme yaptığınız karta/hesaba iade edilir.
                </p>
            </div>
        </div>
    )
}
