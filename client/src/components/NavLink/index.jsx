// NavLink.js
import React from 'react';
import { Link } from 'react-router-dom';

const NavLink = ({ to, onClick, text, isActive }) => (
  <Link
    to={to}
    onClick={onClick}
    className={`px-4 py-2 rounded ${isActive ? 'bg-white text-blue-500' : 'bg-blue-500 text-white'}`}
  >
    {text}
  </Link>
);

export default NavLink;
