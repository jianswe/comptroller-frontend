import axios from 'axios';

// eslint-disable-next-line no-undef
const baseUrl = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_API_URL_PROD : process.env.REACT_APP_API_URL_LOCAL;

const API_URL = `${baseUrl}/api/auth`; 

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