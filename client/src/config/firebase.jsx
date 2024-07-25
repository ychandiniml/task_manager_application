import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
    getAuth,
    GoogleAuthProvider,
} from "firebase/auth";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDOI_e6gW3bQKQOkLM9hbAHEWntWvqMpck",
  authDomain: "task-manager-application-2072c.firebaseapp.com",
  projectId: "task-manager-application-2072c",
  storageBucket: "task-manager-application-2072c.appspot.com",
  messagingSenderId: "483860555529",
  appId: "1:483860555529:web:041aa88863125a576c55d8",
  measurementId: "G-S28GKCKPFF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();

export {auth, googleProvider};
