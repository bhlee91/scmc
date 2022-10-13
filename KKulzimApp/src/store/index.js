import { configureStore } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistReducer } from 'redux-persist';
import rootReducer from "./reducer";
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { useDispatch } from "react-redux";


const persistConfig = {
    key: "root",
    storage: AsyncStorage,
    whitelist:["user"]    
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware:[thunk, logger]
});

export default store;

export const useAppDispatch = () => useDispatch();