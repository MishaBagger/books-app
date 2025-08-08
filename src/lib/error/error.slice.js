import { createSlice } from '@reduxjs/toolkit'

const errorSlice = createSlice({
  name: 'error',
  initialState: {
    lastError: null,
    history: []
  },
  reducers: {
    addError: (state, action) => {
      state.lastError = action.payload
      state.history.push(action.payload)
    },
    clearLastError: (state) => {
      state.lastError = null
    }
  }
})

export const { actions, reducer } = errorSlice