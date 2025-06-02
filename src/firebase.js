// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBCvvBN0P0QwllYJ8HFPTqtjiFmx5faTSY",
  authDomain: "shopping-681e3.firebaseapp.com",
  projectId: "shopping-681e3",
  storageBucket: "shopping-681e3.firebasestorage.app",
  messagingSenderId: "1021542637859",
  appId: "1:1021542637859:web:86f84c9d4f3ea5365b2c96",
  measurementId: "G-73FY38C01V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()
