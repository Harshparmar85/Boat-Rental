import React, { useState, useEffect } from "react";
import { Form, Alert, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";
import { getDownloadURL, ref } from "firebase/storage";
import { storage, db } from "../firebase"; // Ensure Firebase imports are correct
import { doc, setDoc } from "firebase/firestore"; // Add Firestore methods
import "../css/Login.css"; // Assuming the same CSS file is used for styling

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState(""); // For selecting user role
  const [error, setError] = useState("");
  const [image, setImage] = useState(""); // For background image
  const { signUp } = useUserAuth(); // Assuming you have a context for user auth
  const navigate = useNavigate(); // For navigation after successful registration

  useEffect(() => {
    // Fetch background image from Firebase Storage
    const fetchImage = async () => {
      try {
        const imageRef = ref(storage, "images/boat-register.jpg"); // Path to image in Firebase Storage
        const url = await getDownloadURL(imageRef); // Get URL of the image
        setImage(url); // Set image in the state for background
      } catch (error) {
        console.error("Error fetching image:", error); // Handle errors
      }
    };
    fetchImage();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error

    // Validation
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!role) {
      setError("Please select a role");
      return;
    }

    try {
      // Register user using email and password
      const userCredential = await signUp(email, password);
      const user = userCredential.user;

      // Save user role and email in Firestore
      await setDoc(doc(db, "users", user.uid), {
        email: email,
        role: role, // Save the role selected by the user
      });

      // Redirect to home or admin dashboard based on role
      if (role === "BoatOwners") {
        navigate("/OwnersDashboard");
      } else {
        navigate("/home");
      }
    } catch (err) {
      setError(err.message); // Set error message if any
    }
  };

  return (
    <div className="login-page" style={{ backgroundImage: `url(${image})` }}>
      <div className="login-container">
        <h2 className="login-heading">Boat Rental Registration</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          {/* Email input field */}
          <Form.Group className="mb-3">
            <Form.Label>Email:</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          {/* Password input field */}
          <Form.Group className="mb-3">
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          {/* Confirm Password input field */}
          <Form.Group className="mb-3">
            <Form.Label>Confirm Password:</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </Form.Group>

          {/* Role selection */}
          <Form.Group className="mb-3">
            <Form.Label>Role:</Form.Label>
            <Form.Control
              as="select"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="">Select Role</option>
              <option value="BoatOwners">BoatOwer</option>
              <option value="customer">Customer</option>
            </Form.Control>
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100">
            Register
          </Button>

          {/* Link to Login */}
          <div className="text-center mt-3">
            Already have an account? <Link to="/">Back to Login</Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Register;
