import sorting from '@/utils/sorting'
import { createSlice } from '@reduxjs/toolkit'

export const booksSlice = createSlice({
    name: 'books',
    initialState: {
        allBooks: [],
        filteredBooks: [],
        sortType: '',
    },
    reducers: {
        getBooks: (state, action) => {
            state.allBooks.push(...action.payload)
            state.filteredBooks.push(...action.payload)
        },
        searchBooks: (state, action) => {
            const searchTerm = action.payload.toLowerCase().trim()

            if (!searchTerm) {
                state.filteredBooks = [...state.allBooks]
                sorting(state)
            } else {
                state.filteredBooks = state.allBooks.filter(
                    (book) =>
                        book.name.toLowerCase().includes(searchTerm) ||
                        book.description.toLowerCase().includes(searchTerm)
                )
            }
        },
        sortBooks: (state, action) => {
            state.sortType = action.payload
            sorting(state)
        },
    },
})

export const { actions, reducer } = booksSlice
