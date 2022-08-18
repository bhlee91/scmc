import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  accessToken: '',
  refreshToken: '',
  expireTime: ''
}

const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    SET_TOKEN(state, action) {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.expireTime = action.payload.expireTime;
    }
  }
})

export default tokenSlice;