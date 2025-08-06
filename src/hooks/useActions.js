import { actions as booksActions } from '@/lib/books/books.slice'
import { actions as userActions } from '@/lib/user/user.slice'
import { bindActionCreators } from '@reduxjs/toolkit'
import { useMemo } from 'react'
import { useDispatch } from 'react-redux'

const rootActions = {
    ...booksActions,
    ...userActions
}

export const useActions = () => {
    const dispatch = useDispatch()

    return useMemo(() => bindActionCreators(rootActions, dispatch), [dispatch])
}
