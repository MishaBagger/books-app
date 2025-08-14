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
import User from '@/components/Cabinet/User'
const Admin = dynamic(() => import('@/components/Cabinet/Admin'), {
    ssr: false,
    loading: () => <AdminLoader />,
})

export default function Cabinet() {
    const [swap, setSwap] = useState(false)
    const { isAuth, userData, token } = useSelector((state) => state.user)

    const [triggerAccessQuery, { isSuccess, isFetching }] =
        useLazyAccessQuery()

    const [handleRegister] = useRegisterMutation()
    const [handleLogin] = useLoginMutation()
    const [handleLogout] = useLogoutMutation()

    const { getAccessData, logoutUser, getUserData } = useActions()

    const isAdmin = userData?.role === 'admin'

    const isUnauth = !isAuth && Object.keys(userData).length === 0 && !isFetching

    useEffect(() => {
        const storageToken = localStorage.getItem('token')
        if (storageToken) {
            triggerAccessQuery().then((response)=> {
                getAccessData(response.data)
            })
        }
    }, [])

    async function logout() {
        await handleLogout()
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
                    <Admin userData={userData} logout={logout} />
                ) : (
                    <User userData={userData} logout={logout} />
                )}
            </div>
        </section>
    )
}
