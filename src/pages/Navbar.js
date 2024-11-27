import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";
import "../css/Navbar.css"; // Ensure CSS for styling

const Navbar = () => {
  const { user, logOut } = useUserAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  // Close the dropdown when clicking outside
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="logo">
          Auckland Boat Rentals
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
            <Link to="/about-us" className="nav-item"> {/* Corrected path */}
              About Us
            </Link>
          </li>
          {user && (
            <li className="dropdown" ref={dropdownRef}>
              <button
                className="dropdown-button"
                aria-haspopup="true"
                onClick={toggleDropdown}
              >
                Dashboards
              </button>
              {dropdownOpen && (
                <ul className="dropdown-menu">
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => navigate("/profile")}
                    >
                      users
                    </button>
                  </li>
                  {user.email === "Ramandeepsingh1032001@gmail.com" && (
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() => navigate("/admin-dashboard")}
                      >
                        Admin Dashboard
                      </button>
                    </li>
                  )}
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => navigate("/boat-owner")}
                    >
                      Boat Owners
                    </button>
                  </li>
                </ul>
              )}
            </li>
          )}
          {user ? (
            <>
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
