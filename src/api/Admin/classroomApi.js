import axios from "axios";
import apiRequest from "../../utils/ApiRequest";
import { BACKEND_URL } from "../../constants/api";

axios.defaults.withCredentials = true;

export const getAllClassroom = apiRequest(async () => await axios.get(`${BACKEND_URL}/classroom/`))

export const createClassroom = apiRequest(async (data) => await axios.post(`${BACKEND_URL}/classroom/`, data))

export const deleteClassroom = apiRequest(async (id) => await axios.delete(`${BACKEND_URL}/classroom/${id}`)) 
