import axios from "axios";
import apiRequest from "../../utils/ApiRequest";

import { toast } from "react-toastify";
import { BACKEND_URL } from "../../constants/api";


axios.defaults.withCredentials = true;

// export const getAllAssignments = async () => {
//     const url = `${BACKEND_URL}/assignment/all/teacher`
//     try {
//         const response = await axios.get(url);
//         return response?.data;
//     } catch (error) {
//         console.log(`error on url: ${url} is : `, error);
//         toast.error(error?.response?.data)
//         return "error"
//     }
// }


export const getAllAssignments = apiRequest(async () => {
    const url = `${BACKEND_URL}/assignment/all/teacher`
    const response = await axios.get(url);
    return response;
});

// const BACKEND_URL = 'http://your-backend-url';

// export const getAllAssignments = apiRequest(async () => {
//   const url = `${BACKEND_URL}/assignment/teacher`;
//   const response = await axios.get(url);
//   return response;
// });

export const getAssignmentById = apiRequest(async (id) => {
    const url = `${BACKEND_URL}/assignment/${id}`;
    const response = await axios.get(url);
    return response;
});

// export const createAssignment = async (data) => {
//     const url = `${BACKEND_URL}/assignment/`
//     try {
//         const response = await axios.post(url, data);
//         toast.success(`Assignment created successfully`);
//         return response?.data;
//     } catch (error) {
//         console.log(`error on url: ${url} is : `, error);
//         toast.error(error?.response?.data)
//         return "error"
//     }
// }


export const createAssignment = apiRequest(async (data) => {
    const url = `${BACKEND_URL}/assignment/`
    const response = await axios.post(url, data);
    return response;
});

// export const deleteAssignments = async (id) => {
//     const url = `${BACKEND_URL}/assignments/${id}`
//     try {
//         const response = await axios.delete(url);
//         return response?.data;
//     } catch (error) {
//         console.log(`error on url: ${url} is : `, error);
//         toast.error(error?.response?.data)
//         return "error"
//     }
// }



export const deleteAssignments = apiRequest(async (id) => {
    const url = `${BACKEND_URL}/assignments/${id}`
    const response = await axios.delete(url);
    return response;
});


// export const editAssignment = async (data, id) => {
//     const url = `${BACKEND_URL}/assignment/${id}`
//     try {
//         const response = await axios.put(url, data);
//         return response?.data;
//     } catch (error) {
//         console.log(`error on url: ${url} is : `, error);
//         toast.error(error?.response?.data)
//         return "error"
//     }
// }


export const editAssignment = apiRequest(async (data, id) => {
    const url = `${BACKEND_URL}/assignments/${id}`
    const response = await axios.put(url, data);
    return response;
});


export const getMultipleAssignmentsForGrading = apiRequest(async (aId) => {
    const url = `${BACKEND_URL}/assignment/submissions/${aId}`
    const response = axios.get(url);
    return response;
})

export const gradeAssignments = apiRequest(async (data, id) => {
    const url = `${BACKEND_URL}/assignment/grade/${id}`
    const response = axios.post(url, data);
    return response;
})
