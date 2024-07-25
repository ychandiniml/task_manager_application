import React, { useState } from 'react';
import Button from '../Button';
import NavLink from '../NavLink';
import { useNavigate }  from 'react-router-dom';

const Navbar = ({ isAuthenticated, onLogout }) => {
  const [activeButton, setActiveButton] = useState('login');
  const navigate = useNavigate();

  const handleButtonClick = (button) => {
    setActiveButton(button);
  };

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <div className="bg-blue-500 p-4 flex justify-between items-center">
      <Button
        onClick={() => handleButtonClick('menu')}
        text={
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        }
        className="text-gray-600 bg-white"
      />
      <div>
        {isAuthenticated ? (
          <Button onClick={handleLogout} text="Logout" className="text-white bg-red-500 px-4 py-2 rounded" />
        ) : (
          <>
            <NavLink
              to="/login"
              onClick={() => handleButtonClick('login')}
              text="Login"
              isActive={activeButton === 'login'}
            />
            <NavLink
              to="/signup"
              onClick={() => handleButtonClick('signup')}
              text="Signup"
              isActive={activeButton === 'signup'}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
