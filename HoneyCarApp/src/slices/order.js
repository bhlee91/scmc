import { createSlice } from '@reduxjs/toolkit';

// 초기 생성값
const initialState = {
  orders: [], // order 목록 // Typescripts 는 빈배열을 싫어해.... interface 생성
  deliveries: [], // 수락한 order가 옮겨 가는곳ㄴ
  completes: [],
};

// 슬라이스 생성
const orderSlice = createSlice({
  name: 'order',
  initialState,
  // 리듀서 만들기
  reducers: {
    addOrder(state, action) {
      state.orders.push(action.payload); // any로 뜨는 경우 ----위에 타입을 설정  == palyload 공식문서
    },
    // 주문 수락
    acceptOrder(state, action) {
      const index = state.orders.findIndex(v => v.orderId === action.payload);
      if (index > -1) {
        state.deliveries.push(state.orders[index]);
        state.orders.splice(index, 1); // Orders 목록에서  제거
      }
    },
    //수락 거절
    rejectOrder(state, action) {
      const index = state.orders.findIndex(v => v.orderId === action.payload);
      if (index > -1) {
        state.orders.splice(index, 1); // 목록에서 제거
      }
      const delivery = state.deliveries.findIndex(
        v => v.orderId === action.payload,
      );
      if (delivery > -1) {
        state.deliveries.splice(delivery, 1);
      }
    },

    setCompletes(state, action) {
      state.completes = action.payload;
    },
  },
  extraReducers: builder => {},
});

export default orderSlice;
