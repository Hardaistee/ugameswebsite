'use client'
import React from 'react'

export default function FeaturedSliderSkeleton() {
    return (
        <div
            className="relative rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl mb-6 sm:mb-8 border animate-pulse"
            style={{ borderColor: 'var(--border)' }}
        >
            <div className="relative w-full h-[280px] sm:h-[380px] md:h-[420px] lg:h-[35rem]">
                <div className="absolute inset-0 flex">
                    {/* Left Side - Image Skeleton */}
                    <div className="relative w-full lg:w-2/3 h-full bg-gray-700/50">
                        {/* Bottom content skeleton for mobile */}
                        <div className="lg:hidden absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                            <div className="flex items-center justify-between mb-2">
                                <div className="h-6 w-16 bg-gray-600/50 rounded" />
                                <div className="h-5 w-12 bg-gray-600/50 rounded" />
                            </div>
                            <div className="h-4 w-20 bg-gray-600/50 rounded mb-2" />
                            <div className="h-8 w-3/4 bg-gray-600/50 rounded mb-2" />
                            <div className="flex items-center justify-between gap-3">
                                <div className="h-8 w-24 bg-gray-600/50 rounded" />
                                <div className="h-10 w-20 bg-gray-600/50 rounded" />
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Info Panel Skeleton (Desktop only) */}
                    <div
                        className="hidden lg:flex w-1/3 h-full flex-col justify-center p-8 xl:p-12"
                        style={{ background: 'var(--surface)' }}
                    >
                        <div className="h-8 w-32 bg-gray-700/50 rounded mb-4" />
                        <div className="h-10 w-full bg-gray-700/50 rounded mb-4" />
                        <div className="space-y-2 mb-6">
                            <div className="h-4 w-full bg-gray-700/50 rounded" />
                            <div className="h-4 w-5/6 bg-gray-700/50 rounded" />
                            <div className="h-4 w-4/6 bg-gray-700/50 rounded" />
                        </div>
                        <div className="flex gap-2 mb-6">
                            <div className="h-6 w-16 bg-gray-700/50 rounded-full" />
                            <div className="h-6 w-20 bg-gray-700/50 rounded-full" />
                        </div>
                        <div className="h-12 w-40 bg-gray-700/50 rounded mb-4" />
                        <div className="h-14 w-full bg-gray-700/50 rounded" />
                    </div>
                </div>
            </div>
        </div>
    )
}
