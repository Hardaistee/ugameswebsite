import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import { FaCalendar, FaUser, FaTag, FaArrowLeft } from 'react-icons/fa'

export const dynamic = 'force-dynamic'

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

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const blog = await getBlog(slug)

    if (!blog) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center bg-[var(--bg)]">
                <div className="text-center">
                    <div className="mb-4 text-6xl">😢</div>
                    <h1 className="mb-4 text-3xl font-bold text-[var(--text)]">Blog Bulunamadı</h1>
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 rounded-lg bg-[var(--accent)] px-6 py-3 font-medium text-black transition-transform hover:scale-105"
                    >
                        <FaArrowLeft /> Bloglara Dön
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[var(--bg)] pb-20">
            {/* Hero Image */}
            <div className="relative h-[400px] w-full overflow-hidden md:h-[500px]">
                {blog.image ? (
                    <>
                        <div className="absolute inset-0 bg-black/50 z-10" />
                        <img
                            src={blog.image}
                            alt={blog.title}
                            className="h-full w-full object-cover"
                        />
                    </>
                ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-900 to-blue-900" />
                )}

                {/* Hero Content */}
                <div className="absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-[var(--bg)] to-transparent pb-12 pt-32">
                    <div className="mx-auto max-w-4xl px-4">
                        <Link
                            href="/blog"
                            className="mb-6 inline-flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors"
                        >
                            <FaArrowLeft /> Blog Listesine Dön
                        </Link>

                        <div className="mb-4 flex flex-wrap items-center gap-3">
                            <span className="rounded-full bg-[var(--accent)] px-3 py-1 text-sm font-bold text-black shadow-lg">
                                {blog.category}
                            </span>
                            {blog.tags?.map(tag => (
                                <span key={tag} className="rounded-full bg-white/10 px-3 py-1 text-sm text-white backdrop-blur-sm">
                                    #{tag}
                                </span>
                            ))}
                        </div>

                        <h1 className="mb-6 text-4xl font-black text-white md:text-5xl leading-tight text-shadow-lg">
                            {blog.title}
                        </h1>

                        <div className="flex flex-wrap items-center gap-6 text-white/90">
                            <div className="flex items-center gap-2">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-md">
                                    <FaUser />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs text-white/60">Yazar</span>
                                    <span className="font-medium">{blog.author}</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-md">
                                    <FaCalendar />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs text-white/60">Yayın Tarihi</span>
                                    <span className="font-medium">
                                        {new Date(blog.date).toLocaleDateString('tr-TR', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Actions */}
            <div className="mx-auto max-w-4xl px-4 py-12">
                <article className="prose prose-invert prose-lg max-w-none">
                    <ReactMarkdown
                        components={{
                            h1: ({ children }) => <h1 className="text-3xl font-black mb-6 text-[var(--text)]">{children}</h1>,
                            h2: ({ children }) => <h2 className="text-2xl font-bold mb-4 mt-8 text-[var(--text)] border-b border-[var(--border)] pb-2">{children}</h2>,
                            h3: ({ children }) => <h3 className="text-xl font-bold mb-3 mt-6 text-[var(--text)]">{children}</h3>,
                            p: ({ children }) => <p className="mb-6 leading-relaxed text-[var(--muted)] text-lg">{children}</p>,
                            ul: ({ children }) => <ul className="list-disc pl-6 mb-6 text-[var(--muted)] space-y-2">{children}</ul>,
                            ol: ({ children }) => <ol className="list-decimal pl-6 mb-6 text-[var(--muted)] space-y-2">{children}</ol>,
                            li: ({ children }) => <li className="pl-2">{children}</li>,
                            blockquote: ({ children }) => (
                                <blockquote className="border-l-4 border-[var(--accent)] pl-6 py-2 my-8 italic bg-[var(--surface)] rounded-r-lg">
                                    {children}
                                </blockquote>
                            ),
                            code: ({ className, children, ...props }) => {
                                const match = /language-(\w+)/.exec(className || '')
                                return match ? (
                                    <pre className="bg-[#1a1a1a] p-4 rounded-lg overflow-x-auto my-6 border border-[var(--border)]">
                                        <code className={className} {...props}>
                                            {children}
                                        </code>
                                    </pre>
                                ) : (
                                    <code className="bg-[var(--surface)] px-2 py-1 rounded text-sm text-[var(--accent)] font-mono border border-[var(--border)]" {...props}>
                                        {children}
                                    </code>
                                )
                            },
                            img: ({ src, alt }) => (
                                <div className="my-8">
                                    <img
                                        src={src}
                                        alt={alt}
                                        className="w-full rounded-xl shadow-lg border border-[var(--border)]"
                                    />
                                    {alt && <p className="text-center text-sm text-[var(--muted)] mt-2 italic">{alt}</p>}
                                </div>
                            ),
                            a: ({ href, children }) => (
                                <a
                                    href={href}
                                    className="text-[var(--accent)] font-medium hover:underline decoration-2 underline-offset-4 transition-colors"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {children}
                                </a>
                            ),
                            hr: () => <hr className="my-12 border-[var(--border)]" />,
                            table: ({ children }) => (
                                <div className="overflow-x-auto my-8 border border-[var(--border)] rounded-lg">
                                    <table className="w-full text-left bg-[var(--surface)]">
                                        {children}
                                    </table>
                                </div>
                            ),
                            th: ({ children }) => <th className="px-6 py-4 font-bold border-b border-[var(--border)] bg-[var(--bg)]">{children}</th>,
                            td: ({ children }) => <td className="px-6 py-4 border-b border-[var(--border)] last:border-0">{children}</td>,
                        }}
                    >
                        {blog.content}
                    </ReactMarkdown>
                </article>

                {/* Footer Actions */}
                <div className="mt-12 border-t border-[var(--border)] pt-8">
                    <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
                        <div className="text-center md:text-left">
                            <h3 className="mb-2 text-lg font-bold text-[var(--text)]">Bu yazıyı beğendiniz mi?</h3>
                            <p className="text-[var(--muted)]">Daha fazla içerik için blog sayfamızı ziyaret edin.</p>
                        </div>
                        <Link
                            href="/blog"
                            className="rounded-xl bg-[var(--surface)] border border-[var(--border)] px-8 py-4 font-bold text-[var(--text)] transition-all hover:border-[var(--accent)] hover:bg-[var(--accent)]/10"
                        >
                            Tüm Yazıları İncele
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
