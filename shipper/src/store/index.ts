import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import { useDispatch } from 'react-redux';
import rootReducer from './reducer';
import thunk from 'redux-thunk';

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["token", "user"]
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk]
});

export default store;

export type AppDispath = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispath>();