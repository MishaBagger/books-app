import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { reducer as bookReducer } from './books/books.slice'
import { reducer as userReducer } from './user/user.slice'
import { reducer as errorReducer } from './error/error.slice'
import { reducer as successReducer } from './success/success.slice'
import { api } from './api/api'
import { errorMiddleware, successMiddleware } from './listeners'

const reducers = combineReducers({
    books: bookReducer,
    user: userReducer,
    error: errorReducer,
    success: successReducer,
    [api.reducerPath]: api.reducer,
})

export const makeStore = () => {
    return configureStore({
        reducer: reducers,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware()
                .concat(api.middleware)
                .concat(errorMiddleware.middleware)
                .concat(successMiddleware.middleware),
        devTools: false,
    })
}
