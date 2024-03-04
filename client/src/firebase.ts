// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-edfe1.firebaseapp.com",
  projectId: "mern-blog-edfe1",
  storageBucket: "mern-blog-edfe1.appspot.com",
  messagingSenderId: "572121855531",
  appId: "1:572121855531:web:94ecdcefe055ef8f2a9c6e",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
