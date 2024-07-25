import React from 'react';

const Button = ({ type = 'button', className, children, ...props }) => {
  return (
    <button
      type={type}
      className={`w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
