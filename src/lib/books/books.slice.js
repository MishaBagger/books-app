import { createSlice } from '@reduxjs/toolkit'

export const booksSlice = createSlice({
    name: 'books',
    initialState: [],
    reducers: {
        getBooks: (state, action) => {
            state.push(...action.payload);
        },
    },
})

export const { actions, reducer } = booksSlice
