'use client'
import React from 'react'

interface SkeletonCardProps {
    count?: number
    variant?: 'game' | 'large'
}

export default function SkeletonCard({ count = 1, variant = 'game' }: SkeletonCardProps) {
    const cards = Array.from({ length: count }, (_, i) => i)
    const isLarge = variant === 'large'

    return (
        <>
            {cards.map((i) => (
                <div
                    key={i}
                    className="border rounded-lg overflow-hidden animate-pulse"
                    style={{
                        background: 'var(--surface)',
                        borderColor: 'var(--border)'
                    }}
                >
                    {/* Image Skeleton */}
                    <div
                        className={`${isLarge ? 'aspect-video' : 'aspect-square'} image-skeleton`}
                    />

                    {/* Content Skeleton */}
                    <div className="p-3 space-y-3">
                        {/* Title */}
                        <div className="h-4 rounded image-skeleton w-3/4" />
                        <div className="h-3 rounded image-skeleton w-1/2" />

                        {/* Price */}
                        <div className="flex items-center gap-2 pt-2">
                            <div className="h-5 rounded image-skeleton w-16" />
                        </div>

                        {/* Button */}
                        <div className="h-9 rounded image-skeleton w-full" />
                    </div>
                </div>
            ))}
        </>
    )
}

// Slider Skeleton
export function SkeletonSlider() {
    return (
        <div
            className="relative rounded-xl overflow-hidden mb-8 border animate-pulse"
            style={{ borderColor: 'var(--border)' }}
        >
            <div className="h-[26rem] sm:h-[30rem] lg:h-[35rem] flex">
                {/* Image Area */}
                <div className="w-full lg:w-2/3 h-full image-skeleton" />

                {/* Info Panel (Desktop) */}
                <div
                    className="hidden lg:flex w-1/3 h-full flex-col justify-center p-8 xl:p-12 space-y-4"
                    style={{ background: 'var(--surface)' }}
                >
                    <div className="h-6 rounded image-skeleton w-1/3" />
                    <div className="h-8 rounded image-skeleton w-3/4" />
                    <div className="h-4 rounded image-skeleton w-full" />
                    <div className="h-4 rounded image-skeleton w-2/3" />
                    <div className="h-10 rounded image-skeleton w-1/3 mt-4" />
                    <div className="h-12 rounded-lg image-skeleton w-full mt-4" />
                </div>
            </div>
        </div>
    )
}

// Section Skeleton
export function SkeletonSection({ title, count = 6 }: { title?: string, count?: number }) {
    return (
        <section className="mb-10">
            {title && (
                <div className="flex items-center justify-between mb-6">
                    <div className="h-7 rounded image-skeleton w-40" />
                    <div className="h-4 rounded image-skeleton w-24" />
                </div>
            )}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                <SkeletonCard count={count} />
            </div>
        </section>
    )
}
