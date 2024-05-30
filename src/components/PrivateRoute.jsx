import React from 'react';
import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../hooks/useUser";

const PrivateRoute = ({component: Component,...rest }) => {
    const {token} = useUser();
    // Check if the user is authenticated
    return token ? (
            <Outlet />
    ) : (
        <Navigate to="/" />
    )
}
export default PrivateRoute;
