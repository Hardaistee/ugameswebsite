"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { FaUser, FaHistory, FaBox, FaCreditCard, FaCalendar, FaSpinner, FaSignOutAlt, FaPhone } from 'react-icons/fa';
import { API_CONFIG } from '../../lib/api-config';

interface OrderItem {
    name: string;
    quantity: number;
    total: string;
}

interface Order {
    orderId: number;
    date: string;
    total: string;
    status: string;
    paymentMethod: string;
    items: OrderItem[];
}

export default function ProfilePage() {
    const { user, token, loading: authLoading, logout } = useAuth();
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const API_URL = `${API_CONFIG.BACKEND_URL}/api`;

    useEffect(() => {
        if (!authLoading && !user) {
            router.push('/giris');
            return;
        }

        if (user && token) {
            fetchOrders();
        }
    }, [user, authLoading, token]);

    const fetchOrders = async () => {
        try {
            const response = await axios.get(`${API_URL}/user/orders`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.data.success) {
                // Filter duplicate orders (same orderId)
                const uniqueOrders = response.data.orders.filter(
                    (order: any, index: number, self: any[]) =>
                        index === self.findIndex((o) => o.orderId === order.orderId)
                );
                setOrders(uniqueOrders);
            }
        } catch (error) {
            console.error('Fetch orders error:', error);
        } finally {
            setLoading(false);
        }
    };

    if (authLoading || (!user && loading)) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <FaSpinner className="text-4xl animate-spin" style={{ color: 'var(--accent)' }} />
            </div>
        );
    }

    if (!user) return null;

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Sol Panel: Kullanıcı Bilgileri */}
                <div className="md:col-span-1">
                    <div className="rounded-2xl shadow-lg p-6 sticky top-24" style={{ backgroundColor: 'var(--surface)' }}>
                        <div className="text-center mb-6">
                            <div className="w-24 h-24 mx-auto bg-gray-700 rounded-full flex items-center justify-center mb-4 text-4xl">
                                👤
                            </div>
                            <h2 className="text-xl font-bold">{user.name}</h2>
                            <p className="text-sm opacity-70">{user.email}</p>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center space-x-3 p-3 rounded-lg bg-opacity-50" style={{ backgroundColor: 'var(--bg)' }}>
                                <FaPhone className="opacity-50" />
                                <span>{user.phone || 'Telefon eklenmemiş'}</span>
                            </div>
                            <div className="flex items-center space-x-3 p-3 rounded-lg bg-opacity-50" style={{ backgroundColor: 'var(--bg)' }}>
                                <FaCalendar className="opacity-50" />
                                <span>Katılım: {new Date(user.createdAt || '').toLocaleDateString('tr-TR')}</span>
                            </div>
                        </div>

                        <button
                            onClick={logout}
                            className="w-full mt-6 py-2 px-4 rounded-lg border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-all flex items-center justify-center space-x-2"
                        >
                            <FaSignOutAlt />
                            <span>Çıkış Yap</span>
                        </button>
                    </div>
                </div>

                {/* Sağ Panel: Sipariş Geçmişi */}
                <div className="md:col-span-2">
                    <h2 className="text-2xl font-bold mb-6 flex items-center space-x-2">
                        <FaHistory style={{ color: 'var(--accent)' }} />
                        <span>Sipariş Geçmişi</span>
                    </h2>

                    {loading ? (
                        <div className="text-center py-12">
                            <FaSpinner className="text-3xl animate-spin mx-auto mb-4" />
                            <p>Siparişler yükleniyor...</p>
                        </div>
                    ) : orders.length === 0 ? (
                        <div className="text-center py-12 rounded-2xl" style={{ backgroundColor: 'var(--surface)' }}>
                            <FaBox className="text-5xl mx-auto mb-4 opacity-30" />
                            <h3 className="text-xl font-bold mb-2">Henüz Siparişiniz Yok</h3>
                            <p className="opacity-70 mb-6">İhtiyacınız olan oyun ve ürünleri hemen keşfedin.</p>
                            <button
                                onClick={() => router.push('/oyunlar')}
                                className="py-2 px-6 rounded-lg font-bold transition-all transform hover:scale-105"
                                style={{ backgroundColor: 'var(--accent)', color: 'var(--accent-contrast)' }}
                            >
                                Alışverişe Başla
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {orders.map((order, index) => (
                                <div key={`order-${order.orderId}-${index}`} className="rounded-xl overflow-hidden shadow-md" style={{ backgroundColor: 'var(--surface)' }}>
                                    {/* Sipariş Başlığı */}
                                    <div className="p-4 border-b flex flex-wrap justify-between items-center gap-4" style={{ borderColor: 'var(--border)' }}>
                                        <div>
                                            <div className="text-sm opacity-70">Sipariş No</div>
                                            <div className="font-bold font-mono">#{order.orderId}</div>
                                        </div>
                                        <div>
                                            <div className="text-sm opacity-70">Tarih</div>
                                            <div className="font-medium">{new Date(order.date).toLocaleDateString('tr-TR')}</div>
                                        </div>
                                        <div>
                                            <div className="text-sm opacity-70">Toplam</div>
                                            <div className="font-bold" style={{ color: 'var(--accent)' }}>{order.total}</div>
                                        </div>
                                        <div>
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${order.status === 'completed' ? 'bg-green-500/20 text-green-500' :
                                                order.status === 'processing' ? 'bg-blue-500/20 text-blue-500' :
                                                    order.status === 'on-hold' ? 'bg-yellow-500/20 text-yellow-500' :
                                                        'bg-gray-500/20 text-gray-500'
                                                }`}>
                                                {order.status}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Sipariş Detayları */}
                                    <div className="p-4">
                                        <div className="space-y-3">
                                            {order.items.map((item, idx) => (
                                                <div key={idx} className="flex justify-between items-center py-2 border-b last:border-0" style={{ borderColor: 'var(--border)' }}>
                                                    <div className="flex items-center space-x-3">
                                                        <div className="w-8 h-8 rounded bg-gray-700 flex items-center justify-center text-xs">
                                                            {item.quantity}x
                                                        </div>
                                                        <span>{item.name}</span>
                                                    </div>
                                                    <div className="font-medium">{item.total} TL</div>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="mt-4 pt-4 border-t flex justify-between items-center text-sm" style={{ borderColor: 'var(--border)' }}>
                                            <div className="flex items-center space-x-2 opacity-70">
                                                <FaCreditCard />
                                                <span>{order.paymentMethod}</span>
                                            </div>
                                            {/* Gelecekte fatura görüntüleme vb. eklenebilir */}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
