import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const ProtectedStudent = () => {
  const { userData } = useUser();
  return userData && userData.userType == "student" ? <Outlet /> : <Navigate to={"/"} />
}

export default ProtectedStudent
