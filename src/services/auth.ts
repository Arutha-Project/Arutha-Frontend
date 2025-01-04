import axios from 'axios';
const BASE_URL = import.meta.env.VITE_API_URL;

export const validateUserAndValidate = async (payload: any) => {
  try {
    const { data } = await axios.post(BASE_URL + '/auth/login', payload);
    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject(error);
  }
};