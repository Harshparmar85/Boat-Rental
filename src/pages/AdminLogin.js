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

  const adminEmail = "R12@gmail.com"; // Admin email address

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Authenticate the user
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Check if the logged-in user is an admin
      if (user.email === adminEmail) {
        navigate("/admin-dashboard"); // Redirect to admin dashboard
      } else {
        setError("Access restricted to admins only.");
        await auth.signOut(); // Sign out non-admin users
      }
    } catch (err) {
      console.error("Error during admin login:", err);
      const errorMessage =
        err.code === "auth/wrong-password"
          ? "Invalid password. Please try again."
          : err.code === "auth/user-not-found"
          ? "Admin account not found."
          : "Something went wrong. Please try again.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-container">
      <h2 className="admin-login-title">Admin Login</h2>
      <form onSubmit={handleLogin} className="admin-login-form">
        <input
          type="email"
          placeholder="Admin Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="admin-input"
        />
        <input
          type="password"
          placeholder="Password"
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
