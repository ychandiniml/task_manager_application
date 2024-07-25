import React from 'react';
import { ErrorMessage as FormikErrorMessage } from 'formik';

const ErrorMessage = ({ name }) => {
  return (
    <FormikErrorMessage name={name} component="div" className="text-red-500 text-sm" />
  );
};

export default ErrorMessage;
