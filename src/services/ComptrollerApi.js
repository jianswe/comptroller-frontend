// src/services/ComptrollerApi.js
import axios from 'axios';

const API_URL = 'http://localhost:5086/api/taxreports'; // Replace with your actual API URL

export const getComptrollerData = async () => {
  try {
    const response = await axios.get(`${API_URL}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching Comptroller data:', error);
    throw error;
  }
};

export const updateComptrollerData = async (data) => {
  try {
    const response = await axios.post(`${API_URL}`, data);
    return response.data;
  } catch (error) {
    console.error('Error updating Comptroller data:', error);
    throw error;
  }
};
