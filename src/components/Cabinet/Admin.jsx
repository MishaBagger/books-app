import dynamic from 'next/dynamic'
import { useState } from 'react'

const FormBook = dynamic(() => import('@/components/Form/FormBook'), {
    ssr: false,
})
export default function Admin({ logout }) {
    const [select, setSelect] = useState()
    const [editMode, setEditMode] = useState('add')
    return (
        <section className="admin">
            <h1 className="title">Админ-панель</h1>
            <div className="admin__container">
                <div className="admin__wrapper">
                    <p className="subtitle subtitle--admin text--admin">
                        Информация о сайте
                    </p>
                    <p className="text text--admin">Посещений за всё время:</p>
                    <p className="text text--admin">Посещений за месяц:</p>
                    <p className="text text--admin">Переходов в магазин:</p>
                    <p className="text text--admin">
                        Зарегистрировано пользователей:
                    </p>

                    <button
                        className="admin__button"
                        type="submit"
                        onClick={logout}
                    >
                        Выйти из аккаунта
                    </button>

                    <p className="subtitle subtitle--admin text--admin">
                        Изменение контента:
                    </p>
                    
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
