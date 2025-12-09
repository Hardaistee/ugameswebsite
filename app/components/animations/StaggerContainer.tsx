"use client"

interface StaggerContainerProps {
    children: React.ReactNode
    staggerChildren?: number
    delayChildren?: number
    className?: string
}

export function StaggerContainer({
    children,
    className = ""
}: StaggerContainerProps) {
    return (
        <div className={className}>
            {children}
        </div>
    )
}

export const staggerItem = {}
