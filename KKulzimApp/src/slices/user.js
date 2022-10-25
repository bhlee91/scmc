import { createSlice } from '@reduxjs/toolkit';
import { PURGE } from 'redux-persist';

const initialState = {
  truckownerUid: '',
  carNumber: '',
  truckownerName: '',
  isLoggedIn: false,
  accessToken: '',
  refreshToken:'',
  phoneNumber: '',
  latitude: '',
  longitude: '',
  addr: '',
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    SET_LOGIN(state, action) {
      state.truckownerUid = action.payload.truckownerUid;
      state.carNumber = action.payload.carNumber;
      state.truckownerName = action.payload.truckownerName;
      state.phoneNumber = action.payload.phoneNumber;
      state.isLoggedIn = action.payload.isLoggedIn;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    SET_LOGOUT(state) {
      state.truckownerUid = '';
      state.carNumber = ''
      state.phoneNumber = '';
      state.truckownerName = '';
      state.isLoggedIn = false;
      state.accessToken = '';
      state.refreshToken = '';
    },
    SET_CHPWD(state, action) {
      state.phoneNumber = action.payload.phoneNumber;
      state.isLoggedIn = false;
    },
    SET_LOCATION(state, action) {
      state.latitude = action.payload.latitude;
      state.longitude = action.payload.longitude;
      state.addr = action.payload.addr;
    },
    SET_ADDR(state, action) {
      state.addr = action.payload.addr;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => initialState)
  }
})

export default userSlice;