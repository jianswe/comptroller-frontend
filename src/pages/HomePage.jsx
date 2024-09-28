import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ComptrollerData from '../components/ComptrollerData';

const HomePage = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('userToken');

    if (!token) {
        const handleLoginRedirect = () => {
            navigate('/login');
        };    

        const handleRegisterRedirect  = () => {
            navigate('/register');
        };    

        return (
            <>
                <h2>Please log in to view this page</h2>
                <button onClick={handleLoginRedirect}>Go to Login Page</button>
                <h3>Please register if you don&apos;t have an account</h3>
                <button onClick={handleRegisterRedirect}>Go to Register Page</button>
            </>
        );
    }

    return (
        <>
            <h2>Welcome to the Homepage!</h2>
            <Navbar />
            <ComptrollerData />
        </>
    );
}

export default HomePage;