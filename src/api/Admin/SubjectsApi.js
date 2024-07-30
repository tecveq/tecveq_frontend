import axios from "axios";
import apiRequest from "../../utils/ApiRequest";
import { BACKEND_URL } from "../../constants/api";

axios.defaults.withCredentials = true;

export const getAllSubjects = apiRequest(async () => {
  const url = `${BACKEND_URL}/subject`;
  const response = await axios.get(url);
  return response;
});

export const createSubject = apiRequest(async (data) => {
  const url = `${BACKEND_URL}/subject`;
  const response = await axios.post(url, data);
  return response;
});

export const editSubject = apiRequest(async (data, id) => {
  const url = `${BACKEND_URL}/subject/${id}`;
  const response = await axios.put(url, data);
  return response;
});

export const deleteSubject = apiRequest(async (id) => {
  const url = `${BACKEND_URL}/subject/${id}`;
  const response = await axios.delete(url);
  return response;
});
