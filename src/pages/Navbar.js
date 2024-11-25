import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";
import "../css/Navbar.css"; // Ensure CSS for styling

const Navbar = () => {
  const { user, logOut } = useUserAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/login"); // Redirect to login after logout
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="logo">
          Boat Booking
        </Link>
        <ul className="nav-links">
          <li>
            <Link to="/" className="nav-item">
              Home
            </Link>
          </li>
          <li>
            <Link to="/categories" className="nav-item">
              Categories
            </Link>
          </li>
          <li>
            <Link to="/AboutUs" className="nav-item">
              About Us
            </Link>
          </li>
          {user ? (
            <>
              {user.email === "Ramandeepsingh1032001@gmail.com" && (
                <li>
                  <Link to="/admin-dashboard" className="nav-item">
                    Admin Dashboard
                  </Link>
                </li>
              )}
              <li>
                <span className="welcome-text">
                  Welcome, {user.displayName || user.email.split("@")[0]}
                </span>
              </li>
              <li>
                <button className="logout-button" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" className="nav-item">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/admin-login" className="nav-item">
                  Admin Login
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;


