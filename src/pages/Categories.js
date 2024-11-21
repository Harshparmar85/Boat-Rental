import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import "../css/category.css";

const categories = [
    { name: 'Yacht', image: 'Yacht.jpg', boats: [ { name: 'Luxurberg', image: 'Y1.jpg', description: 'Luxury yacht with all amenities.', price: '$700/Day', available: true } ] },
    { name: 'Motor Boat', image: 'Motor boat.jpg', boats: [ { name: 'Vintage Cabin', image: 'M1.jpeg', description: 'High-speed motor boat for adventures.', price: '$300/Day', available: true } ] },
];

const Categories = () => {
    const [expandedCategory, setExpandedCategory] = useState(null);
    const navigate = useNavigate(); // Initialize navigation

    const handleViewClick = (categoryName) => {
        setExpandedCategory(expandedCategory === categoryName ? null : categoryName);
    };

    const handleNavigateToBooking = (boat) => {
        navigate('/BookingPage', { state: { boat } }); // Pass boat details to BookingPage
    };

    return (
        <section className="categories-section">
            <h2>Boat Categories</h2>
            <div className="categories-grid">
                {categories.map((category) => (
                    <div className="category-card" key={category.name}>
                        <img src={category.image} alt={category.name} />
                        <div className="category-overlay">
                            <span>{category.name}</span>
                            <button
                                className="view-button"
                                onClick={() => handleViewClick(category.name)}
                            >
                                {expandedCategory === category.name ? 'Hide' : 'View'}
                            </button>
                        </div>
                        {expandedCategory === category.name && (
                            <div className="boats-list">
                                {category.boats.map((boat, index) => (
                                    <div key={index} className="boat-card">
                                        <img src={boat.image} alt={boat.name} />
                                        <h4>{boat.name}</h4>
                                        <p>{boat.description}</p>
                                        <p>{boat.price}</p>
                                        <button
                                            onClick={() => handleNavigateToBooking(boat)}
                                            disabled={!boat.available}
                                        >
                                            {boat.available ? 'Book Now' : 'Not Available'}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Categories;
