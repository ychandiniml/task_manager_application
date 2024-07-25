import React from 'react';
import { Field } from 'formik';

const Input = ({ name, type = 'text', placeholder, className, ...props }) => {
  return (
    <Field
      name={name}
      type={type}
      placeholder={placeholder}
      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
      {...props}
    />
  );
};

export default Input;
