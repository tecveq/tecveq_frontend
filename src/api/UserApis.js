import axios from "axios";
import { BACKEND_URL } from "../constants/api";
import apiRequest from "../utils/ApiRequest";

axios.defaults.withCredentials = true;

export const updateUser = apiRequest(async (data) => {
    const url = `${BACKEND_URL}/user/update`
    const response = await axios.post(url, data);
    return response;
})
