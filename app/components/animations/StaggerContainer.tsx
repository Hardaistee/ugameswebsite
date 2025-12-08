"use client"

import { motion, Variants } from "framer-motion"
import { useState, useEffect } from "react"

interface StaggerContainerProps {
    children: React.ReactNode
    staggerChildren?: number
    delayChildren?: number
    className?: string
}

export function StaggerContainer({
    children,
    staggerChildren = 0.1,
    delayChildren = 0,
    className = ""
}: StaggerContainerProps) {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    // On server and initial client render, show content without animation
    if (!mounted) {
        return (
            <div className={className}>
                {children}
            </div>
        )
    }

    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
                hidden: { opacity: 0 },
                visible: {
                    opacity: 1,
                    transition: {
                        staggerChildren,
                        delayChildren
                    }
                }
            }}
            className={className}
        >
            {children}
        </motion.div>
    )
}

export const staggerItem: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: [0.21, 0.47, 0.32, 0.98] as const
        }
    }
}
