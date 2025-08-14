import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    userData: {},
    token: '',
    isAuth: false,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        getUserData: (state, action) => {
            state.userData = action.payload?.user
            state.token = action.payload?.accessToken
            state.isAuth = true

            localStorage.setItem('token', action.payload?.accessToken)
        },
        getAccessData: (state, action) => {
            if (!action.payload) {
                return initialState
            }

            state.userData = action.payload?.user
            state.isAuth = true

            if (!state.token) {
                state.token = localStorage.getItem('token')
            }
        },
        logoutUser: (state, action) => {
            localStorage.removeItem('token')
            return initialState
        },
    },
})

export const { actions, reducer } = userSlice
