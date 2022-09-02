// Slice들 모여서 Reducer로
import { combineReducers } from 'redux';
import orderSlice from 'src/slices/order';
import userSlice from 'src/slices/user';

//전체 상태 관리
const rootReducer = combineReducers({
  user: userSlice.reducer,
  order: orderSlice.reducer,
});

export default rootReducer;
