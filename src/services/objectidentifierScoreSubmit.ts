import axios from 'axios';

// Define interfaces for API interactions
export interface ObjectIdentifierScoreRequest {
  userId: number;
  category: string;
  score: number;
  totalItems: number;
}

export interface ObjectIdentifierScoreResponse {
  id: number;
  userId: number;
  category: string;
  score: number;
  totalItems: number;
  createdAt: string;
}

const API_URL = 'http://localhost:8080/api';

export const saveObjectIdentifierScore = async (scoreData: ObjectIdentifierScoreRequest): Promise<ObjectIdentifierScoreResponse> => {
  try {
    const response = await axios.post(`${API_URL}/object-identifier-scores`, scoreData);
    return response.data;
  } catch (error) {
    console.error('Error saving object identifier score:', error);
    throw error;
  }
};

// Function to get user scores
// export const getUserScores = async (userId: number): Promise<ObjectIdentifierScoreResponse[]> => {
//   try {
//     const response = await axios.get(`${API_URL}/object-identifier-scores/user/${userId}`);
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching user scores:', error);
//     throw error;
//   }
// };