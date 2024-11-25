import React, { useEffect, useState } from "react";
import { auth, signOut } from "../firebase";  // Ensure signOut is imported from firebase.js
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user?.email === "Ramandeepsingh1032001@gmail.com") {
        setUser(user);  // Set the user if the email matches
      } else {
        navigate("/"); // Redirect if not admin
      }
    });
    return unsubscribe;  // Clean up on unmount
  }, [navigate]);

  const handleLogout = () => {
    signOut(auth);
    navigate("/");  // Redirect to homepage after logout
  };

  return (
    <div>
      <h2>Welcome, Admin!</h2>
      {/* Display user info if needed */}
      {user && <p>Logged in as: {user.email}</p>} {/* Optionally display user email */}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default AdminDashboard;
