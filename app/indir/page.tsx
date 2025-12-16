'use client'
import React from 'react'
import Link from 'next/link'
import { FaWindows, FaApple, FaLinux, FaDownload, FaDesktop, FaShieldAlt, FaBolt, FaGamepad } from 'react-icons/fa'
import { motion } from 'framer-motion'

// Google Drive indirme linkleri
const downloadLinks = {
    windows: 'https://drive.google.com/drive/folders/1bwNi9ZPYyAMFksqXcNWQWtC447MVpeV_?usp=sharing',
    mac: 'https://drive.google.com/drive/folders/1aLqOC3hhKznvoHbIoNZe93zfCYCXxX58?usp=sharing',
    linux: 'https://drive.google.com/drive/folders/1qidB5O8MIA60t5t1k5_IUYLbWhEKTiCX?usp=sharing',
}

interface PlatformCardProps {
    platform: string
    icon: React.ReactNode
    description: string
    requirements: string[]
    downloadUrl: string
    fileName: string
    delay: number
}

const PlatformCard = ({ platform, icon, description, requirements, downloadUrl, fileName, delay }: PlatformCardProps) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay }}
        className="relative group"
    >
        <div
            className="relative rounded-2xl p-8 hover:scale-[1.02] transition-all duration-300 h-full flex flex-col border"
            style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}
        >
            {/* Platform Icon */}
            <div
                className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6 text-4xl border"
                style={{ background: 'var(--bg)', borderColor: 'var(--border)', color: 'var(--text)' }}
            >
                {icon}
            </div>

            {/* Platform Name */}
            <h3 className="text-2xl font-bold mb-3" style={{ color: 'var(--text)' }}>{platform}</h3>

            {/* Description */}
            <p className="mb-6" style={{ color: 'var(--muted)' }}>{description}</p>

            {/* Requirements */}
            <div className="mb-6 flex-grow">
                <h4 className="text-sm font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--muted)' }}>Sistem Gereksinimleri</h4>
                <ul className="space-y-2">
                    {requirements.map((req, index) => (
                        <li key={index} className="text-sm flex items-center gap-2" style={{ color: 'var(--muted)' }}>
                            <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--accent)' }} />
                            {req}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Download Button */}
            <a
                href={downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 px-6 rounded-xl font-semibold flex items-center justify-center gap-3 hover:opacity-80 active:scale-[0.98] transition-all duration-200"
                style={{ background: 'var(--accent)', color: 'var(--accent-contrast)' }}
            >
                <FaDownload className="text-lg" />
                <span>İndir</span>
            </a>

            {/* File Name */}
            <p className="text-xs text-center mt-3" style={{ color: 'var(--muted)' }}>{fileName}</p>
        </div>
    </motion.div>
)

export default function DownloadPage() {
    const platforms = [
        {
            platform: 'Windows',
            icon: <FaWindows />,
            description: 'Windows 10 ve üzeri işletim sistemleri için optimize edilmiş native uygulama.',
            requirements: ['Windows 10/11 (64-bit)', '4 GB RAM', '100 MB boş alan'],
            downloadUrl: downloadLinks.windows,
            fileName: 'uGames-Setup.exe',
        },
        {
            platform: 'macOS',
            icon: <FaApple />,
            description: 'Intel ve Apple Silicon (M1/M2/M3) işlemciler için universal binary.',
            requirements: ['macOS 11 Big Sur+', '4 GB RAM', '150 MB boş alan'],
            downloadUrl: downloadLinks.mac,
            fileName: 'uGames.dmg',
        },
        {
            platform: 'Linux',
            icon: <FaLinux />,
            description: 'Debian/Ubuntu tabanlı dağıtımlar için AppImage formatında.',
            requirements: ['Ubuntu 20.04+', '4 GB RAM', '100 MB boş alan'],
            downloadUrl: downloadLinks.linux,
            fileName: 'uGames.AppImage',
        },
    ]

    const features = [
        {
            icon: <FaBolt className="text-2xl" />,
            title: 'Hızlı Performans',
            description: 'Native uygulama ile web tarayıcısından daha hızlı deneyim',
        },
        {
            icon: <FaShieldAlt className="text-2xl" />,
            title: 'Güvenli Giriş',
            description: 'Oturum bilgileriniz cihazınızda güvenle saklanır',
        },
        {
            icon: <FaDesktop className="text-2xl" />,
            title: 'Masaüstü Bildirimleri',
            description: 'Siparişleriniz hakkında anında bildirim alın',
        },
        {
            icon: <FaGamepad className="text-2xl" />,
            title: 'Oyun Odaklı',
            description: 'Oyuncular için tasarlanmış modern arayüz',
        },
    ]

    return (
        <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
            {/* Hero Section */}
            <section className="relative overflow-hidden">
                <div className="container mx-auto px-4 py-16 md:py-20 relative">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center max-w-3xl mx-auto"
                    >
                        {/* Logo */}
                        <div className="flex justify-center mb-6">
                            <img
                                src="/images/Yeni Proje-17.png"
                                alt="uGames"
                                className="w-20 h-20 md:w-24 md:h-24 object-contain"
                            />
                        </div>

                        <div
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium mb-6 border"
                            style={{ background: 'var(--surface)', borderColor: 'var(--border)', color: 'var(--text)' }}
                        >
                            <FaDownload />
                            <span>Masaüstü Uygulaması</span>
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6" style={{ color: 'var(--text)' }}>
                            uGames'i Masaüstüne Taşı
                        </h1>

                        <p className="text-lg md:text-xl mb-8" style={{ color: 'var(--muted)' }}>
                            Tüm platformlardan erişin. Windows, macOS ve Linux için native uygulamamızı indirin
                            ve oyun dünyasına bir tıkla ulaşın.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Download Cards */}
            <section className="container mx-auto px-4 pb-16">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
                    {platforms.map((platform, index) => (
                        <PlatformCard key={platform.platform} {...platform} delay={index * 0.1} />
                    ))}
                </div>
            </section>

            {/* Features Section */}
            <section className="container mx-auto px-4 py-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: 'var(--text)' }}>Neden Masaüstü Uygulaması?</h2>
                    <p className="max-w-2xl mx-auto" style={{ color: 'var(--muted)' }}>
                        Native uygulamamız ile daha hızlı, daha güvenli ve daha pratik bir deneyim yaşayın.
                    </p>
                </motion.div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            className="rounded-xl p-6 text-center border hover:scale-[1.02] transition-all duration-300"
                            style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}
                        >
                            <div
                                className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4"
                                style={{ background: 'var(--bg)', color: 'var(--text)' }}
                            >
                                {feature.icon}
                            </div>
                            <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text)' }}>{feature.title}</h3>
                            <p className="text-sm" style={{ color: 'var(--muted)' }}>{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Installation Guide */}
            <section className="container mx-auto px-4 py-16">
                <div
                    className="max-w-4xl mx-auto rounded-2xl p-8 md:p-12 border"
                    style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}
                >
                    <h2 className="text-2xl font-bold mb-8 text-center" style={{ color: 'var(--text)' }}>Kurulum Rehberi</h2>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <div
                                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                                    style={{ background: 'var(--bg)', color: 'var(--text)' }}
                                >
                                    <FaWindows />
                                </div>
                                <h3 className="font-semibold" style={{ color: 'var(--text)' }}>Windows</h3>
                            </div>
                            <ol className="text-sm space-y-2 list-decimal list-inside" style={{ color: 'var(--muted)' }}>
                                <li>İndirilen .exe dosyasını çalıştırın</li>
                                <li>Kurulum sihirbazını takip edin</li>
                                <li>Masaüstü kısayolundan açın</li>
                            </ol>
                        </div>

                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <div
                                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                                    style={{ background: 'var(--bg)', color: 'var(--text)' }}
                                >
                                    <FaApple />
                                </div>
                                <h3 className="font-semibold" style={{ color: 'var(--text)' }}>macOS</h3>
                            </div>
                            <ol className="text-sm space-y-2 list-decimal list-inside" style={{ color: 'var(--muted)' }}>
                                <li>İndirilen .dmg dosyasını açın</li>
                                <li>uGames'i Applications'a sürükleyin</li>
                                <li>Launchpad'den başlatın</li>
                            </ol>
                        </div>

                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <div
                                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                                    style={{ background: 'var(--bg)', color: 'var(--text)' }}
                                >
                                    <FaLinux />
                                </div>
                                <h3 className="font-semibold" style={{ color: 'var(--text)' }}>Linux</h3>
                            </div>
                            <ol className="text-sm space-y-2 list-decimal list-inside" style={{ color: 'var(--muted)' }}>
                                <li>AppImage'a çalıştırma izni verin</li>
                                <li><code className="px-1 rounded" style={{ background: 'var(--bg)' }}>chmod +x</code> komutu kullanın</li>
                                <li>Dosyayı çift tıklayarak açın</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="container mx-auto px-4 py-16 pb-24">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-2xl font-bold mb-8 text-center" style={{ color: 'var(--text)' }}>Sıkça Sorulan Sorular</h2>

                    <div className="space-y-4">
                        <div
                            className="rounded-xl p-6 border"
                            style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}
                        >
                            <h3 className="font-semibold mb-2" style={{ color: 'var(--text)' }}>Uygulama ücretsiz mi?</h3>
                            <p className="text-sm" style={{ color: 'var(--muted)' }}>
                                Evet! uGames masaüstü uygulaması tamamen ücretsizdir. İndirin ve hemen kullanmaya başlayın.
                            </p>
                        </div>

                        <div
                            className="rounded-xl p-6 border"
                            style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}
                        >
                            <h3 className="font-semibold mb-2" style={{ color: 'var(--text)' }}>Web sitesiyle aynı özelliklere sahip mi?</h3>
                            <p className="text-sm" style={{ color: 'var(--muted)' }}>
                                Evet, masaüstü uygulaması web sitesinin tüm özelliklerini içerir. Ayrıca masaüstü bildirimleri ve daha hızlı performans sunar.
                            </p>
                        </div>

                        <div
                            className="rounded-xl p-6 border"
                            style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}
                        >
                            <h3 className="font-semibold mb-2" style={{ color: 'var(--text)' }}>Otomatik güncelleme var mı?</h3>
                            <p className="text-sm" style={{ color: 'var(--muted)' }}>
                                Yeni sürümler çıktığında uygulama içinden bildirim alırsınız ve tek tıkla güncelleyebilirsiniz.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
