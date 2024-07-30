import axios from "axios";
import { BACKEND_URL } from "../../constants/api";
import apiRequest from "../../utils/ApiRequest";

axios.defaults.withCredentials = true;

// export const logout = async () => {
//     const url = `${BACKEND_URL}/user/logout`
//     try {
//         const response = await axios.get(url);
//         return response?.data;
//     } catch (error) {
//         console.log(`error on url: ${url} is : `, error);
//         return "error"
//     }
// }


export const logout = apiRequest(async () =>{
    const url = `${BACKEND_URL}/user/logout`
    const response = await axios.get(url);
    return response;
})
