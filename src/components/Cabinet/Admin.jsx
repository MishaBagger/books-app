import { useGetAdminMetricsQuery } from '@/lib/api/admin.api'
import dynamic from 'next/dynamic'
import { useState, useMemo } from 'react'
import Info from './Info'

const FormBook = dynamic(() => import('@/components/Form/FormBook'), {
    ssr: false,
})
export default function Admin({ userData, logout }) {
    const [select, setSelect] = useState()
    const [editMode, setEditMode] = useState('add')

    // Получение метрик
    const { data } = useGetAdminMetricsQuery(undefined, {
        skip: typeof window === 'undefined',
        refetchOnMountOrArgChange: true
    })

    const stats = useMemo(() => {
        if (!data) return null

        // Обрабатываем метрики
        const metrics = data.metrics.reduce((acc, metric) => {
            acc[metric.name] = acc[metric.name] || {}
            acc[metric.name][metric.period] = metric.value
            return acc
        }, {})

        // Обрабатываем редиректы по книгам
        const redirects = data.redirects.map((redirect) => ({
            bookId: redirect.bookId,
            bookTitle: redirect.Book.title,
            redirectCount: redirect.value,
        }))

        return { metrics, redirects }
    }, [data])

    return (
        <section className="admin">
            <h1 className="title">Админ-панель</h1>
            <div className="admin__container">
                <div className="admin__wrapper">
                    <Info userData={userData}/>
                    <h2 className="subtitle subtitle--cabinet text--cabinet">
                        Информация о сайте
                    </h2>
                    <p className="text text--cabinet">
                        Посещений за всё время:{' '}
                        {stats?.metrics?.visits?.all_time || 0}
                    </p>
                    <p className="text text--cabinet">
                        Посещений за месяц:{' '}
                        {stats?.metrics?.visits?.monthly || 0}
                    </p>
                    <p className="text text--cabinet">
                        Переходов в магазин за всё время:{' '}
                        {stats?.metrics?.redirects?.all_time || 0}
                    </p>
                    <p className="text text--cabinet">
                        Переходов в магазин за месяц:{' '}
                        {stats?.metrics?.redirects?.monthly || 0}
                    </p>
                    <p className="text text--cabinet">
                        Зарегистрировано пользователей за всё время:{' '}
                        {stats?.metrics?.registered_users?.all_time || 0}
                    </p>
                    <p className="text text--cabinet">
                        Зарегистрировано пользователей за месяц:{' '}
                        {stats?.metrics?.registered_users?.monthly || 0}
                    </p>

                    <button
                        className="admin__button"
                        type="submit"
                        onClick={logout}
                    >
                        Выйти из аккаунта
                    </button>

                    <h2 className="subtitle subtitle--cabinet text--cabinet">
                        Изменение контента
                    </h2>

                    <div className="admin__selectors">
                        <select
                            className="admin__form--select"
                            onChange={(e) => setSelect(e.target.value)}
                        >
                            <option value="books">Книги</option>
                        </select>
                        <select
                            className="admin__form--select"
                            onChange={(e) => setEditMode(e.target.value)}
                        >
                            <option value="add">Добавить</option>
                            <option value="update">Изменить</option>
                            <option value="delete">Удалить</option>
                        </select>
                    </div>
                </div>
                <div className="admin__wrapper">
                    {(() => {
                        switch (select) {
                            case 'books':
                                return <FormBook editMode={editMode} />
                            default:
                                return <FormBook editMode={editMode} />
                        }
                    })()}
                </div>
            </div>
            <div className="admin__container">
                <div className="admin__wrapper">
                    <h2 className="subtitle subtitle--cabinet text--cabinet">
                        Информация о книгах
                    </h2>
                    {stats?.redirects?.map((item) => (
                        <p key={item.bookId} className="text text--cabinet">
                            Переходов у книги "{item.bookTitle}":{' '}
                            {item.redirectCount}
                        </p>
                    ))}
                </div>
            </div>
        </section>
    )
}
