import axios from 'axios';
import Constants from 'expo-constants';

// Use the computer's LAN IP address for development
const getBaseUrl = () => {
  // Use the hostUri from Expo to determine the server's IP
  const hostUri = Constants.expoConfig?.hostUri;
  if (hostUri) {
    const ip = hostUri.split(':')[0];
    // IMPORTANT: Backend port is 8082 as defined in backend/main.py
    return `http://${ip}:8082`; 
  }
  // Fallback to explicit IP if hostUri is missing
  return 'http://192.168.1.23:8082';
};

const API_BASE_URL = getBaseUrl();
console.log('Connecting to API at:', API_BASE_URL);

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000, 
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getSevas = async () => {
  try {
    const response = await api.get('/sevas');
    return response.data;
  } catch (error) {
    console.warn('BACKEND OFFLINE (Sevas): using simulated data');
    throw error;
  }
};

export const getLineage = async () => {
  try {
    const response = await api.get('/lineage');
    return response.data;
  } catch (error) {
    console.warn('BACKEND OFFLINE (Lineage): using simulated data');
    throw error;
  }
};

export const createBooking = async (bookingData) => {
  try {
    const response = await api.post('/bookings', bookingData);
    return response.data;
  } catch (error) {
    console.warn('BACKEND OFFLINE (Booking): simulating success');
    throw error;
  }
};

export const getUserBookings = async (userId) => {
  try {
    const response = await api.get(`/bookings/${userId}`);
    return response.data;
  } catch (error) {
    console.warn('BACKEND OFFLINE (History): using empty history');
    throw error;
  }
};

export default api;
