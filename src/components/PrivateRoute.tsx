import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";


const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { user } = useSelector((state: RootState) => state.auth);
  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
