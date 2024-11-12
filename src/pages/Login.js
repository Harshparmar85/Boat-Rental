import React, { useState, useEffect } from "react";
import { Form, Alert, Button } from "react-bootstrap";
import GoogleButton from "react-google-button";
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../firebase";
import "../css/Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [image, setImage] = useState("");
  const { logIn, googleSignIn } = useUserAuth();
  const navigate = useNavigate();

  // Fetch the background image from Firebase Storage
  useEffect(() => {
    const fetchImage = async () => {
      try {
        const imageRef = ref(storage, "images/boat-login.jpg");
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
    try {
      await logIn(email, password);
      navigate("/home"); // Navigate to home page after login
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    try {
      await googleSignIn();
      navigate("/home"); // Navigate to home page after login
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="login-page" style={{ backgroundImage: `url(${image})` }}>
      <div className="login-container">
        <h2 className="login-heading">Boat Rental Login</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Email:</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100">
            Login
          </Button>

          <hr />
          <GoogleButton className="w-100" onClick={handleGoogleSignIn} />
          <div className="text-center mt-3">
            Don't have an account? <Link to="/signup">Create an Account</Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;