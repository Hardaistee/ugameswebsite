"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"

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
    direction = "up",
    delay = 0,
    duration = 0.5,
    className = "",
    fullWidth = false,
    once = true
}: FadeInProps) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once })
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    const directionOffset = {
        up: { y: 40, x: 0 },
        down: { y: -40, x: 0 },
        left: { x: 40, y: 0 },
        right: { x: -40, y: 0 },
        none: { x: 0, y: 0 }
    }

    // On server and initial client render, show content without animation
    if (!mounted) {
        return (
            <div ref={ref} className={className} style={{ width: fullWidth ? "100%" : "auto" }}>
                {children}
            </div>
        )
    }

    const initial = {
        opacity: 0,
        ...directionOffset[direction]
    }

    const animate = {
        opacity: 1,
        x: 0,
        y: 0
    }

    return (
        <motion.div
            ref={ref}
            initial={initial}
            animate={isInView ? animate : initial}
            transition={{
                duration,
                delay,
                ease: [0.21, 0.47, 0.32, 0.98]
            }}
            className={className}
            style={{ width: fullWidth ? "100%" : "auto" }}
        >
            {children}
        </motion.div>
    )
}
