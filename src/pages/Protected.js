import React from "react";
import { Route, Navigate } from "react-router-dom";

const ProtectedRoute = ({ auth, ...props }) => {
  if (auth) {
    return <Route {...props} />;
  } else {
    return <Navigate to={`${process.env.REACT_APP_PATH}`} replace={true} />;
  }
};

export default ProtectedRoute;
