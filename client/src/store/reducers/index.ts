import accountSlice from "@/store/reducers/account.reducer";
import { usersApi } from "@/store/reducers/apis/users.api";
import { combineReducers } from "@reduxjs/toolkit";

export const rootReducer = combineReducers({
  account: accountSlice.reducer,
  [usersApi.reducerPath]: usersApi.reducer,
});