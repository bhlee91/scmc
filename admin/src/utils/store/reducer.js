import { combineReducers } from "redux";
import userSlice from "./slice/user";

const rootReducer = combineReducers({
  user: userSlice.reducer
});

export default rootReducer;