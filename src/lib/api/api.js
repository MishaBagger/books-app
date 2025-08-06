import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
export const api = createApi({
    reducerPath: 'api',
    tagTypes: ['Book'],
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_API_URL,
        credentials: 'include',
        prepareHeaders: (headers, { getState }) => {
            if (typeof window !== 'undefined') {
                const token =
                    getState().user.token || localStorage.getItem('token')

                if (token) {
                    headers.set('Authorization', `Bearer ${token}`)
                }
            }
            return headers
        },
        
    }),
    endpoints: (builder) => ({
        getApi: builder.query({
            query: () => '/',
        }),
    }),
})

export const { useGetApiQuery } = api
