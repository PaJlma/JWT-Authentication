import accountSlice from "@/store/reducers/account.reducer";
import { combineReducers } from "@reduxjs/toolkit";

export const rootReducer = combineReducers({
  account: accountSlice.reducer,
});