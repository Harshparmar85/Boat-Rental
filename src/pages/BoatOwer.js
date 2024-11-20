import React, { useState } from 'react';
import BoatListing from './BoatListing.js';
import BoatUpdate from './BoatUpdate.js';
import NotificationsDisplay from './NotificationsDisplay.js';
import { useNotification } from '../context/NotificationContext';
import Footer from './Footer.js'; // 
import styles from './App.css';


const AppContent = () => {
  const [boats, setBoats] = useState([]);
  const [selectedBoat, setSelectedBoat] = useState(null);
  const { addNotification } = useNotification();

  const handleAddBoat = (newBoat) => {
    setBoats((prevBoats) => [...prevBoats, newBoat]);
    addNotification('New boat listed successfully!');
  };

  const handleUpdateBoat = (updatedBoat) => {
    setBoats((prevBoats) =>
      prevBoats.map((boat) => (boat.name === updatedBoat.name ? updatedBoat : boat))
    );
    addNotification('Boat details updated successfully!');
  };

  const handleBookBoat = (boat) => {
    addNotification(`${boat.name} has been booked.`);
  };

  return (
    <div className="App">
    

      <main className="container">
        <h1>Auckland Boat Rental</h1>
        <BoatListing onAddBoat={handleAddBoat} />
        {selectedBoat && <BoatUpdate boat={selectedBoat} onUpdateBoat={handleUpdateBoat} />}
        <NotificationsDisplay />

        <div className="boat-listing">
          {boats.map((boat) => (
            <div key={boat.name} className="boat-card">
              <img src={boat.image ? URL.createObjectURL(boat.image) : ''} alt={boat.name} />
              <h3>{boat.name}</h3>
              <p>{boat.description}</p>
              <p>{boat.price}</p>
              <button onClick={() => handleBookBoat(boat)}>Book Boat</button>
              <button onClick={() => setSelectedBoat(boat)}>Update</button>
            </div>
          ))}
        </div>
      </main>

      <Footer /> {/* Footer at the bottom */}
    </div>

  );
};

export default AppContent;
