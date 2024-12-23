import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAllUsers } from '../api/Admin/AdminApi';
import { getAllClasses } from '../api/ForAllAPIs';
import { getAllLevels } from '../api/Admin/LevelsApi';
import { getAllAnnouncements } from '../api/ForAllAPIs';
import { getAllSubjects } from '../api/Admin/SubjectsApi';
import { getAllClassrooms } from '../api/Teacher/ClassroomApi';

const TeacherContext = createContext();

export const useTeacher = () => useContext(TeacherContext);

export const TeacherProvider = ({ children }) => {
  const [teacherLogedIn, setTeacherLogedIn] = useState(false);

  // Fetch teacher data
  const teacherQuery = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const results = await getAllUsers();
      return results;
    },
    staleTime: 300000,
    enabled: teacherLogedIn,
  });

  // Fetch announcements data
  const announcementQuery = useQuery({
    queryKey: ['announcements'],
    queryFn: async () => {
      const results = await getAllAnnouncements();
      return results.filter((item) => item.visibility === 'teacher' || item.visibility === 'all');
    },
    staleTime: 300000,
    enabled: teacherLogedIn,
  });

  // Fetch subjects data
  const subjectQuery = useQuery({
    queryKey: ['subjects'],
    queryFn: async () => {
      const results = await getAllSubjects();
      return results;
    },
    staleTime: 300000,
    enabled: teacherLogedIn,
  });

  // Fetch classrooms data
  const classroomQuery = useQuery({
    queryKey: ['classrooms'],
    queryFn: async () => {
      const results = await getAllClassrooms();
      return results;
    },
    staleTime: 300000,
    enabled: teacherLogedIn,
  });

  // Fetch classes data
  const classQuery = useQuery({
    queryKey: ['classes'],
    queryFn: async () => {
      const results = await getAllClasses();
      return results;
    },
    staleTime: 300000,
    enabled: teacherLogedIn,
  });

  // Fetch levels data
  const levelQuery = useQuery({
    queryKey: ['levels'],
    queryFn: async () => {
      const results = await getAllLevels();
      return results;
    },
    staleTime: 300000,
    enabled: teacherLogedIn,
  });

  // Consolidate teacher data
  const teacherData = useMemo(() => {
    if (teacherQuery.isSuccess && teacherQuery.data) {
      return {
        allStudents: teacherQuery.data.filter((item) => item.userType === 'student' && item.isAccepted),
      };
    }
    return { allStudents: [] };
  }, [teacherQuery.isSuccess, teacherQuery.data]);

  // Refetch data when `teacherLogedIn` becomes true
  useEffect(() => {
    if (teacherLogedIn) {
      teacherQuery.refetch();
      announcementQuery.refetch();
      subjectQuery.refetch();
      classroomQuery.refetch();
      classQuery.refetch();
      levelQuery.refetch();
    }
  }, [teacherLogedIn]);

  // Log errors for debugging
  useEffect(() => {
    if (teacherQuery.isError) console.error('Error fetching users:', teacherQuery.error);
    if (announcementQuery.isError) console.error('Error fetching announcements:', announcementQuery.error);
    if (subjectQuery.isError) console.error('Error fetching subjects:', subjectQuery.error);
    if (classroomQuery.isError) console.error('Error fetching classrooms:', classroomQuery.error);
    if (classQuery.isError) console.error('Error fetching classes:', classQuery.error);
    if (levelQuery.isError) console.error('Error fetching levels:', levelQuery.error);
  }, [
    teacherQuery.isError,
    announcementQuery.isError,
    subjectQuery.isError,
    classroomQuery.isError,
    classQuery.isError,
    levelQuery.isError,
  ]);

  return (
    <TeacherContext.Provider
      value={{
        teacherLogedIn,
        setTeacherLogedIn,

        allLevels: levelQuery.data || [],
        levelsRefetch: levelQuery.refetch,
        levelIsPending: levelQuery.isPending,

        allClasses: classQuery.data || [],
        classesRefetch: classQuery.refetch,
        classesIsPending: classQuery.isPending,

        allSubjects: subjectQuery.data || [],
        subjectsRefetch: subjectQuery.refetch,
        subjectsIsPending: subjectQuery.isPending,

        teacherData,
        teacherDataRefecth: teacherQuery.refetch,
        teacherDataPending: teacherQuery.isPending,

        allClassrooms: classroomQuery.data || [],
        classroomRefetch: classroomQuery.refetch,
        classroomIsPending: classroomQuery.isPending,

        allAnnouncements: announcementQuery.data || [],
        announcementRefetch: announcementQuery.refetch,
        announcementIsPending: announcementQuery.isPending,
      }}
    >
      {children}
    </TeacherContext.Provider>
  );
};
