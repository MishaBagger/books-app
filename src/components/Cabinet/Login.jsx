import { useForm } from 'react-hook-form'
import useSafeInput from '@/hooks/useSafeInput'

export default function Login({ setSwap }) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ mode: 'onBlur' })
    const safeInput = useSafeInput()

    return (
        <form
            className="cabinet__register"
            method="POST"
            onSubmit={handleSubmit((data) => console.log(data))}
        >
            <legend className="cabinet__legend">Авторизация</legend>
            <span
                className="cabinet__error"
                aria-hidden={
                    !errors.authLogin || !errors.authLogin.type
                }
            >
                {errors.authLogin?.type === 'required' &&
                    'Необходимо заполнить'}
                {errors.authLogin?.type === 'minLength' &&
                    'Минимальная длина 8 символов'}
                {errors.authLogin?.type === 'maxLength' &&
                    'Максимальная длина 40 символов'}
            </span>
            <input
                type="text"
                className="cabinet__register--input"
                placeholder="Логин"
                {...register('authLogin', {
                    minLength: 8,
                    maxLength: 40,
                    required: true,
                })}
                onInput={(e) => (e.target.value = safeInput(e))}
            />

            <span
                className="cabinet__error"
                aria-hidden={
                    !errors.authPassword || !errors.authPassword.type
                }
            >
                {errors.authPassword?.type === 'required' &&
                    'Необходимо заполнить'}
                {errors.authPassword?.type === 'minLength' &&
                    'Минимальная длина 8 символов'}
                {errors.authPassword?.type === 'maxLength' &&
                    'Максимальная длина 40 символов'}
            </span>
            <input
                type="password"
                className="cabinet__register--input"
                placeholder="Пароль"
                {...register('authPassword', {
                    minLength: 8,
                    maxLength: 40,
                    required: true,
                })}
            />

            <button className="cabinet__button" type="submit">
                Авторизоваться
            </button>

            <p className="cabinet__swap">
                Ещё нет аккаунта?{' '}
                <span onClick={(e) => setSwap((prev) => !prev)}>Создать</span>
            </p>
        </form>
    )
}
