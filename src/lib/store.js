import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { reducer as bookReducer } from './books/books.slice'

const reducers = combineReducers({
    books: bookReducer
})

export const makeStore = () => {
  return configureStore({
    reducer: reducers,
  })
}