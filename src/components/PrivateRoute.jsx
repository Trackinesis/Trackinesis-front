import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../hooks/useUser";

const PrivateRoute = ({component: Component, isAuth, ...rest}) => {
    const {token} = useUser();
    return token ? (
        <>
            <Outlet />
        </>
    ) : (
        <Navigate to="/login" />
    )
}
export default PrivateRoute