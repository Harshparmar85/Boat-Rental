import React, { useEffect, useState } from "react";
import { auth, signOut } from "../firebase"; // Ensure signOut is imported
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser?.email === "R12@gmail.com") {
        setIsAdmin(true); // Set as admin if email matches
      } else {
        navigate("/"); // Redirect non-admin users to the homepage
      }
    });

    return unsubscribe; // Cleanup the listener
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await signOut(auth); // Log out the admin
      navigate("/"); // Redirect to the homepage after logout
    } catch (error) {
      console.error("Logout failed:", error); // Handle potential errors
    }
  };

  if (!isAdmin) {
    return <p>Loading...</p>; // Display a loading state until admin check completes
  }

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>Admin Dashboard</h2>
      <p style={{ fontSize: "1.2rem", marginBottom: "20px" }}>
        Welcome, Admin <strong>{auth.currentUser.email}</strong>
      </p>
      <button
        onClick={handleLogout}
        style={{
          padding: "10px 20px",
          fontSize: "1rem",
          backgroundColor: "#f00",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default AdminDashboard;
