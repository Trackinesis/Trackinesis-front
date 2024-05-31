import React from 'react';
import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../hooks/useUser";

const PrivateRoute = () => {
    const { token } = useUser();
    return token ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
