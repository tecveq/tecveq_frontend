// FOR ADMIN GENERAL DATA

import axios from "axios";
import { BACKEND_URL } from "../../constants/api";
import apiRequest from "../../utils/ApiRequest";

axios.defaults.withCredentials = true;

export const getAllStudents = apiRequest(async () => await axios.get(`${BACKEND_URL}/user/students`));


export const getAllUsers = apiRequest(async () => {
    const url = `${BACKEND_URL}/user`
    const response = await axios.get(url);
    return response;
})


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
