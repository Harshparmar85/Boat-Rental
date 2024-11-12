import React, { useState } from 'react';
import Footer from './Footer';

const categories = [
    { name: 'Yacht', image: 'Yacht.jpg', boats: [ { name: 'Luxurberg', image: 'Y1.jpg', description: 'Luxury yacht with all amenities.', price: '$700/Day', available: true }, { name: 'Indu', image: 'Yacht2.jpg', description: 'Elegant yacht with spacious decks.', price: '$1000/Day', available: false } ] },
    { name: 'Motor Boat', image: 'Motor boat.jpg', boats: [ { name: 'Vintage Cabin', image: 'M1.jpeg', description: 'High-speed motor boat for adventures.', price: '$300/Day', available: true }, { name: 'Monster', image: 'M2.jpeg', description: 'Motor boat with modern design.', price: '$400/Day', available: false } ] },

    { name: 'Racing Boat', image: 'racing boat.jpg', boats: [ { name: 'F1', image: 'R1.jpg', description: 'Speedy racing boat for competitive use.', price: '$600/Day', available: false }, { name: 'Hydro', image: 'R2.jpg', description: 'Lightweight racing boat for speed.', price: '$500/Day', available: true } ] },
    { name: 'Raw Boat', image: 'raw boat.jpg', boats: [ { name: 'boat 1', image: 'Raw1.jpeg', description: 'Simple and sturdy raw boat.', price: '$200/Day', available: true }, { name: 'Boat 2', image: 'Raw2.jpeg', description: 'Raw boat designed for durability.', price: '$250/Day', available: false } ] },
];

const Categories = () => {
    const [expandedCategory, setExpandedCategory] = useState(null);

    const handleViewClick = (categoryName) => {
        setExpandedCategory(expandedCategory === categoryName ? null : categoryName);
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

                        {/* Expanded view for boats in the selected category */}
                        {expandedCategory === category.name && (
                            <div className="boats-list">
                                {category.boats.map((boat, index) => (
                                    <div key={index} className="boat-card">
                                        <img src={boat.image} alt={boat.name} />
                                        <h4>{boat.name}</h4>
                                        <p>{boat.description}</p>
                                        <p className={boat.available ? 'available' : 'not-available'}>
                                            {boat.available ? 'Available' : 'Not Available'}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
            {/* Move Footer outside of the .categories-grid */}
            <Footer />
        </section>
    );
};

export default Categories;
