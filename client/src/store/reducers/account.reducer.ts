import IAccount from "@/types/account.interface";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IState {
  _id: string | null;
  nick: string | null;
  email: string | null;
  createdAt: string | null;
}

const initialState: IState = {
  _id: null,
  nick: null,
  email: null,
  createdAt: null,
}

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    login: (state, { payload: { _id, nick, email, createdAt } }: PayloadAction<IAccount>) => {
      state._id = _id;
      state.nick = nick;
      state.email = email;
      state.createdAt = createdAt;
    },

    logout: (state) => {
      state._id = null;
      state.nick = null;
      state.email = null;
      state.createdAt = null;
    }
  }
});

export default accountSlice;