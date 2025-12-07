'use client'
import React, { useState, useRef, useEffect } from 'react'

interface LazyImageProps {
    src: string
    alt: string
    className?: string
    placeholder?: 'blur' | 'skeleton'
}

export default function LazyImage({
    src,
    alt,
    className = '',
    placeholder = 'skeleton'
}: LazyImageProps) {
    const [isLoaded, setIsLoaded] = useState(false)
    const [isInView, setIsInView] = useState(false)
    const imgRef = useRef<HTMLImageElement>(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true)
                    observer.disconnect()
                }
            },
            {
                rootMargin: '100px', // Start loading 100px before entering viewport
                threshold: 0
            }
        )

        if (imgRef.current) {
            observer.observe(imgRef.current)
        }

        return () => observer.disconnect()
    }, [])

    return (
        <div className="relative w-full h-full overflow-hidden">
            {/* Skeleton Placeholder */}
            {!isLoaded && (
                <div
                    className={`absolute inset-0 image-skeleton ${className}`}
                    aria-hidden="true"
                />
            )}

            {/* Actual Image */}
            <img
                ref={imgRef}
                src={isInView ? src : undefined}
                data-src={src}
                alt={alt}
                className={`${className} transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
                onLoad={() => setIsLoaded(true)}
                loading="lazy"
            />
        </div>
    )
}
