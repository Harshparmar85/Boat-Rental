import React, { useState } from "react";
import { Form, Alert, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { auth, db, createUserWithEmailAndPassword, setDoc, doc } from "../firebase";
import "../css/Login.css";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [address, setAddress] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous error
    setLoading(true);

    // Validation
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    if (!role) {
      setError("Please select a role.");
      setLoading(false);
      return;
    }

    if (!/^\d{10}$/.test(contactNumber)) {
      setError("Contact number must be exactly 10 digits.");
      setLoading(false);
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Invalid email format.");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      setLoading(false);
      return;
    }

    try {
      // Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save user details in Firestore
      await setDoc(doc(db, "users", user.uid), {
        email,
        role: role.toLowerCase(),
        firstname,
        lastname,
        address,
        contactNumber,
        createdAt: new Date().toISOString(),
      });

      // Redirect based on role
      if (role.toLowerCase() === "boatowners") {
        navigate("/OwnersDashboard");
      } else {
        navigate("/home");
      }
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2 className="login-heading">Register</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>First Name:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your first name"
              onChange={(e) => {
                setFirstname(e.target.value);
                setError(""); // Clear error on input change
              }}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Last Name:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your last name"
              onChange={(e) => {
                setLastname(e.target.value);
                setError(""); // Clear error on input change
              }}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Address:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your address"
              onChange={(e) => {
                setAddress(e.target.value);
                setError(""); // Clear error on input change
              }}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Contact Number:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your contact number"
              onChange={(e) => {
                setContactNumber(e.target.value);
                setError(""); // Clear error on input change
              }}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email:</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={(e) => {
                setEmail(e.target.value);
                setError(""); // Clear error on input change
              }}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              onChange={(e) => {
                setPassword(e.target.value);
                setError(""); // Clear error on input change
              }}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Confirm Password:</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm password"
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setError(""); // Clear error on input change
              }}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Role:</Form.Label>
            <Form.Control
              as="select"
              onChange={(e) => {
                setRole(e.target.value);
                setError(""); // Clear error on input change
              }}
              required
            >
              <option value="">Select Role</option>
              <option value="BoatOwners">Boat Owner</option>
              <option value="Customer">Customer</option>
            </Form.Control>
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </Button>
          <div className="text-center mt-3">
            Already have an account? <Link to="/">Back to Login</Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Signup;
