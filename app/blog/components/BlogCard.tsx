"use client"

import Link from 'next/link'


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

export default function BlogCard({ blog }: { blog: Blog }) {
    return (
        <Link
            href={`/blog/${blog.slug}`}
            className="group relative block h-full overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent)] hover:shadow-2xl"
        >
            {/* Image Area */}
            <div className="aspect-video w-full overflow-hidden bg-[var(--bg)] relative">
                {blog.image ? (
                    <img
                        src={blog.image}
                        alt={blog.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-purple-900/20 to-blue-900/20">
                        <span className="text-4xl">🎮</span>
                    </div>
                )}
                <div className="absolute top-4 left-4">
                    <span className="inline-block rounded-lg bg-[var(--accent)] px-3 py-1 text-xs font-bold text-black shadow-lg">
                        {blog.category}
                    </span>
                </div>
            </div>

            {/* Content Area */}
            <div className="p-6">
                <div className="mb-4 flex items-center gap-2 text-xs text-[var(--muted)]">
                    <span>📅 {new Date(blog.date).toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    <span>•</span>
                    <span>⏱️ 5 dk okuma</span>
                </div>

                <h3 className="mb-3 text-xl font-bold leading-tight text-[var(--text)] transition-colors group-hover:text-[var(--accent)]">
                    {blog.title}
                </h3>

                <p className="mb-4 line-clamp-2 text-sm text-[var(--muted)]">
                    {blog.excerpt}
                </p>

                <div className="flex items-center justify-between border-t border-[var(--border)] pt-4">
                    <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--bg)] text-sm">
                            👤
                        </div>
                        <span className="text-sm font-medium text-[var(--text)]">{blog.author}</span>
                    </div>
                    <span className="flex items-center gap-1 text-xs font-medium text-[var(--accent)] opacity-0 transition-opacity group-hover:opacity-100">
                        Devamını Oku
                        <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </span>
                </div>
            </div>
        </Link>
    )
}
