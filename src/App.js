import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import HeroSection from "./pages/HeroSection";
import Footer from "./pages/Footer";
import Navbar from "./pages/Navbar";
import Categories from "./pages/Categories";
import AboutUs from "./pages/AboutUs";
import AdminDashboard from "./pages/AdminDashboard";
import { UserAuthContextProvider } from "./context/UserAuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import './App.css';

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
            path="/AdminDashboard" 
            element={
              <ProtectedRoute role="admin"> {/* Ensure only admins can access */}
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* Redirect unknown paths */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </UserAuthContextProvider>
  );
};

export default App;
