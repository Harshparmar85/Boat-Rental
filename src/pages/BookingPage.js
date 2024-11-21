import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // To get boat details and navigate
import { useUserAuth } from "../context/UserAuthContext"; // Import authentication context
import "../css/BookingPage.css";

const BookingPage = () => {
    const { state } = useLocation(); // Get boat details from navigation state
    const boat = state?.boat; // Ensure boat details are passed
    const navigate = useNavigate();
    const { user } = useUserAuth(); // Get the current user from the authentication context

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [customerName, setCustomerName] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [error, setError] = useState('');

    const handleProceedToPayment = (e) => {
        e.preventDefault();

        if (!user) {
            setError('You must log in first to book a boat.');
            return;
        }

        if (!startDate || !endDate || !customerName || !contactNumber) {
            setError('Please fill in all required fields.');
            return;
        }

        // Prepare booking details
        const bookingDetails = {
            boatName: boat.name,
            price: boat.price,
            startDate,
            endDate,
            customerName,
            contactNumber,
        };

        // Navigate to PaymentPage and pass booking details
        navigate('/payment', { state: { bookingDetails } });
    };

    if (!boat) {
        return <p>No boat selected. Please go back and select a boat.</p>;
    }

    return (
        <div className="booking-page">
            <h1>Booking</h1>
            <img src={boat.image} alt={boat.name} />
            <h2>{boat.name}</h2>
            <p>Price per day: {boat.price}</p>
            <form onSubmit={handleProceedToPayment}>
                {error && <p className="error-message">{error}</p>}
                <div>
                    <label>Start Date:</label>
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>End Date:</label>
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Customer Name:</label>
                    <input
                        type="text"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="Enter your name"
                        required
                    />
                </div>
                <div>
                    <label>Contact Number:</label>
                    <input
                        type="text"
                        value={contactNumber}
                        onChange={(e) => setContactNumber(e.target.value)}
                        placeholder="Enter your contact number"
                        required
                    />
                </div>
                <button type="submit">Proceed to Payment</button>
            </form>
        </div>
    );
};

export default BookingPage;
