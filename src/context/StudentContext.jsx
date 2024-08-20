import React, { createContext, useContext, useEffect, useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { getAllQiuzes } from '../api/Student/Quiz';
import { getAllAnnouncements, getAllClasses } from '../api/ForAllAPIs';
import { getAllAssignments } from '../api/Student/Assignments';

const StudentContext = createContext();

export const useStudent = () => useContext(StudentContext);

export const StudentProvider = ({ children }) => {

    const [allQuizes, setAllQuizes] = useState([]);
    const [allClasses, setAllClasses] = useState([]);
    const [allSubjects, setAllSubjects] = useState([]);
    const [allAssignments, setAllAssignments] = useState([]);
    const [studentLogedIn, setStudentLogedIn] = useState(false);
    const [allAnnouncements, setAllAnnouncements] = useState([]);
    const [meetingStart, setMeetingStart] = useState({start: false, event: null});

    const announcementQuery = useQuery({
        queryKey: ["announcements"], queryFn: async () => {
            const results = await getAllAnnouncements();
            setAllAnnouncements(results.filter((item) => item.visibility == "student" || item.visibility == "all"));
            return results
        }, staleTime: 300000, enabled: studentLogedIn
    });

    const assignmentQuery = useQuery({
        queryKey: ["assignment"], queryFn: async () => {
            const results = await getAllAssignments();
            setAllAssignments(results);
            return results
        }, staleTime: 300000, enabled: studentLogedIn
    });

    const classesQuery = useQuery({
        queryKey: ["classe"], queryFn: async () => {
            const results = await getAllClasses();
            setAllClasses(results);
            return results
        }, staleTime: 300000, enabled: studentLogedIn
    });

    const quizQuery = useQuery({
        queryKey: ["quiz"], queryFn: async () => {
            const results = await getAllQiuzes();
            return results;
        }, staleTime: 300000, enabled: studentLogedIn
    });

    useEffect(() => {
        if (assignmentQuery.isSuccess) {
            setAllAssignments(assignmentQuery.data);
        }
    }, [assignmentQuery.isSuccess, assignmentQuery.data]);

    useEffect(() => {
        if (quizQuery.isSuccess) {
            setAllQuizes(quizQuery.data);
        }
    }, [quizQuery.isSuccess, quizQuery.data]);

    return (
        <StudentContext.Provider value={{

            allSubjects,
            setAllSubjects,

            meetingStart,
            setMeetingStart,

            studentLogedIn,
            setStudentLogedIn,

            allQuizes,
            quizRefetch: quizQuery.refetch,
            quizIsPending: quizQuery.isPending,

            allClasses,
            classesRefetch: classesQuery.refetch,
            classeIsPending: classesQuery.isPending,

            allAssignments,
            assignmentRefetch: assignmentQuery.refetch,
            assignmentIsPending: assignmentQuery.isPending,

            allAnnouncements,
            announcementRefetch: announcementQuery.refetch,
            announcementIsPending: announcementQuery.isPending,

        }}>
            {children}
        </StudentContext.Provider>
    );
};
