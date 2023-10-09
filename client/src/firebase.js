// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "real-estate-6056f.firebaseapp.com",
  projectId: "real-estate-6056f",
  storageBucket: "real-estate-6056f.appspot.com",
  messagingSenderId: "133197391055",
  appId: "1:133197391055:web:207aae08463cd8243c83ba",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
