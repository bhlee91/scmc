import { createSlice } from '@reduxjs/toolkit';
// store => reducer(root, state) => user slice
//state.user.email
//state.ui.
// action => state를 바꾸는 행위/동작
// dispatch => 그 액션을 실제로 실행하는 함수
// reducer => 액션이실제로 실행되면 state를 바꾸는 로직
const initialState = {
  name: '',
  email: '',
  accessToken: '',
  refreshToken: '',
  money: 0,
};
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    //동기 액션
    setUser(state, action) {
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.accessToken = action.payload.accessToken;
    },
    setAccessToken(state, action) {
      state.accessToken = action.payload;
    },
    setMoney(state, action) {
      state.money = action.payload;
    },
  },
  extraReducers: builder => {}, // 비동기 엑션
});

export default userSlice;
