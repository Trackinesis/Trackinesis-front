import React from 'react';
import { Navigate, Outlet, Route } from "react-router-dom";
import { useUser } from "../hooks/useUser";

const PublicRoute = ({component: Component, ...rest}) => {
    const {token} = useUser();
    return !token ? <Component {...rest}/> : <Navigate to="/" />
}
export default PublicRoute