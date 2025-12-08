"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { FaEnvelope, FaLock, FaSpinner } from 'react-icons/fa';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const router = useRouter();
    const { login } = useAuth();

    const API_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001'}/api`;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await axios.post(`${API_URL}/auth/login`, {
                email,
                password
            });

            if (response.data.success) {
                login(response.data.token, response.data.user);
                router.push('/');
            }
        } catch (err: any) {
            console.error('Login error:', err);
            setError(err.response?.data?.message || 'Giriş yapılırken bir hata oluştu.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-md p-8 rounded-2xl shadow-xl" style={{ backgroundColor: 'var(--surface)' }}>
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--text)' }}>Hoş Geldiniz</h1>
                    <p style={{ color: 'var(--muted)' }}>Hesabınıza giriş yapın</p>
                </div>

                {error && (
                    <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/50 text-red-500 text-sm text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: 'var(--muted)' }}>Email Adresi</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FaEnvelope className="text-gray-400" />
                            </div>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
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
                        <label className="block text-sm font-medium mb-2" style={{ color: 'var(--muted)' }}>Şifre</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FaLock className="text-gray-400" />
                            </div>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
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

                    <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center space-x-2 cursor-pointer">
                            <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                            <span style={{ color: 'var(--muted)' }}>Beni hatırla</span>
                        </label>
                        <a href="#" className="font-medium hover:underline" style={{ color: 'var(--accent)' }}>
                            Şifremi unuttum?
                        </a>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 px-4 rounded-lg font-bold text-white transition-all transform hover:scale-[1.02] flex items-center justify-center space-x-2"
                        style={{
                            backgroundColor: 'var(--accent)',
                            opacity: loading ? 0.7 : 1
                        }}
                    >
                        {loading ? (
                            <>
                                <FaSpinner className="animate-spin" />
                                <span>Giriş Yapılıyor...</span>
                            </>
                        ) : (
                            <span>Giriş Yap</span>
                        )}
                    </button>
                </form>

                <div className="mt-8 text-center text-sm" style={{ color: 'var(--muted)' }}>
                    Hesabınız yok mu?{' '}
                    <Link href="/kayit" className="font-bold hover:underline" style={{ color: 'var(--accent)' }}>
                        Kayıt Ol
                    </Link>
                </div>
            </div>
        </div>
    );
}
