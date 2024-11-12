import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"; // Import Navbar-specific CSS

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/categories">Categories</Link></li>
        <li><Link to="/AboutUs">About</Link></li>
      </ul>
      <div>
        <Link to="/login">
          <button className="navbar-login-button">Login</button>
        </Link>
        <Link to="/signup">
          <button className="navbar-register-button">Register</button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
