import React from "react";
import { useUserAuth } from "../context/UserAuthContext";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import HeroSection from "./HeroSection";
import Categories from "./Categories";
import Footer from "./Footer";

const Home = () => {
  const { logOut, user } = useUserAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/"); // Redirect to login after logout
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="home-container">
      <h1>Welcome, {user?.email}!</h1>
      <Button onClick={handleLogout}>Log Out</Button>
      <HeroSection />
      <Categories />
      <Footer />
    </div>
  );
};

export default Home;
