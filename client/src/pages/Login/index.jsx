// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Link } from 'react-router-dom';
// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import * as Yup from 'yup';

// const Login = ({ onLogin }) => {
//   const navigate = useNavigate();

//   const validationSchema = Yup.object({
//     email: Yup.string()
//         .email('Invalid email address')
//         .required('Email is required'),
//     password: Yup.string()
//         .required('Password is required')
//         .matches(/^(?=.*[A-Z])(?=.*[@])(?=.{8,})/, 'Password must contain at least 8 characters, one uppercase letter, and one "@" symbol'),
//   });

//   const handleSubmit = (values) => {
//     onLogin();
//     navigate('/dashboard');
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
//         <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
//         <Formik
//           initialValues={{ email: '', password: '' }}
//           validationSchema={validationSchema}
//           onSubmit={handleSubmit}
//         >
//           {({ isSubmitting }) => (
//             <Form>
//               <div className="mb-4">
//                 <Field
//                   name="email"
//                   type="email"
//                   placeholder="Email"
//                   className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//                 <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
//               </div>
//               <div className="mb-6">
//                 <Field
//                   name="password"
//                   type="password"
//                   placeholder="Password"
//                   className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//                 <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
//               </div>
//               <button
//                 type="submit"
//                 className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
//                 disabled={isSubmitting}
//               >
//                 Login
//               </button>
//             </Form>
//           )}
//         </Formik>
//         <p className="mt-4 text-center">
//           Don't have an account? <Link to="/signUp" className="text-blue-500">Sign Up</Link>
//         </p>
//         <button className="w-full mt-4 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
//           Login with Google
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Login;


import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Input from '../../components/Input';
import Button from '../../components/GoogleAuthButton';
import ErrorMessage from '../../components/ErrorMessage';
import {auth, googleProvider} from '../../config/firebase';
import { signInWithPopup } from "firebase/auth";


const Login = ({ onLogin }) => {
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .required('Password is required')
      .matches(
        /^(?=.*[A-Z])(?=.*[@])(?=.{8,})/,
        'Password must contain at least 8 characters, one uppercase letter, and one "@" symbol'
      ),
  });

  const handleSubmit = (values) => {
    onLogin();
    navigate('/dashboard');
  };



  const googleSignin = () => {
    signInWithPopup(auth, googleProvider)
    .then((response) => {
        const { uid, displayName, email, photoURL } = response.user;
        const data = {
            "vendor_uid": uid,
            "name": displayName,
            "email": email,
            "photo_url": photoURL
        }
        response.user.getIdToken().then((idToken) => {
            console.log("ID Token:", idToken);
            console.log("Full response object:", response); // Print the entire response
            // Use the ID token for authenticated requests
            // (e.g., send it to your server or use it in API calls)
          });
    }).catch((err)=> {
        console.log("googleSignin err: ", err);
    })
  }

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
                <Input
                  name="email"
                  type="email"
                  placeholder="Email"
                />
                <ErrorMessage name="email" />
              </div>
              <div className="mb-6">
                <Input
                  name="password"
                  type="password"
                  placeholder="Password"
                />
                <ErrorMessage name="password" />
              </div>
              <Button type="submit" disabled={isSubmitting}>
                Login
              </Button>
            </Form>
          )}
        </Formik>
        <p className="mt-4 text-center">
          Don't have an account? <Link to="/signUp" className="text-blue-500">Sign Up</Link>
        </p>
        <Button onClick={googleSignin} className="mt-4">
          Login with Google
        </Button>
      </div>
    </div>
  );
};

export default Login;
