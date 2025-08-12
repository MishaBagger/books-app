import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { actions as errorActions } from '../error/error.slice'
import { actions as successActions } from '../success/success.slice'

async function enhancedQuery(args, api, extraOptions) {
    const baseQuery = fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_API_URL,
        credentials: 'include',
        prepareHeaders: (headers, { getState }) => {
            if (typeof window !== 'undefined') {
                const token =
                    getState().user.token || localStorage.getItem('token')
                if (token) {
                    headers.set('Authorization', `Bearer ${token?.replace(/[^\x00-\x7F]/g, '')}`)
                }
            }
            return headers
        },
    })

    const result = await baseQuery(args, api, extraOptions)

    const apiData = {
        timestamp: new Date().toISOString(),
        endpoint: api.endpoint,
    }

    if (result.error) {
        const error = result.error

        const errorData = {
            // Нету статуса - сетевая ошибка
            status: error?.status,
            // Ошибка сервера или БД
            message:
                error.data?.message ||
                error.data?.error ||
                error?.message ||
                'Неизвестная ошибка',
            ...apiData,
        }

        api.dispatch(errorActions.addError(errorData))
    } else if ([200, 201].includes(result.meta.response.status)) {
        const successData = {
            title: result.data.title || 'Успешно',
            description: result.data.description || 'Действие выполнено!',
            ...apiData,
        }
        api.dispatch(successActions.addSuccess(successData))
    }

    return result
}

export const api = createApi({
    reducerPath: 'api',
    tagTypes: ['Book'],
    baseQuery: enhancedQuery,
    endpoints: (builder) => ({
        getApi: builder.query({
            query: () => '/',
        }),
    }),
})

export const { useGetApiQuery } = api
