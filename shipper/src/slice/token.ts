import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  accessToken: '',
  refreshToken: '',
  expireTime: 0,
  social: ''
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
    },
    SET_DELETE_TOKEN(state) {
      state.accessToken = '';
      state.refreshToken = '';
      state.expireTime = 0;
      state.social = '';
    }
  }
})

export default tokenSlice;