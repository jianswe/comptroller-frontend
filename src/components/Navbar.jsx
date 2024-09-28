import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../services/authService'

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    }

    return (
        <nav>
            {/* Other navbar items */}
            <button onClick={handleLogout}>Logout</button>
        </nav>
    )
}

export default Navbar;