// import { AuthHeaders, BASE_URL, TokenType } from '@constants';
import axios from 'axios';
const BASE_URL = import.meta.env.VITE_API_URL;
import { AuthHeaders } from '../constants';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': AuthHeaders.ApplicationJson,
  },
});

axiosInstance.interceptors.request.use((config) => {
  // const { accessToken } = store.getState().authTokenReducer;
  const accessToken = null;

  if (accessToken) {
    config.headers[AuthHeaders.Authorization] = `${AuthHeaders.Bearer} ${accessToken}`;
  }
  return config;
});

export default axiosInstance;
