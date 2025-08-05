'use client'

import Login from '@/components/Cabinet/Login'
import Register from '@/components/Cabinet/Register'
import { useState } from 'react'

export default function Cabinet() {
    const [swap, setSwap] = useState(false)
    return (
        <section className="cabinet">
            <div className="cabinet__container">
                {swap ? (
                    <Register setSwap={setSwap} />
                ) : (
                    <Login setSwap={setSwap} />
                )}
            </div>
        </section>
    )
}
