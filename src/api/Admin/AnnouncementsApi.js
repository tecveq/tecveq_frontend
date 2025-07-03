// FOR BOTH ANNOUNCEMENTS AND QUOTES

import axios from "axios";
import { BACKEND_URL } from "../../constants/api";
import apiRequest from "../../utils/ApiRequest";
import { toast } from "react-toastify";

axios.defaults.withCredentials = true;

export const getAllAnnouncements = apiRequest(async () => {
    const url = `${BACKEND_URL}/announcement/`
    const response = await axios.get(url);
    return response;
})

export const createAnnouncements = apiRequest(async (data ,sendOnWhatsapp) => {

    if(sendOnWhatsapp){
        console.log(sendOnWhatsapp)
    }
    const url = `${BACKEND_URL}/announcement/`
    const response = await axios.post(url, data);
    toast.success("Announcement added successfully");
    return response;
})

export const deleteAnnouncements = apiRequest(async (id) => {
    const url = `${BACKEND_URL}/announcement/${id}`
    const response = await axios.delete(url);
    toast.success("Announcement deleted successfully");
    return response;
})


export const editAnnouncements = apiRequest(async (data, id) => {
    const url = `${BACKEND_URL}/announcement/${id}`
    const response = await axios.put(url, data);
    toast.success("Announcement updated successfully");

    return response;
})
