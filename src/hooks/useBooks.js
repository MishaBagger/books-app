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

    // Хуки RTK Query мемоизируют параметры. Если skip был true при первом рендере, а затем стал false, запрос не запустится автоматически.
    // Если данные уже есть в кэше (например, после предыдущего запроса), RTK Query не делает повторный запрос, даже если skip изменился.

    // useEffect(() => {
    //     if (trigger) {
    //         refetch()
    //     }
    // }, [trigger])

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
