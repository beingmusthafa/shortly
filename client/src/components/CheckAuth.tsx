import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const CheckAuth = () => {
  const { currentUser } = useSelector(
    (state: { user: { currentUser: object } }) => state.user
  );
  return currentUser ? <Outlet /> : <Navigate to={"/"} />;
};

export default CheckAuth;
