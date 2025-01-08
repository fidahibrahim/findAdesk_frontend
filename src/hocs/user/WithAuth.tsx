import { RootState } from "@/redux/store/store";
import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

interface WithAuthProps {
  component: React.ComponentType;
}

const WithAuth: React.FC<WithAuthProps> = ({ component: Component }) => {
  const userInfo = useSelector((state: RootState) => state.user.userInfo);
  return userInfo ? <Component /> : <Navigate to="/login" />;
};

export default WithAuth;


