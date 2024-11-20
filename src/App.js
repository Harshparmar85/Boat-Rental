import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import HeroSection from "./pages/HeroSection";
import Footer from "./pages/Footer";
import Navbar from "./pages/Navbar";
import Categories from "./pages/Categories";
import AboutUs from "./pages/AboutUs";
import BoatOwer from "./pages/BoatOwer"; // Corrected component name
import { UserAuthContextProvider } from "./context/UserAuthContext";
import { NotificationProvider } from "./context/NotificationContext"; // Ensure correct import
import ProtectedRoute from "./components/ProtectedRoute";
import OwnersDashboard from "./pages/OwnersDashboard";

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
            {/* Home route - Public */}
            <Route
              path="/"
              element={
                <Home /> // Make the Home page public
              }
            />

            {/* Public authentication routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Additional routes for other pages */}
            <Route path="/categories" element={<Categories />} />
            <Route path="/AboutUs" element={<AboutUs />} />

            {/* Protected Boatowners route */}
            <Route
              path="/OwnersDashboard"
              element={
                <ProtectedRoute role="BoatOwner"> {/* Ensure only Owners can access */}
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
