import { createElement } from "react";
import { Navigate } from "react-router-dom";

const PrivateRoutes = ({ children }) => {
  const token = localStorage.getItem("accessToken");

  if (!token) {
    return createElement(Navigate, { to: "/", replace: true });
  }

  return children;
};

export default PrivateRoutes;

