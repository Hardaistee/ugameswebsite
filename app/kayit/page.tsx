"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { FaUser, FaEnvelope, FaLock, FaPhone, FaSpinner } from 'react-icons/fa';

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const router = useRouter();
    const { login } = useAuth();

    const API_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001'}/api`;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError('Şifreler eşleşmiyor.');
            return;
        }

        if (formData.password.length < 6) {
            setError('Şifre en az 6 karakter olmalıdır.');
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post(`${API_URL}/auth/register`, {
                email: formData.email,
                password: formData.password,
                name: formData.name,
                phone: formData.phone
            });

            if (response.data.success) {
                // Otomatik giriş yap
                login(response.data.token, response.data.user);
                router.push('/');
            }
        } catch (err: any) {
            console.error('Register error:', err);
            setError(err.response?.data?.message || 'Kayıt olurken bir hata oluştu.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-md p-8 rounded-2xl shadow-xl" style={{ backgroundColor: 'var(--surface)' }}>
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--text)' }}>Aramıza Katıl</h1>
                    <p style={{ color: 'var(--muted)' }}>Hemen ücretsiz hesap oluşturun</p>
                </div>

                {error && (
                    <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/50 text-red-500 text-sm text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: 'var(--muted)' }}>Ad Soyad</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FaUser className="text-gray-400" />
                            </div>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full pl-10 pr-4 py-3 rounded-lg border focus:ring-2 outline-none transition-all"
                                style={{
                                    backgroundColor: 'var(--bg)',
                                    borderColor: 'var(--border)',
                                    color: 'var(--text)'
                                }}
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: 'var(--muted)' }}>Email Adresi</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FaEnvelope className="text-gray-400" />
                            </div>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full pl-10 pr-4 py-3 rounded-lg border focus:ring-2 outline-none transition-all"
                                style={{
                                    backgroundColor: 'var(--bg)',
                                    borderColor: 'var(--border)',
                                    color: 'var(--text)'
                                }}
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: 'var(--muted)' }}>Telefon (Opsiyonel)</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FaPhone className="text-gray-400" />
                            </div>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full pl-10 pr-4 py-3 rounded-lg border focus:ring-2 outline-none transition-all"
                                style={{
                                    backgroundColor: 'var(--bg)',
                                    borderColor: 'var(--border)',
                                    color: 'var(--text)'
                                }}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: 'var(--muted)' }}>Şifre</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FaLock className="text-gray-400" />
                            </div>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full pl-10 pr-4 py-3 rounded-lg border focus:ring-2 outline-none transition-all"
                                style={{
                                    backgroundColor: 'var(--bg)',
                                    borderColor: 'var(--border)',
                                    color: 'var(--text)'
                                }}
                                required
                                minLength={6}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: 'var(--muted)' }}>Şifre Tekrar</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FaLock className="text-gray-400" />
                            </div>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="w-full pl-10 pr-4 py-3 rounded-lg border focus:ring-2 outline-none transition-all"
                                style={{
                                    backgroundColor: 'var(--bg)',
                                    borderColor: 'var(--border)',
                                    color: 'var(--text)'
                                }}
                                required
                                minLength={6}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 px-4 rounded-lg font-bold text-white transition-all transform hover:scale-[1.02] flex items-center justify-center space-x-2 mt-2"
                        style={{
                            backgroundColor: 'var(--accent)',
                            opacity: loading ? 0.7 : 1
                        }}
                    >
                        {loading ? (
                            <>
                                <FaSpinner className="animate-spin" />
                                <span>Kayıt Yapılıyor...</span>
                            </>
                        ) : (
                            <span>Hesap Oluştur</span>
                        )}
                    </button>
                </form>

                <div className="mt-8 text-center text-sm" style={{ color: 'var(--muted)' }}>
                    Zaten hesabınız var mı?{' '}
                    <Link href="/giris" className="font-bold hover:underline" style={{ color: 'var(--accent)' }}>
                        Giriş Yap
                    </Link>
                </div>
            </div>
        </div>
    );
}
