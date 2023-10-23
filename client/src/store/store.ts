import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./reducers";
import { usersApi } from "@/store/reducers/apis/users.api";

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(usersApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;