// Import Firebase core
import { initializeApp } from "firebase/app";

// Import Firebase Auth
import { getAuth } from "firebase/auth";

// (Optional) Import Analytics
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAqe74ktTZgKRnQl_ZmkPZreiCCb-ebQcM",
  authDomain: "usdtuniverse-9e38c.firebaseapp.com",
  projectId: "usdtuniverse-9e38c",
  storageBucket: "usdtuniverse-9e38c.firebasestorage.app",
  messagingSenderId: "583873036110",
  appId: "1:583873036110:web:bed4772c5b9a4f37eda81f",
  measurementId: "G-GCTY3VL024"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth (IMPORTANT)'
export const auth = getAuth(app);
export const db = getFirestore(app);

// Initialize Analytics (optional – will not break)
export const analytics = getAnalytics(app);