import React, { createContext, useContext, useEffect, useState } from 'react';

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

    const [allLevels, setAllLevels] = useState([]);
    const [allClasses, setAllClasses] = useState([]);
    const [allSubjects, setAllSubjects] = useState([]);
    const [allClassrooms, setAllClassrooms] = useState([]);
    const [teacherLogedIn, setTeacherLogedIn] = useState(false);
    const [allAnnouncements, setAllAnnouncements] = useState([]);
    const [teacherData, setTeacherData] = useState({
        allStudents: []
    })

    const teacherQuery = useQuery({

        queryKey: ["users"], queryFn: async () => {

            const results = await getAllUsers();

            setTeacherData((prev) => ({
                ...prev,
                allStudents: results.filter((item) => item.userType == "student" && item.isAccepted == true ),
            }));

            return results;

        }, staleTime: 300000, enabled: teacherLogedIn
    });

    const announcementQuery = useQuery({
        queryKey: ["announcements"], queryFn: async () => {
            const results = await getAllAnnouncements();
            setAllAnnouncements(results.filter((item) => item.visibility == "teacher" || item.visibility == "all"));
            return results
        }, staleTime: 300000, enabled: teacherLogedIn
    });

    const subjectQuery = useQuery({
        queryKey: ["subjects"], queryFn: async () => {
            const results = await getAllSubjects();
            if(results !==  "error"){
                setAllSubjects(results);
            }
            return results
        }, staleTime: 300000, enabled: teacherLogedIn
    });

    const classroomQuery = useQuery({
        queryKey: ["classrooms"], queryFn: async () => {
            const results = await getAllClassrooms();
            setAllClassrooms(results);
            return results
        }, staleTime: 300000, enabled: teacherLogedIn
    });

    const classQuery = useQuery({
        queryKey: ["classes"], queryFn: async () => {
            const results = await getAllClasses();
            if(results !== "error"){
                setAllClasses(results);
            }
            return results
        }, staleTime: 300000, enabled: teacherLogedIn
    });

    const levelQuery = useQuery({
        queryKey: ["levels"], queryFn: async () => {
            const results = await getAllLevels();
            setAllLevels(results);
            return results
        }, staleTime: 300000, enabled: teacherLogedIn
    });


    useEffect(() => {
        if (subjectQuery.isSuccess) {
            setAllSubjects(subjectQuery.data);
        }
    }, [subjectQuery.isSuccess, subjectQuery.data]);



    // useEffect(() => {
    //     if (teacherQuery.isSuccess) {
    //         console.log("teacher query for studenst data is : ", teacherQuery.data);
            
    //         setTeacherData((prev) => ({
    //             ...prev,
    //             allStudents: teacherData?.data.filter((item) => item.userType == "student" && item.isAccepted == true ),
    //         }));
    //     }
    // }, [teacherQuery.isSuccess, teacherQuery.data]);

    return (
        <TeacherContext.Provider value={{

            teacherLogedIn,
            setTeacherLogedIn,
            
            allLevels,
            levelsRefetch: levelQuery.refetch,
            levelIsPending: levelQuery.isPending,
            
            allClasses,
            classesRefetch: classQuery.refetch,
            classesIsPending: classQuery.isPending,
            
            allSubjects,
            subjectsRefetch: subjectQuery.refetch,
            subjectsIsPending: subjectQuery.isPending,
            
            teacherData,
            teacherDataRefecth: teacherQuery.refetch,
            teacherDataPending: teacherQuery.isPending,

            allClassrooms,
            classroomRefetch: classroomQuery.refetch,
            classroomIsPending: classroomQuery.isPending,

            allAnnouncements,
            announcementRefetch: announcementQuery.refetch,
            announcementIsPending: announcementQuery.isPending,

        }}>
            {children}
        </TeacherContext.Provider>
    );
};
