import axios from "axios";
import { BACKEND_URL } from "../constants/api";
import apiRequest from "../utils/ApiRequest";

axios.defaults.withCredentials = true;

// export const updateUser = async (data) => {
//     const url = `${BACKEND_URL}/user/update`
//     try {
//         const response = await axios.post(url, data);
//         return response?.data;
//     } catch (error) {
//         console.log(`error on url: ${url} is : `, error);
//         toast.error(error?.response?.data)
//         return "error"
//     }
// }



export const updateUser = apiRequest(async (data) => {
    const url = `${BACKEND_URL}/user/update`
    const response = await axios.post(url, data);
    return response;
})
