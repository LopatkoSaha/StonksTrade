import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TUserState = {
  id: string;
  name: string;
  email: string;
  password: string;
  created_at: string;
  walletId: string;
  telegram_id: string;
  permission: {
    users: number | null;
    wallets: number | null;
    games: number | null;
  }
} | null;

const userSlice = createSlice({
  name: "user",
  initialState: null as TUserState,
  reducers: {
    setUser: (_, action: PayloadAction<TUserState >) => {
      return action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
