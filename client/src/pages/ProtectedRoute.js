import React from "react";
import { Navigate } from "react-router-dom";
import { useAppContext } from "../context/appContext";

/*
 * 一旦用户注销，我们实际上会将其踢回到主页面。此外，如果用户未登录就试图访问仪表板，系统也会执行同样的操作。让他们回到 "/landing"。
 * 具体的操作: If there is an user in the front end(通过context 获取), we will direct user to the stats, 如果没有, will direct them to the "/landing"
 */
function ProtectedRoute({ children }) {
    const { user } = useAppContext();
    if (!user) {
        return <Navigate to="/landing" />;
    }
    // 如果有 user, 则返回内部嵌套的 <SharedLayout /> component
    return children;
}

export default ProtectedRoute;
