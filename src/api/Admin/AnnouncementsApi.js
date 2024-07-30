// FOR BOTH ANNOUNCEMENTS AND QUOTES

import axios from "axios";
import { BACKEND_URL } from "../../constants/api";
import apiRequest from "../../utils/ApiRequest";

axios.defaults.withCredentials = true;

// export const getAllAnnouncements = async () => {
//     const url = `${BACKEND_URL}/announcement/`
//     try {
//         const response = await axios.get(url);
//         return response?.data;
//     } catch (error) {
//         console.log(`error on url: ${url} is : `, error);
//         toast.error(error?.response?.data)
//         return "error"
//     }
// }

export const getAllAnnouncements = apiRequest(async () => {
    const url = `${BACKEND_URL}/announcement/`
    const response = await axios.get(url);
    return response;
})


// export const createAnnouncements = async (data) => {
//     const url = `${BACKEND_URL}/announcement/`
//     try {
//         const response = await axios.post(url, data);
//         toast.success(`${data.type} created successfully`);
//         return response?.data;
//     } catch (error) {
//         console.log(`error on url: ${url} is : `, error);
//         toast.error(error?.response?.data)
//         return "error"
//     }
// }

export const createAnnouncements = apiRequest(async (data) => {
    const url = `${BACKEND_URL}/announcement/`
    const response = await axios.post(url, data);
    return response;
})

// export const deleteAnnouncements = async (id) => {
//     const url = `${BACKEND_URL}/announcement/${id}`
//     try {
//         const response = await axios.delete(url);
//         return response?.data;
//     } catch (error) {
//         console.log(`error on url: ${url} is : `, error);
//         toast.error(error?.response?.data)
//         return "error"
//     }
// }


export const deleteAnnouncements = apiRequest(async (id) => {
    const url = `${BACKEND_URL}/announcement/${id}`
    const response = await axios.delete(url);
    return response;
})


// export const editAnnouncements = async (data, id) => {
//     const url = `${BACKEND_URL}/announcement/${id}`
//     try {
//         const response = await axios.put(url, data);
//         return response?.data;
//     } catch (error) {
//         console.log(`error on url: ${url} is : `, error);
//         toast.error(error?.response?.data)
//         return "error"
//     }
// }


export const editAnnouncements = apiRequest(async (data, id) => {
    const url = `${BACKEND_URL}/announcement/${id}`
    const response = await axios.put(url, data);
    return response;
})
