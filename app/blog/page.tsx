import Link from 'next/link'
import BlogList from './components/BlogList'
import { FadeIn } from '../components/animations/FadeIn'

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

export const dynamic = 'force-dynamic'

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
        <div className="min-h-screen bg-[var(--bg)]">
            {/* Hero Section */}
            <div className="relative py-24 px-4 overflow-hidden border-b border-[var(--border)]">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
                </div>

                {/* Gradient Blob */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

                <div className="container mx-auto relative z-10">
                    <div className="max-w-3xl">
                        <FadeIn direction="up">
                            <span className="inline-block px-4 py-1.5 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] font-bold text-sm mb-6 border border-[var(--accent)]/20">
                                uGames Blog
                            </span>
                        </FadeIn>

                        <FadeIn direction="up" delay={0.1}>
                            <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight text-[var(--text)]">
                                Oyun Dünyasından <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent)] to-purple-500">
                                    Haberler ve İpuçları
                                </span>
                            </h1>
                        </FadeIn>

                        <FadeIn direction="up" delay={0.2}>
                            <p className="text-xl text-[var(--muted)] mb-8 leading-relaxed max-w-2xl">
                                En güncel oyun haberleri, incelemeler, rehberler ve e-spor dünyasından gelişmeler. Oyun dünyasını bizimle takip edin.
                            </p>
                        </FadeIn>

                        <FadeIn direction="up" delay={0.3}>
                            <div className="flex flex-wrap gap-4">
                                <Link
                                    href="/oyunlar"
                                    className="px-8 py-4 rounded-xl bg-[var(--text)] text-[var(--bg)] font-bold hover:scale-105 transition-transform shadow-lg shadow-white/10"
                                >
                                    Mağazaya Dön
                                </Link>
                                <button className="px-8 py-4 rounded-xl bg-[var(--surface)] text-[var(--text)] font-bold border border-[var(--border)] hover:bg-[var(--surface)]/80 transition-colors">
                                    Bültene Abone Ol
                                </button>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </div>

            {/* Blog Posts */}
            <div className="container mx-auto px-4 py-20">
                <BlogList initialBlogs={blogs} />
            </div>
        </div>
    )
}
