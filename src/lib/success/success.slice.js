import { createSlice } from '@reduxjs/toolkit'

const successSlice = createSlice({
  name: 'success',
  initialState: {
    lastSuccess: null,
    history: []
  },
  reducers: {
    addSuccess: (state, action) => {
      state.lastSuccess = action.payload
      state.history.push(action.payload)
    },
    clearLastSuccess: (state) => {
      state.lastSuccess = null
    }
  }
})

export const { actions, reducer } = successSlice