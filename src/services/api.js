import axios from 'axios';

// Auto-detect the backend IP
const API_BASE_URL = 'http://192.168.1.15:8082'; // Your computer IP
// If you use tunnel mode, change this to your tunnel URL or use a dynamic logic

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
