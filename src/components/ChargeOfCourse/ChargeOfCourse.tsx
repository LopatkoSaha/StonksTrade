import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { AppDispatch } from "store/store";
import { coinIconsGet } from "api/coinIconsGet";
import useWebSocket from "hooks/useWebSocket";
import { WS_ALL_URL } from "config";
import { setStartCourses, setCurrentCourses } from "store/coursesSlice";

export const ChargeOfCourse = () => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    coinIconsGet(dispatch);
  }, []);

  const [isConnect] = useWebSocket(WS_ALL_URL, (data) => {
    if(data.isFirst) {
      dispatch(setStartCourses(data))
    }else{
      dispatch(setCurrentCourses(data))
    }
  });

  return (
    <div className="connect">{isConnect ? "Connect" : "No connect"}</div>
  )
};
