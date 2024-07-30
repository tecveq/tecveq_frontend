import axios from "axios";
import { BACKEND_URL } from "../../constants/api";
import apiRequest from "../../utils/ApiRequest";

export const getAllSubjects = apiRequest(async (id) => {
    const url = `${BACKEND_URL}/user/student-subjects/${id}`;
    const response = await axios.get(url);
    return response;
})
