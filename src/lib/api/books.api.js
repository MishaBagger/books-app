import { api } from './api'

export const booksApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getBooks: builder.query({
            query: () => '/books',
            providesTags: () => [{
                type: 'Book'
            }]
        }),
        createBook: builder.mutation({
            query: (book) => ({
                body: book,
                url: '/admin/book',
                method: 'POST',
            }),
            invalidatesTags: () => [{
                type: 'Book'
            }]
        }),
    }),
})

export const { useGetBooksQuery, useCreateBookMutation } = booksApi
