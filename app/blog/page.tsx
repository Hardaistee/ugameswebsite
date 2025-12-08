import BlogList from './components/BlogList'

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

    // En yeni bloğu featured olarak seçelim (opsiyonel)
    const featuredBlog = blogs[0]

    return (
        <div className="min-h-screen bg-[var(--bg)] pb-20">
            {/* Hero Section */}
            <div className="relative bg-[#0a0a0a] border-b border-[var(--border)] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/10 to-purple-900/10" />
                <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10" />

                <div className="relative mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8">
                    <span className="mb-4 inline-block rounded-full bg-[var(--accent)]/10 px-4 py-1.5 text-sm font-semibold text-[var(--accent)] border border-[var(--accent)]/20">
                        🚀 uGames Blog
                    </span>
                    <h1 className="mb-6 text-4xl font-black tracking-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent sm:text-6xl">
                        Oyun Dünyasının Nabzı
                    </h1>
                    <p className="mx-auto max-w-2xl text-lg text-[var(--muted)]">
                        En güncel oyun haberleri, detaylı incelemeler, e-spor gelişmeleri ve özel rehberler ile oyun dünyasını yakından takip edin.
                    </p>
                </div>
            </div>

            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                {/* Content */}
                <BlogList initialBlogs={blogs} />
            </div>
        </div>
    )
}
