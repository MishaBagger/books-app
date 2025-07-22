import { useCallback, useEffect, useRef } from 'react'

export default function useDebounce(func, delay) {
    const timeoutRef = useRef()

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current)
            }
        }
    }, [])

    return useCallback((...args) => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current)
            }

            timeoutRef.current = setTimeout(() => {
                func(...args)
            }, delay)
        }, [func, delay])
}
