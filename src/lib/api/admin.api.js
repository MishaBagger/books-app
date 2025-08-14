import { api } from './api'

export const adminApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getMetrics: builder.query({
            query: () => ({
                url: '/admin/metrics',
            }),
            providesTags: () => [
                {
                    type: 'Metrics',
                },
            ],
        }),
    }),
})

export const { useGetMetricsQuery } = adminApi