'use client'

import Login from '@/components/Cabinet/Login'
import Register from '@/components/Cabinet/Register'
import { useActions } from '@/hooks/useActions'
import { useLazyAccessQuery, useLogoutMutation } from '@/lib/api/user.api'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

export default function Cabinet() {
    const [swap, setSwap] = useState(false)
    const { isAuth, userData, token } = useSelector((state) => state.user)

    const [triggerAccessQuery, { data }] = useLazyAccessQuery()

    const [logoutFn] = useLogoutMutation()

    const { getAccessData, logoutUser } = useActions()

    useEffect(() => {
        const storageToken = localStorage.getItem('token')
        if (storageToken) {
            triggerAccessQuery()
        }
    }, [])

    useEffect(() => {
        if (data) getAccessData(data)
    }, [data])

    async function logout() {
        await logoutFn()
        logoutUser()
    }

    return (
        <section className="cabinet">
            <div className="cabinet__container">
                {!isAuth ? (
                    swap ? (
                        <Register setSwap={setSwap} />
                    ) : (
                        <Login setSwap={setSwap} />
                    )
                ) : (
                    <div>
                        Вы авторизованы! {userData.name}
                        <button onClick={logout}>Logout</button>
                    </div>
                )}
            </div>
        </section>
    )
}
