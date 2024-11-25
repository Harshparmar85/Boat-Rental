import React, { useState } from "react";
import { auth, signInWithEmailAndPassword } from "../firebase";
import { useNavigate } from "react-router-dom";
import "../css/Admin.css";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const adminEmail = "R12@gmail.com"; // Replace with your admin email
  const adminPassword = "A12345"; // Replace with your admin password

  const handleLogin = async (e) => {
    e.preventDefault();

    // Check if the entered email and password match the predefined credentials
    if (email !== adminEmail || password !== adminPassword) {
      setError("Access restricted to admins only. Invalid email or password.");
      return;
    }

    try {
      setError(""); // Reset any previous error
      setLoading(true); // Show loading state
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/admin-dashboard"); // Redirect to admin dashboard
    } catch (err) {
      const errorMessage =
        err.code === "auth/wrong-password"
          ? "Invalid password. Please try again."
          : err.code === "auth/user-not-found"
          ? "Admin account not found."
          : "Something went wrong. Please try again.";
      setError(errorMessage);
    } finally {
      setLoading(false); // Hide loading state
    }
  };

  return (
    <div className="admin-login-container">
      <h2 className="admin-login-title">Admin Login</h2>
      <form onSubmit={handleLogin} className="admin-login-form">
        <input
          type="email"
          placeholder="Admin Email"
          aria-label="Admin Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="admin-input"
        />
        <input
          type="password"
          placeholder="Password"
          aria-label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="admin-input"
        />
        <button type="submit" className="admin-login-button" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
        {error && <p className="admin-error">{error}</p>}
      </form>
    </div>
  );
};

export default AdminLogin;
