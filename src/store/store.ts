import { configureStore } from "@reduxjs/toolkit";
import theme from "./themeSlice";
import courses from "./coursesSlice";
import coinIcons from "./coinIconsSlice";
import user from "./userSlice";
import wallet from "./walletSlice";
import message from "./messageSlice";
import preorders from "./preorderSlice";

export const store = configureStore({
  reducer: {
    theme: theme,
    courses: courses,
    coinIcons: coinIcons,
    user: user,
    wallet: wallet,
    preorders: preorders,
    message: message,
  },
});

// Типы RootState и AppDispatch для использования в хуках
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;