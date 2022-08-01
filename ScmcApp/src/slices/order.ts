import {createSlice, PayloadAction} from '@reduxjs/toolkit';
// 주로 인터페이스는 객체 배열 등에서 만들어줌
// 추론 가능한 타입의 경우 interface 안 만들어줘도 됨.
export interface Order {
  image?: string;
  orderId: string;
  driverId?: string;
  completeAt?: string; //완료시간
  start: {
    latitude: number;
    longitude: number;
  };
  end: {
    latitude: number;
    longitude: number;
  };
  price: number;
}
interface InitialState {
  orders: Order[];
  deliveries: Order[];
  completes: Order[];
}

// 초기 생성값
const initialState: InitialState = {
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
    addOrder(state, action: PayloadAction<Order>) {
      state.orders.push(action.payload); // any로 뜨는 경우 ----위에 타입을 설정  == palyload 공식문서
    },
    // 주문 수락
    acceptOrder(state, action: PayloadAction<string>) {
      const index = state.orders.findIndex(v => v.orderId === action.payload);
      if (index > -1) {
        state.deliveries.push(state.orders[index]);
        state.orders.splice(index, 1); // Orders 목록에서  제거
      }
    },
    //수락 거절
    rejectOrder(state, action: PayloadAction<string>) {
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
