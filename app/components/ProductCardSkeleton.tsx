'use client'
import React from 'react'

interface ProductCardSkeletonProps {
    variant?: 'game' | 'epin'
    size?: 'normal' | 'large'
}

export default function ProductCardSkeleton({ variant = 'epin', size = 'normal' }: ProductCardSkeletonProps) {
    const isGame = variant === 'game'
    const isLarge = size === 'large'

    return (
        <div className="block h-full">
            <div
                className={`border rounded-lg overflow-hidden h-full flex flex-col animate-pulse`}
                style={{
                    background: 'var(--surface)',
                    borderColor: 'var(--border)'
                }}
            >
                {/* Image Skeleton */}
                <div
                    className={`relative ${isGame
                        ? (isLarge ? 'aspect-video' : 'aspect-square')
                        : 'h-48'
                        } overflow-hidden`}
                    style={{ background: 'var(--bg)' }}
                >
                    <div className="w-full h-full bg-gray-700/50" />
                </div>

                {/* Content Skeleton */}
                <div className={`${isLarge ? 'p-4' : 'p-3'} flex flex-col flex-1`}>
                    {/* Seller skeleton (epin only) */}
                    {!isGame && (
                        <div className="h-4 w-24 bg-gray-700/50 rounded mb-2" />
                    )}

                    {/* Title skeleton */}
                    <div className="space-y-2 mb-3">
                        <div className="h-4 bg-gray-700/50 rounded w-full" />
                        <div className="h-4 bg-gray-700/50 rounded w-3/4" />
                    </div>

                    {/* Price section skeleton */}
                    <div className="mt-auto pt-3 border-t flex items-center justify-between" style={{ borderColor: 'var(--border)' }}>
                        <div className="space-y-1">
                            <div className="h-3 w-16 bg-gray-700/50 rounded" />
                            <div className="h-6 w-24 bg-gray-700/50 rounded" />
                        </div>
                        <div className="h-6 w-12 bg-gray-700/50 rounded" />
                    </div>

                    {/* Button skeleton (game only) */}
                    {isGame && (
                        <div className="mt-3 h-10 bg-gray-700/50 rounded" />
                    )}
                </div>
            </div>
        </div>
    )
}

// Grid of skeletons for loading state
export function ProductGridSkeleton({ count = 8, variant = 'game' }: { count?: number, variant?: 'game' | 'epin' }) {
    return (
        <>
            {Array.from({ length: count }).map((_, i) => (
                <ProductCardSkeleton key={i} variant={variant} />
            ))}
        </>
    )
}
