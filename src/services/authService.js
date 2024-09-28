import axios from 'axios';

const API_URL = 'http://localhost:5086/api/auth'; // Replace with your actual API URL

export const register = async (userData) => {
    return axios.post(`${API_URL}/register`, userData);
};

export const login = async (credentials) => {
    return axios.post(`${API_URL}/login`, credentials);
};

export const logout = () => {
    // Clear user session data
    localStorage.removeItem('userToken');
    localStorage.removeItem('user'); // Remove user data if stored

    // Redirect to the login page or homepage, which is done through Navbar component, since useNavigate cannot be used outside of component. 
};

export const getCurrentUser = () => {
    return localStorage.getItem('userToken');
};