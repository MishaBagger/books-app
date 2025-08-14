import { api } from './api'

export const booksApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getBooks: builder.query({
            query: () => '/books',
            providesTags: () => [
                {
                    type: 'Books',
                },
            ],
        }),
        createBook: builder.mutation({
            query: (book) => ({
                body: book,
                url: '/admin/book',
                method: 'POST',
            }),
            invalidatesTags: () => [
                {
                    type: 'Books',
                },
                {
                    type: 'Metrics',
                },
            ],
        }),
        updateBook: builder.mutation({
            query: ({ id, formData }) => ({
                body: formData,
                url: `/admin/book/${id}`,
                method: 'PATCH',
            }),
            invalidatesTags: (result, error, { id }) => [
                {
                    type: 'Books',
                    // id
                },
                {
                    type: 'Metrics',
                },
            ],
        }),
        deleteBook: builder.mutation({
            query: (id) => ({
                url: `/admin/book/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, id) => [
                {
                    type: 'Books',
                    // id
                },
                {
                    type: 'Metrics',
                },
            ],
        }),
    }),
})

export const {
    useGetBooksQuery,
    useCreateBookMutation,
    useUpdateBookMutation,
    useDeleteBookMutation,
} = booksApi
