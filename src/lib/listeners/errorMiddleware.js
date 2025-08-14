import { createListenerMiddleware } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { actions as errorActions } from '../error/error.slice'
import { actions as userActions } from '../user/user.slice'
import { endpoints as userEndpoints } from '../api/user.api'

export const errorMiddleware = createListenerMiddleware()

errorMiddleware.startListening({
    matcher: (action) => {
        return (
            errorActions.addError.match(action) ||
            (action.type?.endsWith('/rejected') &&
                action.payload?.status === 401)
        )
    },
    effect: async (action, listenerApi) => {
        const { dispatch, getState } = listenerApi
        const state = getState()

        const error = action.payload

        if (error.status === 401) {
            try {
                const refresh = await dispatch(userEndpoints.refresh.initiate()).unwrap()

                // Записываем в стейт пользователя свежие данные с рефреша
                dispatch(userActions.getUserData(refresh))
                return
            } catch (error) {
                await dispatch(userEndpoints.logout.initiate())
                dispatch(userActions.logoutUser())
                return
            }
        }

        const { status, message } = action.payload
        const lastError = state.error.lastError

        if (lastError) {
            toast.error(
                <div className="toast">
                    <p className="subtitle subtitle--toast">
                        Ошибка: {lastError.status || status}
                    </p>
                    <p className="text text--toast">
                        {lastError.message || message}
                    </p>
                </div>,
                {
                    toastId: 'apiError',
                }
            )
        }

        console.log('История ошибок:', state.error.history)
    },
})
