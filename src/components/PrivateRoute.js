import React, { useContext } from 'react';
import ContextAPI from '../ContextAPI/ContextAPI';
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    const { user, setUser } = useContext(ContextAPI);
    const logado = localStorage.getItem('token') !== null ? true : false;
    setUser(logado);   
    return user ? children : <Navigate to="/gerenciador_rh" />;
  };

export default PrivateRoute;