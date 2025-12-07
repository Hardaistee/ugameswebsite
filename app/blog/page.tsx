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

async function getBlogs(): Promise<Blog[]> {
    try {
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001'
        const res = await fetch(`${backendUrl}/api/blogs`, {
            cache: 'no-store'
        })

        if (!res.ok) {
            console.error('Failed to fetch blogs')
            return []
        }

        const data = await res.json()
        return data.blogs || []
    } catch (error) {
        console.error(' fetching blogs:', error)
        return []
    }
}

export default async function BlogPage() {
    const blogs = await getBlogs()

    return (
        <div className="min-h-screen pb-12" style={{ background: 'var(--bg)' }}>
            <div className="max-w-4xl mx-auto px-4 py-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-black mb-4" style={{ color: 'var(--text)' }}>
                        Blog
                    </h1>
                    <p className="text-lg" style={{ color: 'var(--muted)' }}>
                        Oyun dünyasından haberler, rehberler ve daha fazlası
                    </p>
                </div>

                {/* Blog Posts Grid */}
                <div className="grid gap-6">
                    {blogs.length > 0 ? (
                        blogs.map((blog) => (
                            <Link
                                key={blog.slug}
                                href={`/blog/${blog.slug}`}
                                className="rounded-xl overflow-hidden border hover:border-[var(--accent)] transition-all"
                                style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}
                            >
                                <article className="p-6">
                                    <div className="flex items-center gap-2 mb-3">
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
                                    <h2 className="text-2xl font-bold mb-3 hover:text-[var(--accent)] transition-colors" style={{ color: 'var(--text)' }}>
                                        {blog.title}
                                    </h2>
                                    <p className="mb-4 line-clamp-2" style={{ color: 'var(--muted)' }}>
                                        {blog.excerpt}
                                    </p>
                                    <div className="flex items-center gap-3 text-sm" style={{ color: 'var(--muted)' }}>
                                        <span>✍️ {blog.author}</span>
                                        {blog.tags && blog.tags.length > 0 && (
                                            <>
                                                <span>•</span>
                                                <div className="flex gap-2">
                                                    {blog.tags.slice(0, 3).map((tag) => (
                                                        <span key={tag} className="text-xs">
                                                            #{tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </article>
                            </Link>
                        ))
                    ) : (
                        <div
                            className="text-center py-20 rounded-xl border-2 border-dashed"
                            style={{ borderColor: 'var(--border)' }}
                        >
                            <div className="text-6xl mb-4">📝</div>
                            <h3 className="text-2xl font-bold mb-2" style={{ color: 'var(--text)' }}>
                                Henüz Blog Yok
                            </h3>
                            <p style={{ color: 'var(--muted)' }}>
                                Yakında içerikler eklenecek
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
