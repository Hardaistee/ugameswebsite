"use client"

import { motion, Variants } from "framer-motion"

interface StaggerContainerProps {
    children: React.ReactNode
    staggerChildren?: number
    delayChildren?: number
    className?: string
}

export function StaggerContainer({
    children,
    staggerChildren = 0.08,
    delayChildren = 0,
    className = ""
}: StaggerContainerProps) {
    return (
        <motion.div
            initial="visible"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={{
                visible: {
                    opacity: 1,
                    transition: {
                        staggerChildren,
                        delayChildren
                    }
                }
            }}
            className={className}
            style={{ opacity: 1 }}
        >
            {children}
        </motion.div>
    )
}

export const staggerItem: Variants = {
    hidden: { opacity: 0.3, y: 10 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.4,
            ease: [0.21, 0.47, 0.32, 0.98] as const
        }
    }
}
