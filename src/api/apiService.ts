import axios from 'axios';
import { API_BASE_URL } from '@env';

// Create an Axios instance with the base URL from the environment variables
const api = axios.create({
  baseURL: API_BASE_URL,
});


export const fetchRides = async () => {
  try {
    console.log("Fetching rides...");
    const response = await api.get('/employees'); 
    console.log("Fetched rides data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching rides:", error);
    throw error; 
  }
};
