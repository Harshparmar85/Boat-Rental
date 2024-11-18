// src/components/BoatUpdate.js
import React, { useState, useEffect } from 'react';

const BoatUpdate = ({ boat, onUpdateBoat }) => {
  const [boatDetails, setBoatDetails] = useState(boat);

  useEffect(() => {
    setBoatDetails(boat);
  }, [boat]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBoatDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handleImageChange = (e) => {
    setBoatDetails((prevDetails) => ({ ...prevDetails, image: e.target.files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateBoat(boatDetails);
  };

  return (
    <div className="boat-update">
      <h2>Update Boat Details</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={boatDetails.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="price"
          value={boatDetails.price}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          value={boatDetails.description}
          onChange={handleChange}
          required
        ></textarea>
        <input type="file" name="image" onChange={handleImageChange} />
        <button type="submit">Update Boat</button>
      </form>
    </div>
  );
};

export default BoatUpdate;
