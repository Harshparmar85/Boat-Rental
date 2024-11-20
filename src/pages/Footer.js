import React from "react";
import { Link } from "react-router-dom"; // Import Link for navigation

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo">
          {/* Place the logo or icon here */}
          <img src="insta.jpg" alt="insta.jpg" />
        </div>

        <div className="footer-links">
          <div className="footer-column">
            <h4>Information</h4>
            <ul>
              <li><Link to="/AboutUs">FAQ</Link></li> {/* Redirect to AboutUs */}
              <li><Link to="/AboutUs">Returns</Link></li> {/* Redirect to AboutUs */}
              <li><Link to="/AboutUs">Privacy Policy</Link></li> {/* Redirect to AboutUs */}
            </ul>
          </div>
          <div className="footer-column">
            <h4>Customer Service</h4>
            <ul>
              <li><Link to="/AboutUs">Contact Us</Link></li> {/* Redirect to AboutUs */}
              <li><Link to="/AboutUs">Return Policy</Link></li> {/* Redirect to AboutUs */}  
            </ul>
          </div>
          <div className="footer-column">
            <h4>Resources</h4>
            <ul>
              <li><Link to="/Home">Blog</Link></li> {/* Redirect to AboutUs */}
              <li><Link to="/AboutUs">Guides</Link></li> {/* Redirect to AboutUs */}
              <li><Link to="/AboutUs">Product Support</Link></li> {/* Redirect to AboutUs */}
              <li><Link to="/AboutUs">Terms of Service</Link></li> {/* Redirect to AboutUs */}
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>&copy; 2024 Company Name. All Rights Reserved.</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
