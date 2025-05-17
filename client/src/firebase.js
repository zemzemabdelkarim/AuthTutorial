// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY, 
  authDomain: "authtutorial-6188f.firebaseapp.com",
  projectId: "authtutorial-6188f",
  storageBucket: "authtutorial-6188f.firebasestorage.app",
  messagingSenderId: "161664621222",
  appId: "1:161664621222:web:4702c7db57967b97e93267"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);