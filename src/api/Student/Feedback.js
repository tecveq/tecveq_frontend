import axios from "axios"
import apiRequest from "../../utils/ApiRequest";
import { BACKEND_URL } from "../../constants/api";

axios.defaults.withCredentials = true;

export const submitFeedback = apiRequest(async (data) => {
    const url = `${BACKEND_URL}/feedback`
    const response = await axios.post(url, data);
    return response;
})
