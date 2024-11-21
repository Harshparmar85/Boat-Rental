import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { useUserAuth } from '../context/UserAuthContext'; // Import authentication context
import "../css/category.css";

const categories = [
    { name: 'Yacht', image: 'Yacht.jpg', boats: [ { name: 'Luxurberg', image: 'Y1.jpg', description: 'Luxury yacht with all amenities.', price: '$700/Day', available: true }, { name: 'Indu', image: 'Yacht2.jpg', description: 'Elegant yacht with spacious decks.', price: '$1000/Day', available: true } ] },
    { name: 'Motor Boat', image: 'Motor boat.jpg', boats: [ { name: 'Vintage Cabin', image: 'M1.jpeg', description: 'High-speed motor boat for adventures.', price: '$300/Day', available: true }, { name: 'Monster', image: 'M2.jpeg', description: 'Motor boat with modern design.', price: '$400/Day', available: true } ] },
    { name: 'Racing Boat', image: 'racing boat.jpg', boats: [ { name: 'F1', image: 'R1.jpg', description: 'Speedy racing boat for competitive use.', price: '$600/Day', available: false }, { name: 'Hydro', image: 'R2.jpg', description: 'Lightweight racing boat for speed.', price: '$500/Day', available: true } ] },
    { name: 'Raw Boat', image: 'raw boat.jpg', boats: [ { name: 'boat 1', image: 'Raw1.jpeg', description: 'Simple and sturdy raw boat.', price: '$200/Day', available: true }, { name: 'Boat 2', image: 'Raw2.jpeg', description: 'Raw boat designed for durability.', price: '$250/Day', available: true } ] },
];

const Categories = () => {
    const [expandedCategory, setExpandedCategory] = useState(null);
    const navigate = useNavigate(); // Initialize navigation
    const { user } = useUserAuth(); // Get user from context
    const [errorMessage, setErrorMessage] = useState(''); // For showing login error

    const handleViewClick = (categoryName) => {
        setExpandedCategory(expandedCategory === categoryName ? null : categoryName);
    };

    const handleNavigateToBooking = (boat) => {
        if (!user) {
            // If the user is not logged in, set error message
            setErrorMessage('You need to Login First');
            return;
        }
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
            {errorMessage && (
                <p className="error-message" style={{ color: 'red', marginTop: '20px' }}>
                    {errorMessage}
                </p>
            )}
        </section>
    );
};

export default Categories;
