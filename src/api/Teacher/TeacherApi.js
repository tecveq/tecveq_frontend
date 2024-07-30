import axios from "axios";
import { BACKEND_URL } from "../../constants/api";
import apiRequest from "../../utils/ApiRequest";

axios.defaults.withCredentials = true;


export const updateTeacher = apiRequest(async (data) =>{
    const url = `${BACKEND_URL}/user/update`;
    const response = await axios.put(url, data);
    return response;
})
