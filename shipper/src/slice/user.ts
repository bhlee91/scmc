import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userName: '',
  email: '',
  accessToken: '',
  phoneNumber: '',
  socialInfo: ''
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.userName = action.payload.userName;
      state.email = action.payload.email;
      state.accessToken = action.payload.accessToken;
      state.phoneNumber = action.payload.phoneNumber;
    },
    setAccessToken(state, action) {
      state.accessToken = action.payload.accessToken
    }
  }
})

export default userSlice;