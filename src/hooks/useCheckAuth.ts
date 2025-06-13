import { useNavigate } from "react-router-dom";
import { useAppSelector } from "store/hooks";
import { pages } from "components/Router";


export const useCheckAuth = () => {
    const navigate = useNavigate();
    const user = useAppSelector((state) => state.user);
    if(!user) {
      navigate("/");
    }
};

export const useIsAuth = () => {
  const user = useAppSelector((state) => state.user);
  return [!!user];
};
