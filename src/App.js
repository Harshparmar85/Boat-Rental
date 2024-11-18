// src/App.js

import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import HeroSection from "./pages/HeroSection";
import Footer from "./pages/Footer";
import Navbar from "./pages/Navbar";
import Categories from "./pages/Categories";
import AboutUs from "./pages/AboutUs";
import OwnersDashboard from "./pages/OwnersDashboard";
import BoatOwer from "./pages/BoatOwer"; // Corrected component name
import { UserAuthContextProvider } from "./context/UserAuthContext";
import { NotificationProvider } from "./context/NotificationContext"; // Ensure correct import
import ProtectedRoute from "./components/ProtectedRoute";


const Home = () => (
  <div className="App">
    <HeroSection />
    <Categories />
    <Footer />
  </div>
);

const App = () => {
  return (
    <UserAuthContextProvider>
      <NotificationProvider> {/* Ensure NotificationProvider wraps all components */}
        <Router>
          <Navbar /> {/* Navbar is outside of Routes to make it visible on all pages */}
          <Routes>
            {/* Protected home route, displayed when user is logged in */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home /> {/* Display Home layout */}
                </ProtectedRoute>
              }
            />

            {/* Public authentication routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Additional routes for other pages */}
            <Route path="/categories" element={<Categories />} />
            <Route path="/AboutUs" element={<AboutUs />} />

            {/* Protected admin route */}
            <Route
              path="/OwnersDashboard"
              element={
                <ProtectedRoute role="BoatOwners"> {/* Ensure only admins can access */}
                  <OwnersDashboard />
                </ProtectedRoute>
              }
            />

            {/* Protected Boat Owner route */}
            <Route
              path="/boat-ower"
              element={
                <ProtectedRoute> {/* Ensure only authenticated users can access */}
                  <BoatOwer />
                </ProtectedRoute>
              }
            />

            {/* Redirect unknown paths */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Router>
      </NotificationProvider>
    </UserAuthContextProvider>
  );
};

export default App;
