import axios from "axios";
import apiRequest from "../../utils/ApiRequest";
import { BACKEND_URL } from "../../constants/api";

axios.defaults.withCredentials = true;

export const cancelClass = apiRequest(async (id) => await axios.delete(`${BACKEND_URL}/class/${id}`));
