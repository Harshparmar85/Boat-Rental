import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase";
import FBDataService from "../context/FBService"; // Ensure this service is correctly implemented

const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState("user"); // Default role is "user"
  const [loading, setLoading] = useState(true);

  // Login function
  function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  // Sign up function
  function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  // Logout function
  function logOut() {
    return signOut(auth)
      .then(() => {
        setUser(null);
        setRole("user");
      })
      .catch((error) => console.error("Error during logout:", error));
  }

  // Google Sign-In
  function googleSignIn() {
    const googleAuthProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleAuthProvider);
  }

  // Fetch authenticated user and role
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setLoading(true);

      if (currentUser) {
        setUser(currentUser);
        try {
          const userDoc = await FBDataService.getData(currentUser.uid);
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setRole(userData.role || "user");
          } else {
            console.warn("User document not found. Setting default role.");
            setRole("user");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          setRole("user");
        }
      } else {
        setUser(null);
        setRole("user");
      }

      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  // Show loading until authentication is resolved
  if (loading) {
    return <div style={{ textAlign: "center", padding: "20px" }}>Loading...</div>;
  }

  return (
    <userAuthContext.Provider
      value={{
        user,
        role,
        logIn,
        signUp,
        logOut,
        googleSignIn,
      }}
    >
      {children}
    </userAuthContext.Provider>
  );
}

// Hook to use the context
export function useUserAuth() {
  return useContext(userAuthContext);
}
