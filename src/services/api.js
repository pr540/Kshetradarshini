import axios from 'axios';
import Constants from 'expo-constants';

// Get the computer's IP address automatically for development
const getBaseUrl = () => {
  const hostUri = Constants.expoConfig?.hostUri;
  if (hostUri) {
    const ip = hostUri.split(':')[0];
    return `http://${ip}:8082`;
  }
  return 'http://192.168.1.15:8082'; // Fallback to your IP
};

const API_BASE_URL = getBaseUrl();

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getSevas = async () => {
  try {
    const response = await api.get('/sevas');
    return response.data;
  } catch (error) {
    console.error('Error fetching sevas:', error);
    throw error;
  }
};

export const getLineage = async () => {
  try {
    const response = await api.get('/lineage');
    return response.data;
  } catch (error) {
    console.error('Error fetching lineage:', error);
    throw error;
  }
};

export const createBooking = async (bookingData) => {
  try {
    const response = await api.post('/bookings', bookingData);
    return response.data;
  } catch (error) {
    console.error('Error creating booking:', error);
    throw error;
  }
};

export const getUserBookings = async (userId) => {
  try {
    const response = await api.get(`/bookings/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user bookings:', error);
    throw error;
  }
};

export default api;
