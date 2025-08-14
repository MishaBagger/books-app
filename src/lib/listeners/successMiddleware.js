import { createListenerMiddleware } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { actions } from '../success/success.slice'

export const successMiddleware = createListenerMiddleware()

successMiddleware.startListening({
    actionCreator: actions.addSuccess,
    effect: async (action, listenerApi) => {
        const { title, description } = action.payload
        const state = listenerApi.getState()
        const lastSuccess = state.success.lastSuccess

        if (lastSuccess) {
            toast.success(
                <div className="toast">
                    <p className="subtitle subtitle--toast">
                        {title || lastSuccess.title}
                    </p>
                    <p className="text text--toast">{description || lastSuccess.description}</p>
                    <p className="text text--toast">Debug: {lastSuccess.endpoint}</p>
                </div>,
                {
                    toastId: lastSuccess.endpoint,
                    autoClose: false
                }
            )
        }

        console.log('История успехов:', state.success.history)
    },
})
