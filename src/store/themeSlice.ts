import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TThemeData = "light" | "dark" | null;

const initialState: TThemeData = null as TThemeData;

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (_state, action: PayloadAction<TThemeData>) => {
      return action.payload;
    },
  },
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
