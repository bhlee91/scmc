import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import rootReducer from 'src/store/reducer';

const store = configureStore({
  reducer: rootReducer,
  //Flipper 추가를 위해
  middleware: getDefaultMiddleware => {
    if (__DEV__) {
      const createDebugger = require('redux-flipper').default;
      return getDefaultMiddleware().concat(createDebugger());
    }
    return getDefaultMiddleware();
  },
});
export default store;

export const useAppDispatch = () => useDispatch();
