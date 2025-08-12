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
