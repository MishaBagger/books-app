import { createListenerMiddleware } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { actions as errorActions } from '../error/error.slice'

export const listenerMiddleware = createListenerMiddleware()

listenerMiddleware.startListening({
    actionCreator: errorActions.addError,
    effect: async (action, listenerApi) => {
        const { status, message } = action.payload
        const state = listenerApi.getState()
        const lastError = state.error.lastError

        if (lastError) {
            toast.error(
                <div className="toast">
                    <p className="subtitle subtitle--toast">
                        Статус ошибки: {lastError.status}
                    </p>
                    <p className="text text--toast">{lastError.message}</p>
                </div>,
                {
                    toastId: 'apiError',
                }
            )
        }

        console.log('История ошибок:', state.error.history)
    },
})
