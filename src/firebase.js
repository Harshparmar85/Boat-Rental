import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, getDocs, setDoc, doc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB6f89eQmVDVOKQkilHcrMd8hRzDFpxAXQ",
  authDomain: "boat-rental-4052b.firebaseapp.com",
  projectId: "boat-rental-4052b",
  storageBucket: "boat-rental-4052b.appspot.com", // Updated storage bucket
  messagingSenderId: "987066892083",
  appId: "1:987066892083:web:8c65d534f9b86929460846",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); // Authentication
export const db = getFirestore(app); // Firestore Database
export const storage = getStorage(app); // Storage

// Export common methods
export { 
  signInWithEmailAndPassword, 
  signOut, 
  createUserWithEmailAndPassword,
  collection,
  getDocs,
  setDoc,
  doc,
  ref,
  uploadBytes,
  getDownloadURL,
};
