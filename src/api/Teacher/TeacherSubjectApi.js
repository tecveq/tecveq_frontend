import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { BACKEND_URL } from "../../constants/api";
import axios from "axios";


export const useGetAllTeacherSubjects = (teacherId) => {


    const getMyAllTeacherSubjectsRequest = async () => {
        const url = `${BACKEND_URL}/subject/teacher-subject/${teacherId}`;
        const response = await axios.get(url);

        // Note: Axios does not use response.ok, so check the status code directly
        if (response.status !== 200) {
            throw new Error('Failed to get user');
        }

        return response.data; // Axios automatically parses the JSON response
    };

    // Updated useQuery call with object form
    const { data: teacherSubjects, isLoading, error } = useQuery({
        queryKey: ['fetchAllTeacherSubject', teacherId],
        queryFn: getMyAllTeacherSubjectsRequest,
        enabled: !!teacherId, // Only run the query if levelId is truthy

    });

    if (error) {
      toast.error(error.toString());
    }

    return {
        isLoading,
        teacherSubjects,
    };
};