import React, { createContext, useContext, useState, useCallback } from "react";

// Create Context
const TeacherContext = createContext();

// Custom Hook for accessing the context
export const useTeacher = () => useContext(TeacherContext);

// Provider Component
export const TeacherProvider = ({ children }) => {
    const [teacherID, setTeacherID] = useState(null);

    // Memoized function to update teacherID
    const updateTeacherID = useCallback((id) => {
        setTeacherID(id);
    }, []);

    return (
        <TeacherContext.Provider value={{ teacherID, updateTeacherID }}>
            {children}
        </TeacherContext.Provider>
    );
};
