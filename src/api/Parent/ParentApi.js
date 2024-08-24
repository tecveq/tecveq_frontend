import axios from "axios";
import { BACKEND_URL } from "../../constants/api";
import apiRequest from "../../utils/ApiRequest";

axios.defaults.withCredentials = true;

// under dev
export const getAllAssignmentsOfChild = apiRequest(async () => {
    const url = `${BACKEND_URL}//single`;
    const response = await axios.get(url);
    return response;
})

export const getChildReport = apiRequest(async (sid) => {
    const url = `${BACKEND_URL}/parent/student-report/${sid}`;
    const response = await axios.get(url);
    return response;
})

export const getAllChildren = apiRequest(async (mail) => {
    const url = `${BACKEND_URL}/parent/children/${mail}`;
    const response = await axios.get(url);
    return response;
})
