import { useGetMetricsQuery } from '@/lib/api/admin.api'
import dynamic from 'next/dynamic'
import { useState, useMemo } from 'react'

const FormBook = dynamic(() => import('@/components/Form/FormBook'), {
    ssr: false,
})
export default function Admin({ logout }) {
    const [select, setSelect] = useState()
    const [editMode, setEditMode] = useState('add')

    // Получение метрик
    const { data } = useGetMetricsQuery()

    const metricsData = useMemo(() => {
        return data?.reduce((acc, metric) => {
            acc[metric.name] = acc[metric.name] || {}
            acc[metric.name][metric.period] = metric.value
            return acc
        }, {})
    }, [data])

    return (
        <section className="admin">
            <h1 className="title">Админ-панель</h1>
            <div className="admin__container">
                <div className="admin__wrapper">
                    <h2 className="subtitle subtitle--admin text--admin">
                        Информация о сайте
                    </h2>
                    <p className="text text--admin">
                        Посещений за всё время:{' '}
                        {metricsData?.visits?.all_time || 0}
                    </p>
                    <p className="text text--admin">
                        Посещений за месяц: {metricsData?.visits?.monthly || 0}
                    </p>
                    <p className="text text--admin">
                        Переходов в магазин за всё время:{' '}
                        {metricsData?.redirects?.all_time || 0}
                    </p>
                    <p className="text text--admin">
                        Переходов в магазин за месяц:{' '}
                        {metricsData?.redirects?.monthly || 0}
                    </p>
                    <p className="text text--admin">
                        Зарегистрировано пользователей за всё время:{' '}
                        {metricsData?.registered_users?.all_time || 0}
                    </p>
                    <p className="text text--admin">
                        Зарегистрировано пользователей за месяц:{' '}
                        {metricsData?.registered_users?.monthly || 0}
                    </p>

                    <button
                        className="admin__button"
                        type="submit"
                        onClick={logout}
                    >
                        Выйти из аккаунта
                    </button>

                    <h2 className="subtitle subtitle--admin text--admin">
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
        </section>
    )
}
