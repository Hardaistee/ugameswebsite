'use client'
import React, { useState, useRef, useEffect } from 'react'

interface Message {
    id: string
    text: string
    sender: 'user' | 'bot'
    timestamp: Date
}

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            text: 'Merhaba! Ben uGames asistanıyım. Size nasıl yardımcı olabilirim?',
            sender: 'bot',
            timestamp: new Date()
        }
    ])
    const [inputText, setInputText] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const messagesEndRef = useRef<HTMLDivElement>(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

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
            const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001'
            const response = await fetch(`${backendUrl}/api/chat`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: userMessage.text })
            })

            const data = await response.json()

            const botMessage: Message = {
                id: (Date.now() + 1).toString(),
                text: data.success ? data.message : 'Üzgünüm, şu anda yanıt veremiyorum.',
                sender: 'bot',
                timestamp: new Date()
            }

            setMessages(prev => [...prev, botMessage])
        } catch (error) {
            console.error('Chat Error:', error)
            const errorMessage: Message = {
                id: (Date.now() + 1).toString(),
                text: 'Bağlantı hatası oluştu. Lütfen daha sonra tekrar deneyin.',
                sender: 'bot',
                timestamp: new Date()
            }
            setMessages(prev => [...prev, errorMessage])
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="fixed bottom-24 md:bottom-6 right-4 md:right-6 z-40 flex flex-col items-end pointer-events-none">
            {/* Chat Window */}
            <div
                className={`pointer-events-auto bg-[#1a1a1a] w-[calc(100vw-2rem)] sm:w-[380px] max-h-[70vh] sm:h-[500px] rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300 origin-bottom-right mb-4 border border-[#333] ${isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-10 pointer-events-none'
                    }`}
            >
                {/* Header */}
                <div className="bg-[#1a1a1a] p-4 flex items-center justify-between border-b border-[#333] shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-600">
                            <img src="/images/favicon.png" alt="AI Avatar" className="w-full h-full object-cover" />
                        </div>
                        <div>
                            <h3 className="font-bold text-white text-sm">uGames Asistan</h3>
                            <div className="flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                                <span className="text-xs text-gray-400">Aktif</span>
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={() => setIsOpen(false)}
                        aria-label="Sohbeti kapat"
                        className="text-gray-400 hover:text-white transition-colors p-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-[#141414]">
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div className={`flex items-end gap-2 max-w-[85%] ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                                {/* Avatar */}
                                <div className={`w-6 h-6 rounded-full shrink-0 flex items-center justify-center text-xs overflow-hidden ${msg.sender === 'user'
                                    ? 'bg-[#333] text-gray-300'
                                    : 'border border-gray-600'
                                    }`}>
                                    {msg.sender === 'user' ? (
                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    ) : (
                                        <img src="/images/favicon.png" alt="AI" className="w-full h-full object-cover" />
                                    )}
                                </div>

                                {/* Bubble */}
                                <div>
                                    <div
                                        className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${msg.sender === 'user'
                                            ? 'bg-[#333] text-white rounded-br-none'
                                            : 'bg-[#262626] text-gray-200 rounded-bl-none'
                                            }`}
                                    >
                                        {msg.text}
                                    </div>
                                    <span className="text-[10px] text-gray-500 mt-1 block px-1">
                                        {msg.timestamp.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex justify-start">
                            <div className="flex items-end gap-2">
                                <div className="w-6 h-6 rounded-full overflow-hidden border border-gray-600 shrink-0">
                                    <img src="/images/favicon.png" alt="AI" className="w-full h-full object-cover" />
                                </div>
                                <div className="bg-[#262626] px-4 py-3 rounded-2xl rounded-bl-none flex gap-1">
                                    <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                                    <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                                    <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <form onSubmit={handleSendMessage} className="p-4 bg-[#1a1a1a] border-t border-[#333] shrink-0">
                    <div className="relative flex items-center">
                        <input
                            type="text"
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            placeholder="Bir soru sorun..."
                            className="w-full bg-[#262626] text-white rounded-xl py-3 pl-4 pr-12 text-sm focus:outline-none focus:ring-1 focus:ring-gray-500 transition-all placeholder:text-gray-500"
                        />
                        <button
                            type="submit"
                            disabled={!inputText.trim() || isLoading}
                            aria-label="Mesaj gönder"
                            className="absolute right-2 p-2 bg-[#333] text-white rounded-lg hover:bg-white hover:text-black transition-all disabled:opacity-50 disabled:hover:bg-[#333] disabled:hover:text-white min-w-[44px] min-h-[44px] flex items-center justify-center"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                            </svg>
                        </button>
                    </div>
                    <div className="text-center mt-2">
                        <p className="text-[10px] text-gray-500 flex items-center justify-center gap-1">
                            Powered by <span className="font-bold text-gray-400">Unifor</span>
                        </p>
                    </div>
                </form>
            </div>

            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="pointer-events-auto w-14 h-14 rounded-full bg-black text-white shadow-xl hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center group z-50 overflow-hidden"
                aria-label="Chat assistant"
            >
                <div className="relative w-6 h-6">
                    <svg
                        className={`w-6 h-6 absolute top-0 left-0 transition-all duration-300 ${isOpen ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                    <svg
                        className={`w-6 h-6 absolute top-0 left-0 transition-all duration-300 ${isOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </div>
            </button>
        </div>
    )
}
