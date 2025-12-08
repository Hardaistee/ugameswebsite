"use client"

import { useState } from 'react'
import BlogCard from './BlogCard'
import { FaSearch, FaFilter } from 'react-icons/fa'

interface Blog {
    slug: string
    title: string
    excerpt: string
    category: string
    author: string
    date: string
    image: string
    tags: string[]
}

export default function BlogList({ initialBlogs }: { initialBlogs: Blog[] }) {
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedCategory, setSelectedCategory] = useState<string | 'ALL'>('ALL')

    // Get unique categories
    const categories = ['ALL', ...Array.from(new Set(initialBlogs.map(blog => blog.category)))]

    // Filter blogs
    const filteredBlogs = initialBlogs.filter(blog => {
        const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
            blog.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))

        const matchesCategory = selectedCategory === 'ALL' || blog.category === selectedCategory

        return matchesSearch && matchesCategory
    })

    return (
        <div className="space-y-8">
            {/* Filters & Search */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between rounded-2xl bg-[var(--surface)] p-4 border border-[var(--border)]">
                {/* Categories */}
                <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
                    {categories.map(category => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium transition-all ${selectedCategory === category
                                    ? 'bg-[var(--accent)] text-black shadow-lg shadow-[var(--accent)]/20'
                                    : 'bg-[var(--bg)] text-[var(--muted)] hover:text-[var(--text)]'
                                }`}
                        >
                            {category === 'ALL' ? 'Tümü' : category}
                        </button>
                    ))}
                </div>

                {/* Search */}
                <div className="relative w-full md:w-64">
                    <input
                        type="text"
                        placeholder="İçerik ara..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full rounded-lg border border-[var(--border)] bg-[var(--bg)] py-2 pl-10 pr-4 text-sm text-[var(--text)] outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]"
                    />
                    <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted)]" />
                </div>
            </div>

            {/* Grid */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredBlogs.length > 0 ? (
                    filteredBlogs.map((blog) => (
                        <BlogCard key={blog.slug} blog={blog} />
                    ))
                ) : (
                    <div className="col-span-full py-20 text-center">
                        <div className="mb-4 text-6xl opacity-50">🔍</div>
                        <h3 className="mb-2 text-2xl font-bold text-[var(--text)]">Sonuç Bulunamadı</h3>
                        <p className="text-[var(--muted)]">Aradığınız kriterlere uygun blog yazısı bulunmamaktadır.</p>
                        <button
                            onClick={() => {
                                setSearchQuery('')
                                setSelectedCategory('ALL')
                            }}
                            className="mt-4 text-[var(--accent)] hover:underline"
                        >
                            Filtreleri Temizle
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}
