import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ isAuthenticated, onLogout }) => {
  const [activeButton, setActiveButton] = useState('login');

  const handleButtonClick = (button) => {
    setActiveButton(button);
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <div className="bg-blue-500 p-4 flex justify-between items-center">
      <button className="text-gray-600 bg-white ">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </button>
      <div>
        {isAuthenticated ? (
          <button onClick={handleLogout} className="text-white bg-red-500 px-4 py-2 rounded">Logout</button>
        ) : (
          <>
            <Link
              to="/login"
              onClick={() => handleButtonClick('login')}
              className={`px-4 py-2 rounded ${activeButton === 'login' ? 'bg-white text-blue-500' : 'bg-blue-500 text-white'}`}
            >
              Login
            </Link>
            <Link
              to="/signup"
              onClick={() => handleButtonClick('signup')}
              className={`px-4 py-2 rounded ${activeButton === 'signup' ? 'bg-white text-blue-500' : 'bg-blue-500 text-white'}`}
            >
              Signup
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;

