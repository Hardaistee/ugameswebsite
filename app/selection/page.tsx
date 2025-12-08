'use client'

import React from 'react'
import Link from 'next/link'
import { FadeIn } from '../components/animations/FadeIn'

export default function SelectionPage() {
    return (
        <div className="min-h-screen flex items-center justify-center p-4 pb-24 md:pb-4" style={{ background: 'var(--bg)' }}>
            <div className="max-w-5xl w-full">
                {/* Header */}
                <FadeIn direction="down" duration={0.8}>
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-6xl font-black mb-4" style={{ color: 'var(--text)' }}>
                            Hoş Geldiniz! 🎮
                        </h1>
                        <p className="text-lg md:text-xl" style={{ color: 'var(--muted)' }}>
                            Ne yapmak istersiniz?
                        </p>
                    </div>
                </FadeIn>

                {/* Selection Cards */}
                <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                    {/* Oyunlar Kartı */}
                    <FadeIn direction="left" delay={0.2}>
                        <Link
                            href="/oyunlar"
                            className="group block relative overflow-hidden rounded-2xl transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl h-full"
                            style={{
                                background: 'var(--surface)',
                                border: '2px solid var(--border)'
                            }}
                        >
                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            {/* Content */}
                            <div className="relative p-8 md:p-12 h-full flex flex-col items-center">
                                {/* Icon */}
                                <div className="mb-6 flex justify-center">
                                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 shadow-xl group-hover:scale-110 transition-transform duration-500">
                                        <svg className="w-12 h-12 md:w-14 md:h-14 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                                        </svg>
                                    </div>
                                </div>

                                {/* Title */}
                                <h2 className="text-3xl md:text-4xl font-black mb-3 text-center" style={{ color: 'var(--text)' }}>
                                    Oyunlar
                                </h2>

                                {/* Description */}
                                <p className="text-center text-base md:text-lg mb-6 flex-grow" style={{ color: 'var(--muted)' }}>
                                    PC, PlayStation ve Xbox oyunlarını keşfedin
                                </p>

                                {/* Features */}
                                <ul className="space-y-2 mb-8 w-full max-w-xs mx-auto">
                                    <li className="flex items-center gap-2 text-sm" style={{ color: 'var(--text)' }}>
                                        <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span>Anında teslimat</span>
                                    </li>
                                    <li className="flex items-center gap-2 text-sm" style={{ color: 'var(--text)' }}>
                                        <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span>Binlerce oyun seçeneği</span>
                                    </li>
                                    <li className="flex items-center gap-2 text-sm" style={{ color: 'var(--text)' }}>
                                        <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span>Uygun fiyatlar</span>
                                    </li>
                                </ul>

                                {/* Button */}
                                <div className="flex items-center justify-center gap-2 text-base font-semibold group-hover:gap-4 transition-all" style={{ color: 'var(--accent)' }}>
                                    <span>Oyunlara Git</span>
                                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </div>
                        </Link>
                    </FadeIn>

                    {/* Pazaryeri Kartı */}
                    <FadeIn direction="right" delay={0.4}>
                        <Link
                            href="/pazaryeri"
                            className="group block relative overflow-hidden rounded-2xl transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl h-full"
                            style={{
                                background: 'var(--surface)',
                                border: '2px solid var(--border)'
                            }}
                        >
                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            {/* Content */}
                            <div className="relative p-8 md:p-12 h-full flex flex-col items-center">
                                {/* Icon */}
                                <div className="mb-6 flex justify-center">
                                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl flex items-center justify-center bg-gradient-to-br from-orange-500 to-pink-600 shadow-xl group-hover:scale-110 transition-transform duration-500">
                                        <svg className="w-12 h-12 md:w-14 md:h-14 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                    </div>
                                </div>

                                {/* Title */}
                                <h2 className="text-3xl md:text-4xl font-black mb-3 text-center" style={{ color: 'var(--text)' }}>
                                    Pazaryeri
                                </h2>

                                {/* Description */}
                                <p className="text-center text-base md:text-lg mb-6 flex-grow" style={{ color: 'var(--muted)' }}>
                                    Dijital ürün alım-satım platformu
                                </p>

                                {/* Features */}
                                <ul className="space-y-2 mb-8 w-full max-w-xs mx-auto">
                                    <li className="flex items-center gap-2 text-sm" style={{ color: 'var(--text)' }}>
                                        <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span>Güvenli alışveriş</span>
                                    </li>
                                    <li className="flex items-center gap-2 text-sm" style={{ color: 'var(--text)' }}>
                                        <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span>Kullanıcı ilanları</span>
                                    </li>
                                    <li className="flex items-center gap-2 text-sm" style={{ color: 'var(--text)' }}>
                                        <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span>Hesap, skin ve daha fazlası</span>
                                    </li>
                                </ul>

                                {/* Button */}
                                <div className="flex items-center justify-center gap-2 text-base font-semibold group-hover:gap-4 transition-all" style={{ color: 'var(--accent)' }}>
                                    <span>Pazaryerine Git</span>
                                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </div>
                        </Link>
                    </FadeIn>
                </div>

                {/* Footer Note */}
                <FadeIn direction="up" delay={0.8}>
                    <p className="text-center mt-8 text-sm" style={{ color: 'var(--muted)' }}>
                        Dilediğiniz zaman diğer sayfaya geçiş yapabilirsiniz
                    </p>
                </FadeIn>
            </div>
        </div>
    )
}
