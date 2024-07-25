// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Link } from 'react-router-dom';

// const Login = ({ onLogin }) => {
//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onLogin();
//     navigate('/dashboard');
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
//         <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <input type="email" placeholder="Email" className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
//           </div>
//           <div className="mb-6">
//             <input type="password" placeholder="Password" className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
//           </div>
//           <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">Login</button>
//         </form>
//         <p className="mt-4 text-center">
//           Don't have an account? <Link to="/signUp" className="text-blue-500">Sign Up</Link>
//         </p>
//         <button className="w-full mt-4 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">Login with Google</button>
//       </div>
//     </div>
//   );
// };

// export default Login;
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const Login = ({ onLogin }) => {
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
    password: Yup.string()
        .required('Password is required')
        .matches(/^(?=.*[A-Z])(?=.*[@])(?=.{8,})/, 'Password must contain at least 8 characters, one uppercase letter, and one "@" symbol'),
  });

  const handleSubmit = (values) => {
    onLogin();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-4">
                <Field
                  name="email"
                  type="email"
                  placeholder="Email"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
              </div>
              <div className="mb-6">
                <Field
                  name="password"
                  type="password"
                  placeholder="Password"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
                disabled={isSubmitting}
              >
                Login
              </button>
            </Form>
          )}
        </Formik>
        <p className="mt-4 text-center">
          Don't have an account? <Link to="/signUp" className="text-blue-500">Sign Up</Link>
        </p>
        <button className="w-full mt-4 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
          Login with Google
        </button>
      </div>
    </div>
  );
};

export default Login;