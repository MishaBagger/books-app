import { useCallback } from 'react'

export default function useCaptcha (setToken) {
    const captcha = useCallback((token) => {
        if (token) {
            setToken(token)
        }
        else {
            setToken(null)
        }

    }, [])
    return captcha
}