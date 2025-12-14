'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

export default function ReferralListener() {
    const searchParams = useSearchParams()

    useEffect(() => {
        const refCode = searchParams.get('ref')
        if (refCode) {
            // Basit bir güvenlik kontrolü: Sadece alfanümerik karakterlere izin ver
            const cleanRef = refCode.replace(/[^a-zA-Z0-9]/g, '')
            if (cleanRef) {
                localStorage.setItem('referral_code', cleanRef)
                console.log('Referans kodu kaydedildi:', cleanRef)
            }
        }
    }, [searchParams])

    return null
}
