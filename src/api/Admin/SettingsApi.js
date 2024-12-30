import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { BACKEND_URL } from "../../constants/api";
import axios from "axios";

// Custom hook to add head settings
export const useAddHeadSettings = () => {

    // POST API request
    const addHeadSettingsRequest = async ({ enableHeadAttendance }) => {
        const url = `${BACKEND_URL}/settings/add-head-attendence-setting`;

        const response = await axios.post(url, {
            enableHeadAttendance, // Send data in the request body
        });

        if (response.status !== 201) {
            throw new Error('Failed to add head settings');
        }

        return response.data; // Return the response data
    };

    // Mutation for POST request
    const { mutate, isLoading, isError, isSuccess } = useMutation({
        mutationFn: addHeadSettingsRequest,
        onSuccess: () => {
            toast.success("Head settings added successfully!");
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to add head settings");
        },
    });

    // Return mutation function and states
    return {
        addHeadSettings: mutate, // Mutation function
        isLoading,
        isError,
        isSuccess,
    };
};

export const useUpdateHeadSettings = () => {

    // POST API request
    const updateHeadSettingsRequest = async ({ enableHeadAttendance, settingId }) => {
        const url = `${BACKEND_URL}/settings/update-head-attendence-setting`;

        const response = await axios.put(url, {
            settingId,
            enableHeadAttendance // Send data in the request body
        });

        if (response.status !== 200) {
            throw new Error('Failed to add head settings');
        }

        return response.data; // Return the response data
    };

    // Mutation for POST request
    const { mutate, isLoading, isError, isSuccess } = useMutation({
        mutationFn: updateHeadSettingsRequest,
        onSuccess: () => {
            toast.success("Head settings Updated successfully!");
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to add head settings");
        },
    });

    // Return mutation function and states
    return {
        updateHeadSettings: mutate, // Mutation function
        isLoading,
        isError,
        isSuccess,
    };
};



export const useGetHeadSettings = () => {

    // GET API request
    const getHeadSettingsRequest = async () => {
        const url = `${BACKEND_URL}/settings/get-head-attendence-setting`; // Endpoint

        const response = await axios.get(url);

        if (response.status !== 200) {
            throw new Error('Failed to fetch head settings');
        }

        return response.data; // Return data
    };

    // Query for GET request
    const { data, isLoading, isError, isSuccess } = useQuery({
        queryKey: ['headSettings'], // Cache key
        queryFn: getHeadSettingsRequest, // API request function
        retry: false,
        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to fetch head settings");
        },
    });

    // Return query function and states
    return {
        headSettings: data, // API response data
        isLoading,
        isError,
        isSuccess,
    };
};
