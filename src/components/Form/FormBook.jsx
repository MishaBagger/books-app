import useFormatInput from '@/hooks/useFormatInput'
import useSafeInput from '@/hooks/useSafeInput'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import SelectBook from './SelectBook'
import { useSelector } from 'react-redux'
import {
    useCreateBookMutation,
    useDeleteBookMutation,
    useUpdateBookMutation,
} from '@/lib/api/books.api'

export default function FormBook({ editMode }) {
    const { filteredBooks: books } = useSelector((state) => state.books)

    const [createBook] = useCreateBookMutation()
    const [updateBook] = useUpdateBookMutation()
    const [deleteBook] = useDeleteBookMutation()

    const {
        reset,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ mode: 'onBlur' })
    const [id, setId] = useState('')
    const formatInput = useFormatInput()
    const safeInput = useSafeInput()

    async function addSubmit(data) {
        try {
            await createBook(data)
            reset()
        } catch (error) {
            console.error(error)
        }
    }

    async function updateSubmit(data, e) {
        try {

            if (!id) throw new Error('Не выбрана книга')

            await updateBook(data, id)
            reset()
            setId('')
        } catch (error) {
            console.error(error)
        }
    }

    async function deleteSubmit(_, e) {
        try {

            if (!id) throw new Error('Не выбрана книга')

            await deleteBook(id)
            setId('')
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <form
            className="admin__form"
            method="POST"
            onSubmit={handleSubmit(
                editMode === 'add'
                    ? addSubmit
                    : editMode === 'update'
                    ? updateSubmit
                    : deleteSubmit
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
                    {editMode === 'update' && (
                        <SelectBook setId={setId} books={books} />
                    )}
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
                <SelectBook setId={setId} books={books} />
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
