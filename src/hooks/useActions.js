import { actions as booksActions } from '@/lib/books/books.slice'
import { actions as userActions } from '@/lib/user/user.slice'
import { actions as errorActions } from '@/lib/error/error.slice'
import { bindActionCreators } from '@reduxjs/toolkit'
import { useMemo } from 'react'
import { useDispatch } from 'react-redux'

const rootActions = {
    ...booksActions,
    ...userActions,
    ...errorActions,
}

export const useActions = () => {
    const dispatch = useDispatch()

    return useMemo(() => bindActionCreators(rootActions, dispatch), [dispatch])
}
