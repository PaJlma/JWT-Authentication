import IAccount from "@/types/account.interface";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: IAccount = {
  nick: null,
  email: null,
  createdAt: null,
}

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    login: (state, { payload: { nick, email, createdAt } }: PayloadAction<IAccount>) => {
      state.nick = nick;
      state.email = email;
      state.createdAt = createdAt;
    },

    logout: (state) => {
      state.nick = null;
      state.email = null;
      state.createdAt = null;
    }
  }
});

export default accountSlice;