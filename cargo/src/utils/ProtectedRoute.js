import React from 'react';
import { Navigate, Outlet } from "react-router-dom";
  
const ProtectedRoute = ({ 
  authenticated, 
  children 
}) => {
  if (authenticated === null || authenticated === undefined || authenticated === "") {
    alert("로그인 후 이용해주세요")
    return <Navigate to="/LogIn" replace={true}></Navigate>
  }
  return children ? children : <Outlet />
}
  
export default ProtectedRoute