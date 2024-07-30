import axios from "axios";
import { BACKEND_URL } from "../../constants/api";
import apiRequest from "../../utils/ApiRequest";

axios.defaults.withCredentials = true;

export const getAllClasses = apiRequest(async () => {

    // set end date to 1 week from start date
    console.log("IN TEACHERS SECTION");
    let endDate = new Date();
    console.log('end data var is : ', endDate.toISOString());
    let startDate = new Date();
    endDate.setDate(endDate.getDate() + 8);


    const url = `${BACKEND_URL}/class?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`;
    // const url = `${BACKEND_URL}/class?startDate=${endDate}&endDate=${new Date()}`;
    // const url = `${BACKEND_URL}/class?startDate=${new Date()}&endDate=${new Date()}`;
    const response = await axios.get(url, {});
    // console.log('respose data is : ', response.data);
    return response;

})

export const createClasses = apiRequest(async (data) => await axios.post(`${BACKEND_URL}/class/`, data));

export const cancelClass = apiRequest(async (id) => await axios.delete(`${BACKEND_URL}/class/${id}`));
