import React, { createContext, useContext, useEffect, useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { getAllQiuzes } from '../api/Student/Quiz';
import { getAllAssignments } from '../api/Student/Assignments';
import { getAllAnnouncements, getAllClasses } from '../api/ForAllAPIs';

const ParentContext = createContext();

export const useParent = () => useContext(ParentContext);

export const ParentProvider = ({ children }) => {

    const [allQuizes, setAllQuizes] = useState([]);
    const [allClasses, setAllClasses] = useState([]);
    const [allSubjects, setAllSubjects] = useState([]);
    const [allAssignments, setAllAssignments] = useState([]);
    const [parentLogedIn, setParentLogedIn] = useState(false);
    const [selectedChild, setSelectedChild] = useState(null);
    const [allAnnouncements, setAllAnnouncements] = useState([]);
    const [meetingStart, setMeetingStart] = useState({ start: false, event: null });

    // const announcementQuery = useQuery({
    //     queryKey: ["announcements"], queryFn: async () => {
    //         const results = await getAllAnnouncements();
    //         setAllAnnouncements(results.filter((item) => item.visibility == "student" || item.visibility == "all"));
    //         return results
    //     }, staleTime: 300000, enabled: parentLogedIn
    // });

    // const assignmentQuery = useQuery({
    //     queryKey: ["assignment"], queryFn: async () => {
    //         const results = await getAllAssignments();
    //         setAllAssignments(results);
    //         return results
    //     }, staleTime: 300000, enabled: parentLogedIn
    // });

    // const quizQuery = useQuery({
    //     queryKey: ["quiz"], queryFn: async () => {
    //         const results = await getAllQiuzes();
    //         return results;
    //     }, staleTime: 300000, enabled: parentLogedIn
    // });

    // useEffect(() => {
    //     if (assignmentQuery.isSuccess) {
    //         setAllAssignments(assignmentQuery.data);
    //     }
    // }, [assignmentQuery.isSuccess, assignmentQuery.data]);

    // useEffect(() => {
    //     if (quizQuery.isSuccess) {
    //         setAllQuizes(quizQuery.data);
    //     }
    // }, [quizQuery.isSuccess, quizQuery.data]);

    useEffect(() => {
        let child = localStorage.getItem("selectedChild");
        if (child != null) {
            setSelectedChild(JSON.parse(child));
            setParentLogedIn(true);
        }
    }, [])

    return (
        <ParentContext.Provider value={{
            parentLogedIn,
            setParentLogedIn,
            
            allSubjects, 
            setAllSubjects,

            selectedChild,
            setSelectedChild
        }}>
            {children}
        </ParentContext.Provider>
    );
};
