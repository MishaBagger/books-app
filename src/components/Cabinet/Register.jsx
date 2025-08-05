import { useForm } from 'react-hook-form'
import useSafeInput from '@/hooks/useSafeInput'
import useFormatInput from '@/hooks/useFormatInput'

export default function Register({ setSwap }) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ mode: 'onBlur' })
    const formatInput = useFormatInput()
    const safeInput = useSafeInput()

    return (
        <form
            className="cabinet__register"
            method="POST"
            onSubmit={handleSubmit((data) => console.log(data))}
        >
            <legend className="cabinet__legend">Регистрация</legend>
            <span
                className="cabinet__error"
                aria-hidden={
                    !errors.registerLogin || !errors.registerLogin.type
                }
            >
                {errors.registerLogin?.type === 'required' &&
                    'Необходимо заполнить'}
                {errors.registerLogin?.type === 'minLength' &&
                    'Минимальная длина 8 символов'}
                {errors.registerLogin?.type === 'maxLength' &&
                    'Максимальная длина 40 символов'}
            </span>
            <input
                type="text"
                className="cabinet__register--input"
                placeholder="Логин*"
                {...register('registerLogin', {
                    minLength: 8,
                    maxLength: 40,
                    required: true,
                })}
                onInput={(e) => (e.target.value = safeInput(e))}
            />

            <span
                className="cabinet__error"
                aria-hidden={
                    !errors.registerPassword || !errors.registerPassword.type
                }
            >
                {errors.registerPassword?.type === 'required' &&
                    'Необходимо заполнить'}
                {errors.registerPassword?.type === 'minLength' &&
                    'Минимальная длина 8 символов'}
                {errors.registerPassword?.type === 'maxLength' &&
                    'Максимальная длина 40 символов'}
            </span>
            <input
                type="password"
                className="cabinet__register--input"
                placeholder="Пароль*"
                {...register('registerPassword', {
                    minLength: 8,
                    maxLength: 40,
                    required: true,
                })}
            />
            <span
                className="cabinet__error"
                aria-hidden={!errors.registerName || !errors.registerName.type}
            >
                {errors.registerName?.type === 'required' &&
                    'Необходимо заполнить'}
                {errors.registerName?.type === 'pattern' &&
                    'Спецсимволы и цифры запрещены'}
                {errors.registerName?.type === 'minLength' &&
                    'Минимальная длина 2 символа'}
                {errors.registerName?.type === 'maxLength' &&
                    'Максимальная длина 40 символов'}
            </span>
            <input
                type="text"
                placeholder="Фамилия, Имя, Отчество*"
                className="cabinet__register--input"
                {...register('registerName', {
                    required: true,
                    minLength: 2,
                    maxLength: 40,
                    pattern: /^[a-zA-Zа-яА-ЯЁё ]+$/,
                })}
                onInput={(e) => (e.target.value = safeInput(e))}
            />
            <span
                className="cabinet__error"
                aria-hidden={!errors.registerEmail}
            >
                {errors.registerEmail?.message}
            </span>
            <input
                type="email"
                placeholder="Электронная почта"
                className="cabinet__register--input"
                {...register('registerEmail', {
                    validate: (input) => {
                        if (input === '') {
                            return undefined
                        } else {
                            return /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/.test(
                                input
                            )
                                ? undefined
                                : 'Неверный формат'
                        }
                    },
                })}
                onInput={(e) => (e.target.value = safeInput(e))}
            />
            <span
                className="cabinet__error"
                aria-hidden={!errors.registerPhone}
            >
                {errors.registerPhone?.type === 'required'
                    ? 'Необходимо заполнить'
                    : errors.registerPhone?.message}
            </span>
            <input
                type="tel"
                placeholder="Номер телефона*"
                className="cabinet__register--input"
                {...register('registerPhone', {
                    required: true,
                    maxLength: 30,
                    validate: (input) =>
                        /^(\+7|8)[\s-]?\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}$/.test(
                            input
                        ) || 'Неверный формат',
                })}
                onInput={(e) => formatInput(e, 'phone')}
            />

            <span
                className="cabinet__error"
                aria-hidden={!errors.registerCheckbox}
            >
                {errors.registerCheckbox?.type === 'required' &&
                    'Необходимо согласие'}
            </span>

            <label className="cabinet__checkbox">
                <input
                    type="checkbox"
                    name="registerCheckbox"
                    className="cabinet__register--input"
                    {...register('registerCheckbox', { required: true })}
                />
                Согласен с обработкой персональных данных
            </label>

            <button className="cabinet__button" type="submit">
                Зарегистрироваться
            </button>

            <p className="cabinet__swap">
                Уже есть аккаунт?{' '}
                <span onClick={(e) => setSwap((prev) => !prev)}>Войти</span>
            </p>
        </form>
    )
}
