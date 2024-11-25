import React, { useState } from "react";
import { auth, signInWithEmailAndPassword } from "../firebase";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const adminEmail = "Ramandeepsingh1032001@gmail.com"; // Replace with your admin email

    if (email === adminEmail) {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        navigate("/admin-dashboard"); // Redirect to the admin page
      } catch (err) {
        setError("Invalid credentials. Please try again.");
      }
    } else {
      setError("Access restricted to admins only.");
    }
  };

  return (
    <div>
      <h2>Admin Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
};

export default AdminLogin;
