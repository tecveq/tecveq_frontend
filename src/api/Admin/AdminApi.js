// FOR ADMIN GENERAL DATA

import axios from "axios";
import { BACKEND_URL } from "../../constants/api";
import apiRequest from "../../utils/ApiRequest";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
axios.defaults.withCredentials = true;

export const getAllStudents = apiRequest(async () => await axios.get(`${BACKEND_URL}/user/students`));


export const getAllUsers = apiRequest(async () => {
    const url = `${BACKEND_URL}/user`
    const response = await axios.get(url);
    return response;
})



export const useGetAllStudentsWithLevel = (levelId) => {


    const getMyStudentWithLevelRequest = async () => {
        const url = `${BACKEND_URL}/user/students-with-level/${levelId}`;
        const response = await axios.get(url);

        // Note: Axios does not use response.ok, so check the status code directly
        if (response.status !== 200) {
            throw new Error('Failed to get user');
        }

        return response.data; // Axios automatically parses the JSON response
    };

    // Updated useQuery call with object form
    const { data: studentWithLevel, isLoading, error } = useQuery({
        queryKey: ['fetchStudentsWithLevel', levelId],
        queryFn: getMyStudentWithLevelRequest,
        enabled: !!levelId, // Only run the query if levelId is truthy
    });

    // if (error) {
    //     toast.error(error.toString());
    // }

    return {
        isLoading,
        studentWithLevel,
    };
};


export const getAllTeachers = apiRequest(async () => {
    const url = `${BACKEND_URL}/user/admin/teachers`
    const response = await axios.get(url);
    return response;
})


export const getStudentReport = apiRequest(async (sId) => {
    const url = `${BACKEND_URL}/user/student-reports-admin/${sId}`
    const response = await axios.get(url);
    return response;
})

// export const getStudentReport = async (sId) => {
//     const url = `${BACKEND_URL}/user/student-reports-admin/${sId}`
//     try {
//         const response = await axios.get(url);
//         return response?.data;
//     } catch (error) {
//         console.log(`error on url: ${url} is : `, error);
//         toast.error(error?.response?.data)
//         return "error"
//     }
// }




export const getStudentSubjectReport = apiRequest(async (sId, subid) => {
    const url = `${BACKEND_URL}/user/student-assignments-quizes/${sId}/${subid}`
    const response = await axios.get(url);
    return response;
})


// export const getStudentSubjectReport = async (sId, subid) => {
//     const url = `${BACKEND_URL}/user/student-assignments-quizes/${sId}/${subid}`
//     try {
//         const response = await axios.get(url);
//         return response?.data;
//     } catch (error) {
//         console.log(`error on url: ${url} is : `, error);
//         return "error"
//     }
// }



export const adminLogout = apiRequest(async () => {
    const url = `${BACKEND_URL}/user/logout`
    const response = await axios.get(url);
    return response;
})


// export const adminLogout = async () => {
//     const url = `${BACKEND_URL}/user/logout`
//     try {
//         const response = await axios.get(url);
//         return response?.data;
//     } catch (error) {
//         console.log(`error on url: ${url} is : `, error);
//         toast.error(error?.response?.data);
//         return "error"
//     }
// }
