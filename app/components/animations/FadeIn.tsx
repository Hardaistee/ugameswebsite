"use client"

interface FadeInProps {
    children: React.ReactNode
    direction?: "up" | "down" | "left" | "right" | "none"
    delay?: number
    duration?: number
    className?: string
    fullWidth?: boolean
    once?: boolean
}

export function FadeIn({
    children,
    className = "",
    fullWidth = false,
}: FadeInProps) {
    return (
        <div
            className={className}
            style={{
                width: fullWidth ? "100%" : "auto",
            }}
        >
            {children}
        </div>
    )
}
