import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { Navbar } from "components/Navbar/Navbar";
import { Router } from "components/Router";
import { ChargeOfCourse } from "components/ChargeOfCourse/ChargeOfCourse";
import { useLocalStorage } from "hooks/useLocalStorage";
import { setTheme, TThemeData } from "store/themeSlice";
import { useAppSelector } from "hooks/useAppSelector";

export function App() {
  const dispatch = useDispatch();
  const [ storTheme, setStorTheme ] = useLocalStorage<TThemeData>("theme");
  const theme = useAppSelector(store => store.theme);
  
useEffect(() => {
  if (storTheme === null) {
    setStorTheme("dark");
    dispatch(setTheme("dark"));
  } else {
    dispatch(setTheme(storTheme));
  }
}, [storTheme]);

  return (
    <div className={`app ${theme}`}>
      <Navbar />
      <Router />
      <ChargeOfCourse />
    </div>
  );
}
