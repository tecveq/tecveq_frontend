import axios from "axios";
import { BACKEND_URL } from "../../constants/api";
import apiRequest from "../../utils/ApiRequest";

axios.defaults.withCredentials = true;

export const getAllLevels = apiRequest(async () => await axios.get(`${BACKEND_URL}/level`));

export const createLevel = apiRequest(async (data) => await axios.post(`${BACKEND_URL}/level`, data));

export const editLevel = apiRequest(async (data, id) => await axios.put(`${BACKEND_URL}/level/${id}`, data));

export const deleteLevel = apiRequest(async (id) => await axios.delete(`${BACKEND_URL}/level/${id}`));
