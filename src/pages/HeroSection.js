// src/components/HeroSection.js

import React from 'react';


const HeroSection = () => {
    return (
        <section className="hero-section">
            <img src="Bg.jpg" alt="Hero" className="hero-image" />
            <div className="hero-overlay">
                <h1>Auckland boat Rental</h1>
                <p>Have Fun day</p>
            </div>
        </section>
    );
};

export default HeroSection;


