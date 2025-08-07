import useFormatInput from '@/hooks/useFormatInput'
import useSafeInput from '@/hooks/useSafeInput'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

export default function AddBook({ editMode }) {
    const {
        reset,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ mode: 'onBlur' })
    const [id, setId] = useState('')
    const formatInput = useFormatInput()
    const safeInput = useSafeInput()

    async function addSubmit(data, e) {
        console.log('add')
        console.log(data)
        reset()
    }

    async function updateSubmit(data, e) {
        console.log('update')
        console.log(data)
        reset()
    }

    async function deleteSubmit(data, e) {
        console.log(data, id)
        setId('')
    }

    const banners = [
        {
            id: 1,
            image: 1,
        },
        {
            id: 2,
            image: 2,
        },
    ]

    return (
        <form
            className="admin__form"
            method="POST"
            onSubmit={handleSubmit(
                editMode === 'add' ? addSubmit :
                editMode === 'update' ? updateSubmit : deleteSubmit
            )}
        >
            <legend className="cabinet__legend">
                {{
                    add: 'Добавление',
                    update: 'Изменение',
                    delete: 'Удаление',
                }[editMode] || 'Действие'}{' '}
                книги{' '}
            </legend>

            {editMode === 'add' || editMode === 'update' ? (
                <>
                    <span
                        className="cabinet__error cabinet__error--white"
                        aria-hidden={!errors.title || !errors.title.type}
                    >
                        {errors.title?.type === 'required' &&
                            'Необходимо заполнить'}
                        {errors.title?.type === 'minLength' &&
                            'Минимальная длина 5 символов'}
                        {errors.title?.type === 'maxLength' &&
                            'Максимальная длина 40 символов'}
                    </span>
                    <input
                        type="text"
                        className="admin__form--input"
                        placeholder="Название*"
                        {...register('title', {
                            minLength: 5,
                            maxLength: 40,
                            required: true,
                        })}
                        onInput={(e) => (e.target.value = safeInput(e))}
                    />

                    <span
                        className="cabinet__error cabinet__error--white"
                        aria-hidden={
                            !errors.description || !errors.description.type
                        }
                    >
                        {errors.description?.type === 'required' &&
                            'Необходимо заполнить'}
                        {errors.description?.type === 'minLength' &&
                            'Минимальная длина 20 символов'}
                        {errors.description?.type === 'maxLength' &&
                            'Максимальная длина 100 символов'}
                    </span>
                    <input
                        type="text"
                        className="admin__form--input"
                        placeholder="Описание*"
                        {...register('description', {
                            minLength: 20,
                            maxLength: 100,
                            required: true,
                        })}
                        onInput={(e) => (e.target.value = safeInput(e))}
                    />

                    <span
                        className="cabinet__error cabinet__error--white"
                        aria-hidden={!errors.date || !errors.date.type}
                    >
                        {errors.date?.type === 'required' &&
                            'Необходимо заполнить'}

                        {errors.date?.type === 'minLength' &&
                            'Минимальная длина 10 символов'}
                    </span>

                    <input
                        type="text"
                        className="admin__form--input"
                        placeholder="Дата выхода*"
                        {...register('date', {
                            minLength: 10,
                            required: true,
                        })}
                        onInput={(e) => formatInput(e, 'date')}
                    />
                    <span
                        className="cabinet__error cabinet__error--white"
                        aria-hidden={!errors.image || !errors.image.type}
                    >
                        {errors.image?.type === 'required' &&
                            'Необходима фотография'}
                    </span>
                    <input
                        type="file"
                        className="admin__form--input"
                        accept=".jpg, .jpeg, .png, .bmp, .tiff"
                        {...register('image', {
                            required: true,
                        })}
                    />
                    <span
                        className="cabinet__error cabinet__error--white"
                        aria-hidden={!errors.link || !errors.link.type}
                    >
                        {errors.link?.type === 'required' &&
                            'Необходимо заполнить'}

                        {errors.link?.type === 'pattern' &&
                            'Неверный формат (https://) или неправильный URL'}
                    </span>

                    <input
                        type="text"
                        className="admin__form--input"
                        placeholder="Ссылка*"
                        {...register('link', {
                            required: true,
                            pattern:
                                /^https:\/\/(?:[a-zA-Zа-яА-ЯёЁ0-9-]+\.)*[a-zA-Zа-яА-ЯёЁ0-9-]+\.[a-zA-Zа-яА-ЯёЁ]{2,}(?:\/[^\s]*)?$/,
                        })}
                    />

                    <span
                        className="cabinet__error cabinet__error--white"
                        aria-hidden={errors.platform?.type}
                    >
                        {!errors.platform &&
                            !errors.platform?.type &&
                            'По умолчанию - ЛитРес'}
                        {errors.platform?.type === 'minLength' &&
                            'Минимальная длина 5 символов'}
                    </span>

                    <input
                        type="text"
                        className="admin__form--input"
                        placeholder="Платформа"
                        {...register('platform', {
                            minLength: 5,
                        })}
                    />
                </>
            ) : (
                <select
                    className="admin__form--select"
                    defaultValue={'DEFAULT'}
                    onChange={(e) => setId(e.target.value)}
                >
                    <option value="DEFAULT" disabled>
                        Выберите
                    </option>
                    {banners &&
                        banners.map((banner) => (
                            <option key={banner.id} value={banner.id}>
                                #{banner.id}
                                {': '}
                                {banner.image}
                            </option>
                        ))}
                </select>
            )}

            <button
                className="admin__button"
                type="submit"
                disabled={editMode === 'delete' && !id}
            >
                {{
                    add: 'Добавить',
                    update: 'Изменить',
                    delete: 'Удалить',
                }[editMode] || 'Действие'}
            </button>
        </form>
    )
}
