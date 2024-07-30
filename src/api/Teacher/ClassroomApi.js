import axios from "axios"
import apiRequest from "../../utils/ApiRequest";
import { BACKEND_URL } from "../../constants/api";

axios.defaults.withCredentials = true;

// export const getAllClassroom = async () => {
//     const url = `${BACKEND_URL}/classroom/teacher`
//     try {
//         const response = await axios.get(url);
//         return response?.data;
//     } catch (error) {
//         console.log(`error on url: ${url} is : `, error);
//         toast.error(error?.response?.data)
//         return "error"
//     }
// }


export const getAllClassrooms = apiRequest(async () => {
  const url = `${BACKEND_URL}/classroom/teacher`;
  const response = await axios.get(url);
  return response;
});



export const createClassroom = apiRequest(async (data) => {
const url = `${BACKEND_URL}/classroom/`
  const response = await axios.post(url, data);
  return response;
});

// export const createClassroom = async (data) => {
//     const url = `${BACKEND_URL}/classroom/`
//     try {
//         console.log("data being sent is : ", data);
//         const response = await axios.post(url, data);
//         toast.success(`${data.type} created successfully`);
//         return response?.data;
//     } catch (error) {
//         console.log(`error on url: ${url} is : `, error);
//         toast.error(error?.response?.data)
//         return "error"
//     }
// }
