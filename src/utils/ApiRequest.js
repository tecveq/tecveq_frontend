import { toast } from 'react-toastify';

const apiRequest = (apiCall) => {
  return async (...args) => {
    try {
      const response = await apiCall(...args);
      return response?.data;
    } catch (error) {
      console.error(`Error in API call: `, error);
      toast.error(error?.response?.data || "An unexpected error occurred");
      throw error;
    }
  };
};

export default apiRequest;