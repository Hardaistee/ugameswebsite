"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

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
    const isInView = useInView(ref, { once, amount: 0.1 })

    const directionOffset = {
        up: { y: 20, x: 0 },
        down: { y: -20, x: 0 },
        left: { x: 20, y: 0 },
        right: { x: -20, y: 0 },
        none: { x: 0, y: 0 }
    }

    return (
        <motion.div
            ref={ref}
            initial={false}
            animate={isInView ? {
                opacity: 1,
                x: 0,
                y: 0
            } : {
                opacity: 0.3,
                ...directionOffset[direction]
            }}
            transition={{
                duration,
                delay: isInView ? delay : 0,
                ease: [0.21, 0.47, 0.32, 0.98]
            }}
            className={className}
            style={{
                width: fullWidth ? "100%" : "auto",
                // SSR'da içerik görünür olsun
                opacity: 1
            }}
        >
            {children}
        </motion.div>
    )
}
