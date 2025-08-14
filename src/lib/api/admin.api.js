import { api } from './api'

export const adminApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getMetrics: builder.query({
            query: () => ({
                url: '/admin/metrics',
            }),
        }),
    }),
})

export const { useGetMetricsQuery } = adminApi