import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userName: '',
  email: '',
  phoneNumber: '',
  social: '',
  isLogin: false
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    SET_LOGIN(state, action) {
      state.userName = action.payload.userName;
      state.email = action.payload.email;
      state.phoneNumber = action.payload.phoneNumber;
      state.social = action.payload.social;
      state.isLogin = action.payload.isLogin;
    },
    SET_LOGOUT(state) {
      state.userName = '';
      state.email = '';
      state.phoneNumber = '';
      state.social = '';
      state.isLogin = false;
    }
  }
})

export default userSlice;