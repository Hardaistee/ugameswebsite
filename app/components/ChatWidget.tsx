'use client'
import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { API_ENDPOINTS } from '../../lib/api-config'

interface Product {
    id: number
    name: string
    price: string
    slug: string
    url: string
    image?: string | null
    on_sale?: boolean
    sale_price?: string
    regular_price?: string
    stock_status?: string
    categories?: string
}

interface Message {
    id: string
    text: string
    sender: 'user' | 'bot'
    timestamp: Date
    products?: Product[]
}

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false)
    const [isMobile, setIsMobile] = useState(false)
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            text: 'Merhaba! 👋 Size nasıl yardımcı olabilirim?',
            sender: 'bot',
            timestamp: new Date()
        }
    ])
    const [inputText, setInputText] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const messagesEndRef = useRef<HTMLDivElement>(null)

    // Check if mobile
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768)
        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    // Clean markdown formatting from text
    const cleanMarkdown = (text: string): string => {
        return text
            .replace(/\*\*([^*]+)\*\*/g, '$1')
            .replace(/__([^_]+)__/g, '$1')
            .replace(/\*([^*]+)\*/g, '$1')
            .replace(/_([^_]+)_/g, '$1')
            .replace(/^\* /gm, '• ')
            .replace(/^- /gm, '• ')
            .replace(/^#+\s*/gm, '')
            .replace(/```[^`]*```/gs, '')
            .replace(/`([^`]+)`/g, '$1')
            .replace(/\n{3,}/g, '\n\n')
            .trim();
    };

    useEffect(() => {
        scrollToBottom()
    }, [messages, isOpen])

    const handleSendMessage = async (e?: React.FormEvent) => {
        e?.preventDefault()
        if (!inputText.trim() || isLoading) return

        const userMessage: Message = {
            id: Date.now().toString(),
            text: inputText.trim(),
            sender: 'user',
            timestamp: new Date()
        }

        setMessages(prev => [...prev, userMessage])
        setInputText('')
        setIsLoading(true)

        try {
            const response = await fetch(API_ENDPOINTS.CHAT, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: userMessage.text })
            })

            const data = await response.json()

            const botMessage: Message = {
                id: (Date.now() + 1).toString(),
                text: data.success ? cleanMarkdown(data.message) : 'Üzgünüm, şu anda yanıt veremiyorum.',
                sender: 'bot',
                timestamp: new Date(),
                products: data.products || []
            }

            setMessages(prev => [...prev, botMessage])
        } catch (error) {
            console.error('Chat Error:', error)
            const errorMessage: Message = {
                id: (Date.now() + 1).toString(),
                text: 'Bağlantı hatası oluştu. Lütfen tekrar deneyin.',
                sender: 'bot',
                timestamp: new Date()
            }
            setMessages(prev => [...prev, errorMessage])
        } finally {
            setIsLoading(false)
        }
    }

    // Expose toggle function globally for BottomNav
    useEffect(() => {
        if (typeof window !== 'undefined') {
            (window as any).__toggleAIChat = () => setIsOpen(prev => !prev);
            (window as any).__openAIChat = () => setIsOpen(true);
            (window as any).__closeAIChat = () => setIsOpen(false);
        }
        return () => {
            if (typeof window !== 'undefined') {
                delete (window as any).__toggleAIChat;
                delete (window as any).__openAIChat;
                delete (window as any).__closeAIChat;
            }
        };
    }, []);

    // Product Card - Compact for chat
    const ProductCard = ({ product }: { product: Product }) => (
        <Link
            href={product.url || `/urun/${product.slug}`}
            className="flex items-center gap-2 p-2 rounded-lg bg-[#1f1f1f] hover:bg-[#2a2a2a] transition-all group border border-[#333] hover:border-[var(--accent)]"
        >
            <div className="w-10 h-10 rounded-md bg-[#333] flex items-center justify-center overflow-hidden shrink-0">
                {product.image ? (
                    <img src={product.image} alt="" className="w-full h-full object-cover" />
                ) : (
                    <span className="text-lg">🎮</span>
                )}
            </div>
            <div className="flex-1 min-w-0">
                <h4 className="text-xs font-medium text-white truncate group-hover:text-[var(--accent)]">
                    {product.name}
                </h4>
                <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-[var(--accent)]">{product.price} TL</span>
                    <span className={`text-[10px] ${product.stock_status === 'instock' ? 'text-green-500' : 'text-red-400'}`}>
                        {product.stock_status === 'instock' ? '✓' : '✗'}
                    </span>
                </div>
            </div>
            <svg className="w-4 h-4 text-gray-500 group-hover:text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
        </Link>
    );

    // Mobile Full-Screen Chat (WhatsApp style)
    if (isMobile) {
        if (!isOpen) return null;

        return (
            <div
                className="fixed inset-0 z-50 md:hidden flex flex-col bg-[#0a0a0a]"
                style={{
                    // Use dvh for dynamic viewport height (accounts for mobile browser chrome)
                    height: '100dvh'
                }}
            >
                {/* Header - Fixed */}
                <div className="bg-[#0d0d0d] px-4 py-3 border-b border-[#222] shrink-0 safe-area-inset-top">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setIsOpen(false)}
                                className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center text-gray-400 active:bg-[#1a1a1a]"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--accent)] to-[#ff6b00] p-0.5">
                                <div className="w-full h-full rounded-full overflow-hidden bg-[#0d0d0d]">
                                    <img src="/images/favicon.png" alt="" className="w-full h-full object-cover" />
                                </div>
                            </div>
                            <div>
                                <h3 className="font-bold text-white text-base">uGames AI</h3>
                                <div className="flex items-center gap-1.5">
                                    <span className="w-2 h-2 rounded-full bg-green-500" />
                                    <span className="text-xs text-green-400">Çevrimiçi</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Messages - Scrollable, takes remaining space */}
                <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 overscroll-contain">
                    {messages.map((msg) => (
                        <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className="max-w-[85%]">
                                <div className={`px-4 py-2.5 rounded-2xl text-[15px] leading-relaxed ${msg.sender === 'user'
                                    ? 'bg-[var(--accent)] text-black font-medium rounded-br-md'
                                    : 'bg-[#1a1a1a] text-gray-100 rounded-bl-md border border-[#2a2a2a]'
                                    }`}>
                                    {msg.text}
                                </div>
                                {msg.products && msg.products.length > 0 && (
                                    <div className="space-y-2 mt-2">
                                        {msg.products.map((product) => (
                                            <ProductCard key={product.id} product={product} />
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex justify-start">
                            <div className="bg-[#1a1a1a] px-5 py-3 rounded-2xl rounded-bl-md border border-[#2a2a2a] flex gap-1.5">
                                <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area - Fixed at bottom, keyboard-aware */}
                <form
                    onSubmit={handleSendMessage}
                    className="bg-[#0d0d0d] border-t border-[#222] shrink-0 p-3 pb-safe"
                >
                    <div className="flex items-center gap-2">
                        <input
                            type="text"
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            placeholder="Mesaj yazın..."
                            autoComplete="off"
                            autoCorrect="off"
                            autoCapitalize="off"
                            className="flex-1 bg-[#1a1a1a] text-white rounded-full py-3 px-5 focus:outline-none border border-[#2a2a2a] placeholder:text-gray-500"
                            style={{ fontSize: '16px' }}
                        />
                        <button
                            type="submit"
                            disabled={!inputText.trim() || isLoading}
                            className="w-12 h-12 rounded-full bg-[var(--accent)] text-black flex items-center justify-center disabled:opacity-40 active:scale-95 transition-transform"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                            </svg>
                        </button>
                    </div>
                </form>
            </div>
        );
    }

    // Desktop - Responsive floating window
    return (
        <div className="hidden md:flex fixed bottom-6 right-6 z-40 flex-col items-end">
            {/* Chat Window - Responsive sizing based on viewport */}
            <div
                className={`bg-[#1a1a1a] rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300 origin-bottom-right mb-4 border border-[#333] ${isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-10 pointer-events-none hidden'
                    }`}
                style={{
                    width: 'min(400px, 90vw)',
                    height: 'min(550px, 70vh)',
                    maxWidth: '400px',
                    maxHeight: '600px',
                    minWidth: '320px',
                    minHeight: '400px'
                }}
            >
                {/* Header */}
                <div className="bg-[#1a1a1a] p-4 flex items-center justify-between border-b border-[#333] shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full overflow-hidden border border-gray-600">
                            <img src="/images/favicon.png" alt="AI" className="w-full h-full object-cover" />
                        </div>
                        <div>
                            <h3 className="font-bold text-white text-sm">uGames AI Asistan</h3>
                            <div className="flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                <span className="text-xs text-gray-400">Çevrimiçi</span>
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="text-gray-400 hover:text-white transition-colors p-2"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#141414]">
                    {messages.map((msg) => (
                        <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`flex items-start gap-2 max-w-[85%] ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                                <div className={`w-7 h-7 rounded-full shrink-0 flex items-center justify-center text-xs overflow-hidden ${msg.sender === 'user' ? 'bg-[#333]' : 'border border-gray-600'
                                    }`}>
                                    {msg.sender === 'user' ? '👤' : (
                                        <img src="/images/favicon.png" alt="" className="w-full h-full object-cover" />
                                    )}
                                </div>
                                <div className="flex flex-col gap-2">
                                    <div className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${msg.sender === 'user'
                                        ? 'bg-[var(--accent)] text-black rounded-br-sm'
                                        : 'bg-[#262626] text-gray-200 rounded-bl-sm'
                                        }`}>
                                        {msg.text}
                                    </div>
                                    {msg.products && msg.products.length > 0 && (
                                        <div className="space-y-2">
                                            {msg.products.map((product) => (
                                                <ProductCard key={product.id} product={product} />
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex justify-start">
                            <div className="flex items-end gap-2">
                                <div className="w-7 h-7 rounded-full overflow-hidden border border-gray-600">
                                    <img src="/images/favicon.png" alt="" className="w-full h-full object-cover" />
                                </div>
                                <div className="bg-[#262626] px-4 py-3 rounded-2xl rounded-bl-sm flex gap-1">
                                    <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                    <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                    <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <form onSubmit={handleSendMessage} className="p-4 bg-[#1a1a1a] border-t border-[#333] shrink-0">
                    <div className="relative flex items-center">
                        <input
                            type="text"
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            placeholder="Bir soru sorun..."
                            className="w-full bg-[#262626] text-white rounded-xl py-3 pl-4 pr-12 text-sm focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
                        />
                        <button
                            type="submit"
                            disabled={!inputText.trim() || isLoading}
                            className="absolute right-2 p-2 bg-[var(--accent)] text-black rounded-lg disabled:opacity-50"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                            </svg>
                        </button>
                    </div>
                </form>
            </div>

            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-14 h-14 rounded-full bg-[var(--accent)] text-black shadow-xl hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center"
            >
                <div className="relative w-6 h-6">
                    <svg
                        className={`w-6 h-6 absolute transition-all duration-300 ${isOpen ? 'opacity-0 rotate-90 scale-0' : 'opacity-100'}`}
                        fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                    <svg
                        className={`w-6 h-6 absolute transition-all duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 -rotate-90 scale-0'}`}
                        fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </div>
            </button>
        </div>
    )
}
