import { Route, Navigate,useLocation } from "react-router-dom";
import { useLogin } from "./reducer-context/Login-context";

export function Privateroute({ path, ...props }: any) {
  let { isUserLogIn } = useLogin();
  const location = useLocation();
  return isUserLogIn ? (
    <Route {...props} path={path} />
  ) : (
    <Navigate state={{from:location.pathname}} replace to="/login" />
  );
}
