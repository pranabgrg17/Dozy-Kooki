import React, { useState } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { useNavigate } from 'react-router-dom'; 

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false); // Track dropdown visibility
  const navigate = useNavigate();

  const logout = () => {
    console.log("Logged out");

    // Redirect to frontend website
    window.location.href = 'http://localhost:5173'; 
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown); // Toggle dropdown show/hide
  };

  return (
    <div className='navbar'>
      <img className='logo' src={assets.logo} alt="Logo" />

      {/* Profile Icon */}
      <div className="navbar-profile" onClick={toggleDropdown}>
        <img src={assets.profile_image} alt="Profile" />

        {/* Dropdown */}
        {showDropdown && (
          <ul className="nav-profile-dropdown">
            <li onClick={logout}>
              <img src={assets.logout_icon} alt="Logout" />
              <p>Log Out</p>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Navbar;
