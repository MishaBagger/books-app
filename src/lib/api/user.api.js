import { api } from './api'

export const userApi = api.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (data) => ({
                body: data,
                url: '/auth/register',
                method: 'POST',
            }),
        }),
        login: builder.mutation({
            query: (data) => ({
                body: data,
                url: '/auth/login',
                method: 'POST',
            }),
        }),
        access: builder.query({
            query: () => ({
                url: '/auth/access',
            }),
        }),
        refresh: builder.query({
            query: () => ({
                url: '/auth/refresh'
            })
        }),
        logout: builder.mutation({
            query: () => ({
                url: '/auth/logout',
                method: 'POST',
            })
        })
    }),
})

export const { useLoginMutation, useRegisterMutation, useLazyAccessQuery, useLogoutMutation, endpoints } = userApi
