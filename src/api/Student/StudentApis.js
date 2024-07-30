import axios from "axios"
import apiRequest from "../../utils/ApiRequest";

import { BACKEND_URL } from "../../constants/api";


axios.defaults.withCredentials = true;

// export const studentLogin = async (data) => {
//     const url = `${BACKEND_URL}/auth/login`
//     try {
//         const response = await axios.post(url, data, {withCredentials:true});
//         return response?.data;
//     } catch (error) {
//         console.log(`error on url: ${url} is : `, error);
//         toast.error(error?.response?.data)
//         return "error"
//     }
// }

export const studentLogin = apiRequest(async (data) => {
    const url = `${BACKEND_URL}/auth/login`
    const response = await axios.post(url, data, {withCredentials: true});
    console.log("response config is : ", response.config);
    console.log("response headers is : ", response.headers);
    return response;
})


// export const getAllUsers = async (data) => {
//     const url = `${BACKEND_URL}/user`
//     try {
//         const response = await axios.get(url, data);
//         return response?.data;
//     } catch (error) {
//         console.log(`error on url: ${url} is : `, error);
//         toast.error(error?.response?.data)
//         return "error"
//     }
// }


export const getAllUsers = apiRequest(async (data) => {
    const url = `${BACKEND_URL}/user`
    const response = await axios.get(url, data);
    return response;
})


// export const registerStudent = async (data) => {
//     const url = `${BACKEND_URL}/user/register`
//     try {
//         const response = await axios.post(url, data);
//         return response?.data;
//     } catch (error) {
//         console.log(`error on url: ${url} is : `, error);
//         toast.error(error?.response?.data)
//         return "error"
//     }
// }

export const registerStudent = apiRequest(async (data) => {
    const url = `${BACKEND_URL}/auth/register`
    const response = await axios.post(url, data);
    return response;
})


// export const updateStudent = async (data) => {
//     const url = `${BACKEND_URL}/user/update`
//     try {
//         const response = await axios.put(url, data);
//         return response?.data;
//     } catch (error) {
//         console.log(`error on url: ${url} is : `, error);
//         toast.error(error?.response?.data)
//         return "error"
//     }
// }

export const updateStudent = apiRequest(async (data) => {
    const url = `${BACKEND_URL}/user/update`
    const response = await axios.put(url, data);
    return response;
})

export const getStudentSubjectReport = apiRequest(async (id, subid) => {
    const url = `${BACKEND_URL}/user/student/assignments-quizes/${subid}`;
    const response = await axios.get(url);
    return response;
})

