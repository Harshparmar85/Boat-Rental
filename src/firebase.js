
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";



const firebaseConfig = {
  apiKey: "AIzaSyB6f89eQmVDVOKQkilHcrMd8hRzDFpxAXQ",
 
  authDomain: "boat-rental-4052b.firebaseapp.com",
 
  projectId: "boat-rental-4052b",
 
  storageBucket: "boat-rental-4052b.firebasestorage.app",
 
  messagingSenderId: "987066892083",
 
  appId: "1:987066892083:web:8c65d534f9b86929460846"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

