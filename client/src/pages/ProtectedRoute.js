import React from "react";
import { Navigate } from "react-router-dom";
import { useAppContext } from "../context/appContext";

// If there is an user in the front end global states values, we will direct user to the stats, or will direct them to the "/landing"
function ProtectedRoute({ children }) {
    const { user } = useAppContext();
    if (!user) {
        return <Navigate to="/landing" />;
    }

    return children;
}

export default ProtectedRoute;
