import React from 'react'
import { useUser } from '../context/UserContext';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedParent = () => {
    const { userData } = useUser();
    return userData && userData.userType == "parent" ? <Outlet /> : <Navigate to={"/login"} />
}

export default ProtectedParent
