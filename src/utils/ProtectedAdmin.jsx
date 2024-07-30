import React from 'react'
import { useUser } from '../context/UserContext';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedAdmin = () => {
    const { userData } = useUser();
    return userData && userData.userType == "admin" ? <Outlet /> : <Navigate to={"/login"} />
}

export default ProtectedAdmin
