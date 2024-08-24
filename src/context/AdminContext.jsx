import React, { createContext, useContext, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
// import { connectSocket } from "../socket"
import { getAllUsers } from '../api/Admin/AdminApi';
import { getAllLevels } from '../api/Admin/LevelsApi';
import { getAllSubjects } from '../api/Admin/SubjectsApi';

const AdminContext = createContext();

export const useAdmin = () => useContext(AdminContext);

export const AdminProvider = ({ children }) => {

    // const [isConnected, setIsConnected] = useState(false);
    // const [socketIntance, setSocketInstance] = useState(null);

    const [allLevels, setAllLevels] = useState([]);
    const [allSubjects, setAllSubjects] = useState([]);
    const [allClassrooms, setAllClassrooms] = useState([]);
    const [adminLogedIn, setAdminLogedIn] = useState(false);
    const [adminUsersData, setAdminUsersdata] = useState({
        allStudents: [],
        allTeachers: [],
        allParents: [],
        allUsers: []
    })

    const userQuery = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const results = await getAllUsers();
            if (results !== "error") {
                setAdminUsersdata((prev) => ({
                    ...prev,
                    allParents: results?.filter((item) => item.userType == "parent" && item.isAccepted == true),
                    allStudents: results?.filter((item) => item.userType == "student" && item.isAccepted == true),
                    allTeachers: results?.filter((item) => item.userType == "teacher" && item.isAccepted == true),
                    allUsers: results
                }));
            }
        },
        staleTime: 300000,
        enabled: adminLogedIn,
    });

    const subjectQuery = useQuery({
        queryKey: ["subjects"], queryFn: async () => {
            const results = await getAllSubjects();
            setAllSubjects(results);
            return results
        }, staleTime: 300000, enabled: adminLogedIn
    });


    const levelQuery = useQuery({

        queryKey: ["levels"], queryFn: async () => {
            const results = await getAllLevels();
            setAllLevels(results);
            return results
        }, staleTime: 300000, enabled: adminLogedIn

    });

    useEffect(() => {
        if (subjectQuery.isSuccess) {
            setAllSubjects(subjectQuery.data);
        }
    }, [subjectQuery.isSuccess, subjectQuery.data]);

    useEffect(() => {
        if (userQuery.isSuccess && adminLogedIn) {
            setAdminUsersdata((prev) => ({
                ...prev,
                allStudents: userQuery?.data?.filter((item) => item.userType == "student" && item.isAccepted == true),
                allTeachers: userQuery?.data?.filter((item) => item.userType == "teacher" && item.isAccepted == true),
                allParents: userQuery?.data?.filter((item) => item.userType == "parent" && item.isAccepted == true),
                allUsers: userQuery?.data
            }));
        }
    }, [userQuery.isSuccess, userQuery.data]);

    // useEffect(() => {
    //     if (adminLogedIn) {

    //         let socket = connectSocket();

    //         socket.on("connect", () => {
    //             console.log("socket connection is : ", socket.connected)
    //             setIsConnected(true);
    //             setSocketInstance(socket);
    //         })

    //         socket.on("disconnect", () => {
    //             console.log("socket connection is : ", socket.connected)
    //             setIsConnected(false);
    //             setSocketInstance(null);
    //         })

    //         return () => {
    //             socket.off("connect", () => { console.log("socket disconnected!") })
    //             socket.off("disconnect", () => { console.log("socket disconnected!") });
    //         }
    //     }
    // }, [adminLogedIn])



    //   const contextValue = useMemo(
    //     () => ({
    //       adminUsersData,
    //       allLevels,
    //       adminUsersRefetch: userQuery.refetch,
    //       adminUsersDataPending: userQuery.isLoading,
    //       levelsRefetch: levelQuery.refetch,
    //       levelIsPending: levelQuery.isLoading,
    //     }),
    //     [
    //       adminUsersData,
    //       allLevels,
    //       userQuery.refetch,
    //       userQuery.isLoading,
    //       levelQuery.refetch,
    //       levelQuery.isLoading,
    //     ]
    //   );

    return (
        <AdminContext.Provider value={{

            // isConnected,
            // socketIntance,

            adminLogedIn,
            setAdminLogedIn,

            allClassrooms,
            setAllClassrooms,

            adminUsersData,
            setAdminUsersdata,
            adminUsersRefecth: userQuery.refetch,
            adminUsersDataPending: userQuery.isPending,

            allLevels,
            levelsRefetch: levelQuery.refetch,
            levelIsPending: levelQuery.isPending,

            allSubjects,
            subjectsRefetch: subjectQuery.refetch,
            subjectsIsPending: subjectQuery.isPending
        }}>
            {children}
        </AdminContext.Provider>
    );
};
