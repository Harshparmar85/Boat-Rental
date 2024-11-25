import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import HeroSection from "./pages/HeroSection";
import Footer from "./pages/Footer";
import Navbar from "./pages/Navbar"; // Ensure Navbar handles user display
import Categories from "./pages/Categories";
import AboutUs from "./pages/AboutUs";
import BoatOwer from "./pages/BoatOwer"; // Corrected component name
import { UserAuthContextProvider } from "./context/UserAuthContext";
import { NotificationProvider } from "./context/NotificationContext"; // Ensure correct import
import ProtectedRoute from "./components/ProtectedRoute";
import OwnersDashboard from "./pages/OwnersDashboard";
import BookingPage from "./pages/BookingPage"; // Import BookingPage
import PaymentPage from "./pages/PaymentPage"; // Import PaymentPage
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";

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
      <NotificationProvider>
        <Router>
          <Navbar /> {/* Navbar should display user info */}
          <Routes>
            {/* Home route - Public */}
            <Route path="/" element={<Home />} />

            {/* Public authentication routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Public pages */}
            <Route path="/categories" element={<Categories />} />
            <Route path="/AboutUs" element={<AboutUs />} />

            {/* Booking Page Route */}
            <Route path="/BookingPage" element={<BookingPage />} />

            {/* Payment Page Route */}
            <Route path="/payment" element={<PaymentPage />} />

            {/* Protected Boatowners route */}
            <Route
              path="/OwnersDashboard"
              element={
                <ProtectedRoute role="BoatOwner">
                  <OwnersDashboard />
                </ProtectedRoute>
              }
            />

            {/* Admin routes with protection */}
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route
              path="/admin-dashboard"
              element={
                <ProtectedRoute requiredAdmin={true}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            {/* Protected Boat Owner route */}
            <Route
              path="/boat-ower"
              element={
                <ProtectedRoute>
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
