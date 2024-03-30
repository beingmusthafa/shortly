import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

const CheckAuth = () => {
  const { currentUser } = useSelector(
    (state: { user: { currentUser: object } }) => state.user
  );
  return currentUser ? <Outlet /> : <Navigate to={"/"} />;
};

export default CheckAuth;
