import { useGetBooksQuery } from '@/lib/api/books.api'
import { useEffect } from 'react'
import { useActions } from './useActions'

export default function useBooks(trigger = false) {
    const { data, isError, isLoading } = useGetBooksQuery(undefined, {
        skip: !trigger,
    })

    const { getBooks } = useActions()

    useEffect(() => {
        if (data) {
            getBooks(data)
        }
    }, [data, getBooks])

    return { isLoading, isError }
}

// Коллбэк пересоздаётся -> в вызове нужна зависимость от коллбэка, иначе замыкание на undefined

// import { useGetBooksQuery } from '@/lib/api/books.api'
// import { useCallback } from 'react'
// import { useActions } from './useActions'

// export default function useBooks() {
//     const { getBooks } = useActions()
//     const { data, isError, isLoading } = useGetBooksQuery()

//     const getBooksHook = useCallback(() => {if (data) getBooks(data)}, [data])

//     return {
//         getBooksHook,
//         isLoading,
//     }
// }
