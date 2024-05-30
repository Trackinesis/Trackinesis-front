import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../hooks/useUser";

// Adjusted PublicRoute component
const PublicRoute = ({component: Component,...rest}) => {
    const {token} = useUser();
    // Directly render the component without checking for the token
    return <Outlet />;
}
export default PublicRoute;
