import { useForm } from 'react-hook-form'
import useSafeInput from '@/hooks/useSafeInput'
import ReCAPTCHA from 'react-google-recaptcha'
import useCaptcha from '@/hooks/useCaptcha'
import { useState } from 'react'
import { useLoginMutation } from '@/lib/api/user.api'
import { useActions } from '@/hooks/useActions'

export default function Login({ setSwap }) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ mode: 'onBlur' })
    const safeInput = useSafeInput()

    const [handleLogin] = useLoginMutation()

    const { getUserData } = useActions()

    const [recaptchaToken, setRecaptchaToken] = useState(null)
    const handleCaptcha = useCaptcha(setRecaptchaToken)

    async function onSubmit(data, e) {
        e.preventDefault()
        // if (!recaptchaToken) {
        //     throw new Error('Капча не пройдена!')
        // }

        try {
            const authData = { ...data, recaptchaToken }

            const response = await handleLogin(authData).unwrap()

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
            <legend className="cabinet__legend">Авторизация</legend>
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
                placeholder="Логин"
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
                placeholder="Пароль"
                {...register('password', {
                    minLength: 8,
                    maxLength: 40,
                    required: true,
                })}
            />

            <ReCAPTCHA
                sitekey="6Lcl4x8rAAAAALreUu4J3osZrzEYq7DQNl4KjpDN"
                onChange={handleCaptcha}
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
