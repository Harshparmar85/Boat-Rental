import React, { useState, useEffect } from "react";
import { Form, Alert, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";
import { getDownloadURL, ref } from "firebase/storage";
import { storage, db } from "../firebase"; // Use db instead of firestore
import { doc, setDoc } from "firebase/firestore"; // Add Firestore functions
import "../css/Login.css";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const [image, setImage] = useState("");
  const { signUp } = useUserAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const imageRef = ref(storage, "images/boat-register.jpg");
        const url = await getDownloadURL(imageRef);
        setImage(url);
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };
    fetchImage();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!role) {
      setError("Please select a role");
      return;
    }

    try {
      const userCredential = await signUp(email, password);
      const user = userCredential.user;

      // Save user role in Firestore
      await setDoc(doc(db, "users", user.uid), {
        email: email,
        role: role, // Save selected role
      });

      navigate("/home"); // Navigate to home page after registration
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-page" style={{ backgroundImage: `url(${image})` }}>
      <div className="login-container">
        <h2 className="login-heading">Boat Rental Registration</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Email:</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Confirm Password:</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </Form.Group>

          {/* Role Selection Dropdown */}
          <Form.Group className="mb-3">
            <Form.Label>Role:</Form.Label>
            <Form.Control
              as="select"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="customer">Customer</option>
            </Form.Control>
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100">
            Register
          </Button>

          <div className="text-center mt-3">
            Already have an account? <Link to="/">Back to Login</Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Register;
