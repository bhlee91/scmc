import { combineReducers } from "redux";
import userSlice from "../slice/user";
import tokenSlice from "../slice/token";

const rootReducer = combineReducers({
  user: userSlice.reducer,
  token: tokenSlice.reducer
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;