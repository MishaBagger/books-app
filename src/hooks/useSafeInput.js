import { useCallback } from 'react'

export default function useSafeInput() {
    const safeInput = useCallback((e) => {
        let value = e.target.value

        let safeValue = value
            .replace(/</g, '') // <
            .replace(/>/g, '') // >
            .replace(/"/g, '') // "
            .replace(/'/g, '') // '
            .replace(/\(/g, '') // (
            .replace(/\)/g, '') // )
            .replace(/[\/\\|]/g, '') // \ | /
            .replace(/%/g, '') // %
            .replace(/\?/g, '') // ?
            .replace(/\^/g, '') // ^
            .replace(/php/g, '') // Удаляет php
            .replace(/src/g, '') // Удаляет src
            .replace(/script/g, '') // Удаляет script
            .replace(/onerror/g, '') // Удаляет onerror

        return safeValue
    }, [])
    return safeInput
}