import React from 'react'
import { useUser } from '../context/UserContext';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedSuperAdmin = () => {
    const { userData } = useUser();
    return userData && (userData.userType == "super_admin") ? <Outlet /> : <Navigate to={"/login"} />
}

export default ProtectedSuperAdmin;
