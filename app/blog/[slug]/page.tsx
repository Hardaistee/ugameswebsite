import Link from 'next/link'
import ReactMarkdown from 'react-markdown'

interface Blog {
    slug: string
    title: string
    excerpt: string
    content: string
    category: string
    author: string
    date: string
    image: string
    tags: string[]
}

async function getBlog(slug: string): Promise<Blog | null> {
    try {
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001'
        const res = await fetch(`${backendUrl}/api/blogs/${slug}`, {
            cache: 'no-store'
        })

        if (!res.ok) {
            return null
        }

        const data = await res.json()
        return data.blog || null
    } catch (error) {
        console.error('Error fetching blog:', error)
        return null
    }
}

export default async function BlogDetailPage({ params }: { params: { slug: string } }) {
    const blog = await getBlog(params.slug)

    if (!blog) {
        return (
            <div className="min-h-screen flex items-center justify-center pb-12" style={{ background: 'var(--bg)' }}>
                <div className="text-center">
                    <div className="text-6xl mb-4">😢</div>
                    <h1 className="text-3xl font-bold mb-4" style={{ color: 'var(--text)' }}>
                        Blog Bulunamadı
                    </h1>
                    <Link
                        href="/blog"
                        className="inline-block px-6 py-3 rounded-lg font-medium transition-all hover:scale-105"
                        style={{ background: 'var(--accent)', color: '#000' }}
                    >
                        Bloglara Dön
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen pb-12" style={{ background: 'var(--bg)' }}>
            <div className="max-w-3xl mx-auto px-4 py-8">
                {/* Back Button */}
                <Link
                    href="/blog"
                    className="inline-flex items-center gap-2 mb-6 hover:text-[var(--accent)] transition-colors"
                    style={{ color: 'var(--muted)' }}
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Bloglara Dön
                </Link>

                {/* Blog Header */}
                <article className="rounded-xl border p-8 mb-8" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
                    <div className="flex items-center gap-2 mb-4">
                        <span
                            className="text-xs px-3 py-1 rounded-full font-medium"
                            style={{ background: 'var(--accent)', color: '#000' }}
                        >
                            {blog.category}
                        </span>
                        <span className="text-sm" style={{ color: 'var(--muted)' }}>
                            {new Date(blog.date).toLocaleDateString('tr-TR', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </span>
                    </div>

                    <h1 className="text-3xl md:text-4xl font-black mb-4" style={{ color: 'var(--text)' }}>
                        {blog.title}
                    </h1>

                    <div className="flex items-center gap-3 mb-6 text-sm" style={{ color: 'var(--muted)' }}>
                        <span>✍️ {blog.author}</span>
                    </div>

                    {/* Tags */}
                    {blog.tags && blog.tags.length > 0 && (
                        <div className="flex gap-2 flex-wrap mb-6">
                            {blog.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="text-xs px-3 py-1 rounded-full"
                                    style={{ background: 'var(--bg)', color: 'var(--muted)' }}
                                >
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    )}

                    {/* Content */}
                    <div
                        className="prose prose-invert max-w-none"
                        style={{ color: 'var(--text)' }}
                    >
                        <ReactMarkdown>{blog.content}</ReactMarkdown>
                    </div>
                </article>

                {/* Back to Blog */}
                <div className="text-center">
                    <Link
                        href="/blog"
                        className="inline-block px-6 py-3 rounded-lg font-medium transition-all hover:scale-105"
                        style={{ background: 'var(--accent)', color: '#000' }}
                    >
                        Tüm Blogları Gör
                    </Link>
                </div>
            </div>
        </div>
    )
}
