// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBOhgLSXV9_B6hGMn3eON_-qMCcDpV5Fjk",
  authDomain: "ai-traveler-25297.firebaseapp.com",
  projectId: "ai-traveler-25297",
  storageBucket: "ai-traveler-25297.firebasestorage.app",
  messagingSenderId: "859176149127",
  appId: "1:859176149127:web:4fb068d8aadf419c615822",
  measurementId: "G-39MR1E8MEE"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);