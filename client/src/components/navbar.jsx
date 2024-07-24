import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ isAuthenticated, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <div className="absolute top-0 left-0 right-0 p-4 flex justify-between">
      <button className="text-gray-600">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </button>
      <div>
        {isAuthenticated ? (
          <button onClick={handleLogout} className="text-white bg-red-500 px-4 py-2 rounded">Logout</button>
        ) : (
          <>
            <Link to="/login" className="mr-4 text-blue-500">Login</Link>
            <Link to="/signup" className="text-blue-500">Signup</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
