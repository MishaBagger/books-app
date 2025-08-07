'use client'

import Login from '@/components/Cabinet/Login'
import Register from '@/components/Cabinet/Register'
import AdminLoader from '@/components/Cabinet/AdminLoader'
const Admin = dynamic(() => import('@/components/Cabinet/Admin'), {
    ssr: false,
    loading: () => <AdminLoader />,
})
import { useActions } from '@/hooks/useActions'
import { useLazyAccessQuery, useLogoutMutation } from '@/lib/api/user.api'
import dynamic from 'next/dynamic'
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
            <div
                className={isAuth ? 'cabinet__container cabinet__container--auth' : 'cabinet__container'}
            >
                {!isAuth ? (
                    swap ? (
                        <Register setSwap={setSwap} />
                    ) : (
                        <Login setSwap={setSwap} />
                    )
                ) : data && userData.role && data.user.role !== 'admin' ? (
                    <Admin logout={logout} />
                ) : (
                    <div>Вы не админ</div>
                )}
            </div>
        </section>
    )
}
