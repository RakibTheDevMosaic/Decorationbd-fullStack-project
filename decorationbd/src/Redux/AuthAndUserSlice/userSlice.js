import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  email: "",
  name: "",
}

export const userSlice = createSlice({
  name: 'user_info',
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.email = action.payload.email
      state.username = action.payload.username
    },
    unsetUserInfo: (state, action) => {
      state.email = action.payload.email
      state.username = action.payload.username
    },
  }
})

export const { setUserInfo, unsetUserInfo } = userSlice.actions

export default userSlice.reducer