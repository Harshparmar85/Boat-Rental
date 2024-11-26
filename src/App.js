import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import HeroSection from "./pages/HeroSection";
import Footer from "./pages/Footer";
import Navbar from "./pages/Navbar";
import Categories from "./pages/Categories";
import AboutUs from "./pages/AboutUs";
import BoatOwner from "./pages/BoatOwer";
import OwnersDashboard from "./pages/OwnersDashboard";
import BookingPage from "./pages/BookingPage";
import PaymentPage from "./pages/PaymentPage";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import ProfilePage from "./pages/ProfilePage";
import { UserAuthContextProvider } from "./context/UserAuthContext";
import { NotificationProvider } from "./context/NotificationContext";
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
      <NotificationProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/AboutUs" element={<AboutUs />} />
            <Route
              path="/BookingPage"
              element={
                <ProtectedRoute>
                  <BookingPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/payment"
              element={
                <ProtectedRoute>
                  <PaymentPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/owners-dashboard"
              element={
                <ProtectedRoute role="BoatOwner">
                  <OwnersDashboard />
                </ProtectedRoute>
              }
            />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route
              path="/admin-dashboard"
              element={
                <ProtectedRoute requiredAdmin={true}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/boat-owner"
              element={
                <ProtectedRoute role="BoatOwner">
                  <BoatOwner />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
            {/* Redirect unknown paths */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </NotificationProvider>
    </UserAuthContextProvider>
  );
};

export default App;
