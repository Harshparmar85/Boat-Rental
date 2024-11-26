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
  const [role, setRole] = useState("user"); // Default role
  const [loading, setLoading] = useState(true);

  // Login with email and password
  function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  // Sign up with email and password
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

  // Fetch and update user state on authentication change
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setLoading(true);

      if (currentUser) {
        setUser(currentUser);
        try {
          const userDoc = await FBDataService.getData(currentUser.uid); // Fetch user document
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setRole(userData.role || "user"); // Set role or default to "user"
          } else {
            console.warn("User document not found. Setting default role.");
            setRole("user"); // Fallback to default role
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          setRole("user"); // Fallback to default role on error
        }
      } else {
        setUser(null);
        setRole("user"); // Reset role to default when logged out
      }

      setLoading(false); // Authentication state resolved
    });

    return () => {
      unsubscribe();
    };
  }, []);

  // Render loading state until authentication is resolved
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

// Hook to access authentication context
export function useUserAuth() {
  return useContext(userAuthContext);
}
