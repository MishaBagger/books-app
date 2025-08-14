import { api } from './api'

export const adminApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getAdminMetrics: builder.query({
            query: () => ({
                url: '/admin/metrics',
            }),
            providesTags: () => [
                {
                    type: 'Metrics',
                },
            ],
        }),
        getAdminBooks: builder.query({
            query: () => '/admin/books',
            providesTags: () => [
                {
                    type: 'Books',
                },
            ],
        })
    }),
})

export const { useGetAdminMetricsQuery, useGetAdminBooksQuery } = adminApi