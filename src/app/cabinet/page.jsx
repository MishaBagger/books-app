'use client'

import Login from '@/components/Cabinet/Login'
import Register from '@/components/Cabinet/Register'
import AdminLoader from '@/components/Cabinet/AdminLoader'
import { useActions } from '@/hooks/useActions'
import {
    useLazyAccessQuery,
    useLoginMutation,
    useLogoutMutation,
    useRegisterMutation,
} from '@/lib/api/user.api'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import useBooks from '@/hooks/useBooks'
import User from '@/components/Cabinet/User'
const Admin = dynamic(() => import('@/components/Cabinet/Admin'), {
    ssr: false,
    loading: () => <AdminLoader />,
})

export default function Cabinet() {
    const [swap, setSwap] = useState(false)
    const { isAuth, userData, token } = useSelector((state) => state.user)

    const [triggerAccessQuery, { data: accessData, isSuccess, isFetching }] =
        useLazyAccessQuery()

    const [handleRegister] = useRegisterMutation()
    const [handleLogin] = useLoginMutation()
    const [logoutFn] = useLogoutMutation()

    const { getAccessData, logoutUser, getUserData } = useActions()

    useBooks(isAuth)

    const isAdmin = userData?.role === 'admin'

    const isUnauth = !isAuth && Object.keys(userData).length === 0 && !isFetching

    useEffect(() => {
        const storageToken = localStorage.getItem('token')
        if (storageToken) {
            triggerAccessQuery()
        }
    }, [])

    useEffect(() => {
        if (accessData) {
            getAccessData(accessData)
        }
    }, [accessData])

    async function logout() {
        await logoutFn()
        logoutUser()
    }

    return (
        <section className="cabinet">
            <div
                className={
                    isAuth
                        ? 'cabinet__container cabinet__container--auth'
                        : 'cabinet__container'
                }
            >
                {isUnauth ? (
                    swap ? (
                        <Register
                            setSwap={setSwap}
                            handleRegister={handleRegister}
                            getUserData={getUserData}
                        />
                    ) : (
                        <Login
                            setSwap={setSwap}
                            handleLogin={handleLogin}
                            getUserData={getUserData}
                        />
                    )
                ) : isFetching ? (
                    <p className="text">Проверка роли...</p>
                ) : isAdmin ? (
                    <Admin logout={logout} />
                ) : (
                    <User logout={logout} />
                )}
            </div>
        </section>
    )
}
