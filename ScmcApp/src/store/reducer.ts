// Slice들 모여서 Reducer로

import {combineReducers} from 'redux';
import orderSlice from '../slices/order';
import userSlice from '../slices/user';
//전체 상태 관리
const rootReducer = combineReducers({
  user: userSlice.reducer,
  order: orderSlice.reducer,
});

//TypeScripts를 위해 => Type Error 방지
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
