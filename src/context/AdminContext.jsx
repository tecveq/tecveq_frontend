import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAllUsers } from '../api/Admin/AdminApi';
import { getAllLevels } from '../api/Admin/LevelsApi';
import { getAllSubjects } from '../api/Admin/SubjectsApi';

const AdminContext = createContext();

export const useAdmin = () => useContext(AdminContext);

export const AdminProvider = ({ children }) => {
  const [allLevels, setAllLevels] = useState([]);
  const [allSubjects, setAllSubjects] = useState([]);
  const [allClassrooms, setAllClassrooms] = useState([]);
  const [adminLogedIn, setAdminLogedIn] = useState(false);

  const [adminUsersData, setAdminUsersdata] = useState({
    allStudents: [],
    allTeachers: [],
    allParents: [],
    allUsers: [],
  });

  // Fetch users data
  const userQuery = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const results = await getAllUsers();
      if (results !== 'error') {
        setAdminUsersdata((prev) => ({
          ...prev,
          allParents: results.filter((item) => item.userType === 'parent' && item.isAccepted === true),
          allStudents: results.filter((item) => item.userType === 'student' && item.isAccepted === true),
          allTeachers: results.filter((item) => item.userType === 'teacher' && item.isAccepted === true),
          allUsers: results,
        }));
      }
      return results;
    },
    staleTime: 300000,
    enabled: adminLogedIn,
  });

  // Fetch subjects data
  const subjectQuery = useQuery({
    queryKey: ['subjects'],
    queryFn: async () => {
      const results = await getAllSubjects();
      setAllSubjects(results);
      return results;
    },
    staleTime: 300000,
    enabled: adminLogedIn,
  });

  // Fetch levels data
  const levelQuery = useQuery({
    queryKey: ['levels'],
    queryFn: async () => {
      const results = await getAllLevels();
      setAllLevels(results);
      return results;
    },
    staleTime: 300000,
    enabled: adminLogedIn,
  });

  // Ensure data is refetched when `adminLogedIn` becomes true
  useEffect(() => {
    if (adminLogedIn) {
      userQuery.refetch();
      subjectQuery.refetch();
      levelQuery.refetch();
    }
  }, [adminLogedIn]);

  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    adminLogedIn,
    setAdminLogedIn,

    allClassrooms,
    setAllClassrooms,

    adminUsersData,
    adminUsersRefecth: userQuery.refetch,
    adminUsersDataPending: userQuery.isPending,

    allLevels,
    levelsRefetch: levelQuery.refetch,
    levelIsPending: levelQuery.isPending,

    allSubjects,
    subjectsRefetch: subjectQuery.refetch,
    subjectsIsPending: subjectQuery.isPending,
  }), [
    adminLogedIn,
    allClassrooms,
    adminUsersData,
    userQuery.refetch,
    userQuery.isPending,
    allLevels,
    levelQuery.refetch,
    levelQuery.isPending,
    allSubjects,
    subjectQuery.refetch,
    subjectQuery.isPending,
  ]);

  return (
    <AdminContext.Provider value={contextValue}>
      {children}
    </AdminContext.Provider>
  );
};
