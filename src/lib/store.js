import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { reducer as bookReducer } from './books/books.slice'
import { reducer as userReducer } from './user/user.slice'
import { api } from './api/api'

const reducers = combineReducers({
    books: bookReducer,
    user: userReducer,
    [api.reducerPath]: api.reducer,
})

export const makeStore = () => {
    return configureStore({
        reducer: reducers,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(api.middleware),
        devTools: false,
    })
}
