import React, { useEffect, useState } from "react";
import { auth, signOut } from "../firebase"; // Ensure signOut is imported from firebase.js
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for authenticated admin
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser?.email === "R12@gmail.com") {
        setUser(currentUser); // Set the user if the email matches admin
      } else {
        navigate("/"); // Redirect non-admins to homepage
      }
    });

    return unsubscribe; // Clean up the listener on unmount
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await signOut(auth); // Log out from Firebase auth
      navigate("/"); // Redirect to homepage after logout
    } catch (error) {
      console.error("Logout failed:", error); // Handle any potential errors
    }
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>Admin Dashboard</h2>
      {/* Display admin info */}
      {user && (
        <div>
          <p style={{ fontSize: "1.2rem", marginBottom: "20px" }}>
            Logged in as: <strong>{user.email}</strong>
          </p>
        </div>
      )}

      <div>
        {/* Add admin-specific links or sections here */}
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
    </div>
  );
};

export default AdminDashboard;
