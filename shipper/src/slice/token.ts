import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  accessToken: '',
  refreshToken: '',
  expireTime: '',
  social: '',
  loginTime: ''
}

const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    SET_TOKEN(state, action) {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.expireTime = action.payload.expireTime;
      state.social = action.payload.social;
      state.loginTime = action.payload.loginTime;
    },
    SET_DELETE_TOKEN(state) {
      state.accessToken = '';
      state.refreshToken = '';
      state.expireTime = '';
      state.social = '';
      state.loginTime = '';
    }
  }
})

export default tokenSlice;