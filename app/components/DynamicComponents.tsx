'use client'
import dynamic from 'next/dynamic'

// Dynamic imports for better code splitting - these load after initial render
const ChatWidget = dynamic(() => import('./ChatWidget'), {
    ssr: false,
    loading: () => null
})

const CookieConsent = dynamic(() => import('./CookieConsent'), {
    ssr: false,
    loading: () => null
})

export default function DynamicComponents() {
    return (
        <>
            <ChatWidget />
            <CookieConsent />
        </>
    )
}
