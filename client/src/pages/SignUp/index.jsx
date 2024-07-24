import React from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const SignUp = () => {
    const validationSchema = Yup.object({
        firstName: Yup.string().required('First Name is required'),
        lastName: Yup.string().required('Last Name is required'),
        email: Yup.string().email('Invalid email address').required('Email is required'),
        password: Yup.string()
          .required('Password is required')
          .matches(/^(?=.*[A-Z])(?=.*[@])(?=.{8,})/, 'Password must contain at least 8 characters, one uppercase letter, and one "@" symbol'),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref('password'), null], 'Passwords must match')
          .required('Confirm Password is required'),
    });

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Signup</h2>
                <Formik
                    initialValues={{
                        firstName: '',
                        lastName: '',
                        email: '',
                        password: '',
                        confirmPassword: '',
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values) => {
                        console.log(values);
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <div className="mb-4">
                                <Field
                                    name="firstName"
                                    type="text"
                                    placeholder="First Name"
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <ErrorMessage name="firstName" component="div" className="text-red-500 text-sm" />
                            </div>
                            <div className="mb-4">
                                <Field
                                    name="lastName"
                                    type="text"
                                    placeholder="Last Name"
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <ErrorMessage name="lastName" component="div" className="text-red-500 text-sm" />
                            </div>
                            <div className="mb-4">
                                <Field
                                    name="email"
                                    type="email"
                                    placeholder="Email"
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                            </div>
                            <div className="mb-4">
                                <Field
                                    name="password"
                                    type="password"
                                    placeholder="Password"
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
                            </div>
                            <div className="mb-6">
                                <Field
                                    name="confirmPassword"
                                    type="password"
                                    placeholder="Confirm Password"
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm" />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
                                disabled={isSubmitting}
                            >
                                Signup
                            </button>
                        </Form>
                    )}
                </Formik>
                <p className="mt-4 text-center">
                    Already have an account? <Link to="/login" className="text-blue-500">Login</Link>
                </p>
                <button className="w-full mt-4 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
                    Signup with Google
                </button>
            </div>
        </div>
    );
};

export default SignUp;
