import { createSlice } from '@reduxjs/toolkit'
import { PURGE } from "redux-persist"

const initialState = {
  email: '',
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    SET_LOGIN(state, action) {
      state.email = action.payload.email;
    },
    SET_LOGOUT(state) {
      state.email = '';
    }
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => initialState)
  }
})

export default userSlice;