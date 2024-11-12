// src/components/Footer.js

import React from 'react';


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
                <li><a href="#">FAQ</a></li>
                <li><a href="#">Returns</a></li>
                <li><a href="#">Shipping</a></li>
                <li><a href="#">Privacy Policy</a></li>
              </ul>
            </div>
            <div className="footer-column">
              <h4>Customer Service</h4>
              <ul>
                <li><a href="#">Contact Us</a></li>
                <li><a href="#">Order Tracking</a></li>
                <li><a href="#">Return Policy</a></li>
                <li><a href="#">Warranty</a></li>
              </ul>
            </div>
            <div className="footer-column">
              <h4>Resources</h4>
              <ul>
                <li><a href="#">Blog</a></li>
                <li><a href="#">Guides</a></li>
                <li><a href="#">Product Support</a></li>
                <li><a href="#">Terms of Service</a></li>
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

