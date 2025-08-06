import { useForm } from 'react-hook-form'
import useSafeInput from '@/hooks/useSafeInput'
import useFormatInput from '@/hooks/useFormatInput'
import { useRegisterMutation } from '@/lib/api/user.api'
import ReCAPTCHA from 'react-google-recaptcha'
import useCaptcha from '@/hooks/useCaptcha'
import { useState } from 'react'
import { useActions } from '@/hooks/useActions'

export default function Register({ setSwap }) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ mode: 'onBlur' })
    const formatInput = useFormatInput()
    const safeInput = useSafeInput()

    const [handleRegister] = useRegisterMutation()
    const { getUserData } = useActions()

    const [recaptchaToken, setRecaptchaToken] = useState(null)
    const handleCaptcha = useCaptcha(setRecaptchaToken)

    async function onSubmit(data, e) {
        e.preventDefault()
        // if (!recaptchaToken) {
        //     throw new Error('Капча не пройдена!')
        // }

        try {
            const registerData = { ...data, recaptchaToken }

            const response = await handleRegister(registerData).unwrap()

            getUserData(response)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <form
            className="cabinet__register"
            method="POST"
            onSubmit={handleSubmit(onSubmit)}
        >
            <legend className="cabinet__legend">Регистрация</legend>
            <span
                className="cabinet__error"
                aria-hidden={!errors.login || !errors.login.type}
            >
                {errors.login?.type === 'required' && 'Необходимо заполнить'}
                {errors.login?.type === 'minLength' &&
                    'Минимальная длина 8 символов'}
                {errors.login?.type === 'maxLength' &&
                    'Максимальная длина 40 символов'}
            </span>
            <input
                type="text"
                className="cabinet__register--input"
                placeholder="Логин*"
                {...register('login', {
                    minLength: 8,
                    maxLength: 40,
                    required: true,
                })}
                onInput={(e) => (e.target.value = safeInput(e))}
            />

            <span
                className="cabinet__error"
                aria-hidden={!errors.password || !errors.password.type}
            >
                {errors.password?.type === 'required' && 'Необходимо заполнить'}
                {errors.password?.type === 'minLength' &&
                    'Минимальная длина 8 символов'}
                {errors.password?.type === 'maxLength' &&
                    'Максимальная длина 40 символов'}
            </span>
            <input
                type="password"
                className="cabinet__register--input"
                placeholder="Пароль*"
                {...register('password', {
                    minLength: 8,
                    maxLength: 40,
                    required: true,
                })}
            />
            <span
                className="cabinet__error"
                aria-hidden={!errors.username || !errors.username.type}
            >
                {errors.username?.type === 'required' && 'Необходимо заполнить'}
                {errors.username?.type === 'pattern' &&
                    'Спецсимволы и цифры запрещены'}
                {errors.username?.type === 'minLength' &&
                    'Минимальная длина 2 символа'}
                {errors.username?.type === 'maxLength' &&
                    'Максимальная длина 40 символов'}
            </span>
            <input
                type="text"
                placeholder="Фамилия, Имя, Отчество*"
                className="cabinet__register--input"
                {...register('username', {
                    required: true,
                    minLength: 2,
                    maxLength: 40,
                    pattern: /^[a-zA-Zа-яА-ЯЁё ]+$/,
                })}
                onInput={(e) => (e.target.value = safeInput(e))}
            />
            <span className="cabinet__error" aria-hidden={!errors.email}>
                {errors.email?.message}
            </span>
            <input
                type="email"
                placeholder="Электронная почта"
                className="cabinet__register--input"
                {...register('email', {
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
            <span className="cabinet__error" aria-hidden={!errors.phone}>
                {errors.phone?.type === 'required'
                    ? 'Необходимо заполнить'
                    : errors.phone?.message}
            </span>
            <input
                type="tel"
                placeholder="Номер телефона*"
                className="cabinet__register--input"
                {...register('phone', {
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

            <ReCAPTCHA
                sitekey="6Lcl4x8rAAAAALreUu4J3osZrzEYq7DQNl4KjpDN"
                onChange={handleCaptcha}
            />

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
