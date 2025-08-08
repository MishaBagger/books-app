import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { reducer as bookReducer } from './books/books.slice'
import { reducer as userReducer } from './user/user.slice'
import { reducer as errorReducer } from './error/error.slice'
import { api } from './api/api'
import { listenerMiddleware } from './listeners/listenerMiddleware'

const reducers = combineReducers({
    books: bookReducer,
    user: userReducer,
    error: errorReducer,
    [api.reducerPath]: api.reducer,
})

export const makeStore = () => {
    return configureStore({
        reducer: reducers,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware()
                .concat(api.middleware)
                .concat(listenerMiddleware.middleware),
        devTools: false,
    })
}
