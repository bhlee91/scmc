import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  accessToken: '',
  refreshToken: ''
}

const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    SET_TOKEN(state, action) {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    SET_DELETE_TOKEN(state) {
      state.accessToken = '';
      state.refreshToken = '';
    }
  }
})

export default tokenSlice;