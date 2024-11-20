
import React, { useState } from 'react';
import "../css/BoatListing.css";
const BoatListing = ({ onAddBoat }) => {
  const [boatDetails, setBoatDetails] = useState({
    name: '',
    price: '',
    description: '',
    image: null,
  });

  const [boats, setBoats] = useState([]); // List of all boats
  const [selectedBoat, setSelectedBoat] = useState(null); // Selected boat for viewing details

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBoatDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handleImageChange = (e) => {
    setBoatDetails((prevDetails) => ({ ...prevDetails, image: e.target.files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddBoat(boatDetails);
    setBoats((prevBoats) => [...prevBoats, boatDetails]); // Add boat to the list
    setBoatDetails({
      name: '',
      price: '',
      description: '',
      image: null,
    });
  };

  const handleSelectBoat = (boat) => {
    setSelectedBoat(boat); // Set the selected boat for viewing details
  };

  const handleCloseDetails = () => {
    setSelectedBoat(null); // Close the details view
  };

  return (
    <div className="boat-listing">
      <h2>List Your Boat</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Boat Name"
          value={boatDetails.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="price"
          placeholder="Price per Day"
          value={boatDetails.price}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Boat Description"
          value={boatDetails.description}
          onChange={handleChange}
          required
        ></textarea>
        <input type="file" name="image" onChange={handleImageChange} required />
        <button type="submit">Add Boat</button>
      </form>

      <h3>Available Boats</h3>
      <div className="boat-list">
        {boats.map((boat, index) => (
          <div key={index} className="boat-card" onClick={() => handleSelectBoat(boat)}>
            <h3>{boat.name}</h3>
            <p>Price: {boat.price}</p>
          </div>
        ))}
      </div>

      {selectedBoat && (
        <div className="boat-details-modal">
          <div className="modal-content">
            <button onClick={handleCloseDetails}>Close</button>
            <h2>{selectedBoat.name}</h2>
            <p>{selectedBoat.description}</p>
            <p>Price: {selectedBoat.price}</p>
            <button onClick={() => alert("Booking confirmed!")}>Book Now</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BoatListing;
