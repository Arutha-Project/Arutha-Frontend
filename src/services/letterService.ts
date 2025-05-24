import axios from "axios";

const MODAL_BASE_URL = import.meta.env.VITE_MODAL_URL;

export const getSinhalaLetterPrediction = async (payload: any) => {
  try {
    const { data } = await axios.post(
      MODAL_BASE_URL + "letter/predict-sinhala/",
      payload
    );
    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getEnglishLetterPrediction = async (payload: any) => {
  try {
    const { data } = await axios.post(
      MODAL_BASE_URL + "letter/predict-english/",
      payload
    );
    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getSinhalaLetterActivityPrediction = async (payload: any) => {
  try {
    const { data } = await axios.post(
      MODAL_BASE_URL + "letter/sinhala-activity/",
      payload
    );
    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getEnglishLetterActivityPrediction = async (payload: any) => {
  try {
    const { data } = await axios.post(
      MODAL_BASE_URL + "letter/english-activity/",
      payload
    );
    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject(error);
  }
};
