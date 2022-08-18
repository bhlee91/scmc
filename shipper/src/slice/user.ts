import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userName: '',
  email: '',
  phoneNumber: '',
  socialInfo: ''
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    SET_USER(state, action) {
      state.userName = action.payload.userName;
      state.email = action.payload.email;
      state.phoneNumber = action.payload.phoneNumber;
      state.socialInfo = action.payload.socialInfo;
    }
  }
})

export default userSlice;