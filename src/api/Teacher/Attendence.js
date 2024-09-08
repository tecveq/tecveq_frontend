import axios from "axios";
import { BACKEND_URL } from "../../constants/api";
import apiRequest from "../../utils/ApiRequest";

axios.defaults.withCredentials = true;

export const getTodayClasses = apiRequest(async () => {

    let endDate = new Date();
    let startDate = new Date();
    endDate.setDate(endDate.getDate() + 8);

    const url = `${BACKEND_URL}/class/get-today-classes?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`;
    const response = await axios.get(url);
    return response;

});


export const markAttendence = apiRequest(async (data, id) => {

    console.log(" dataand id is : ", data, id);

    const url = `${BACKEND_URL}/class/get-today-classes/${id}`;
    const response = await axios.put(url, {data});
    return response;

});


export const teacherPresent = apiRequest(async (id) =>{
    const url = `${BACKEND_URL}/class/mark/${id}`
    const response  = await axios.get(url);
    return response;
})

