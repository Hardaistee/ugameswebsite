import React from 'react'
import { redirect } from 'next/navigation'
import { getGameById } from '@/lib/games'
import CheckoutClient from './CheckoutClient'

export const revalidate = 60;

export default async function Checkout({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params

    const product = await getGameById(id)

    if (!product) {
        redirect('/oyunlar')
    }

    return <CheckoutClient product={product} />
}
