import React from 'react'
import { useUser } from '../context/UserContext';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedTeacher = () => {
    const { userData } = useUser();
    return userData && userData.userType == "teacher" ? <Outlet /> : <Navigate to={"/login"} />
}

export default ProtectedTeacher
