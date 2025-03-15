import axios from "axios";

const MODAL_BASE_URL = import.meta.env.VITE_MODAL_URL;

export const getQuickDrawPrediction = async (payload: any) => {
  try {
    const { data } = await axios.post(MODAL_BASE_URL + 'quickdraw/predict/', payload);
    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject(error);
  }
};