import { createSlice } from '@reduxjs/toolkit';
import { PURGE } from 'redux-persist';

const initialState = {
    isLoggedIn: false,
    phoneNumber: ''
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    SET_LOGIN(state, action) {
      state.phoneNumber = action.payload.phoneNumber;
      state.isLoggedIn = action.payload.isLoggedIn;
    },
    SET_LOGOUT(state) {
      state.phoneNumber = '';
      state.isLoggedIn = false;
    },
    SET_CHPWD(state, action) {
      state.phoneNumber = action.payload.phoneNumber;
      state.isLoggedIn = false;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => initialState)
  }
})

export default userSlice;