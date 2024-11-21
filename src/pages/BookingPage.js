import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // To get boat details and navigate
import { auth, db } from '../firebase'; // Import Firebase configuration
import { doc, collection, addDoc } from 'firebase/firestore';
import "../css/BookingPage.css";

const BookingPage = () => {
    const { state } = useLocation(); // Get boat details from navigation state
    const boat = state?.boat; // Ensure boat details are passed
    const navigate = useNavigate();

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [customerName, setCustomerName] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleBooking = async (e) => {
        e.preventDefault();

        if (!startDate || !endDate || !customerName || !contactNumber) {
            setError('Please fill in all required fields.');
            return;
        }

        const user = auth.currentUser;
        if (!user) {
            setError('You must be logged in to book a boat.');
            navigate('/login'); // Redirect to login if not logged in
            return;
        }

        const bookingDetails = {
            boatName: boat.name,
            price: boat.price,
            startDate,
            endDate,
            customerName,
            contactNumber,
            userEmail: user.email,
            userName: user.displayName || 'Anonymous',
            status: 'Pending',
        };

        setLoading(true);
        try {
            const userRef = doc(db, 'users', user.uid);
            const bookingsRef = collection(userRef, 'Bookings');
            await addDoc(bookingsRef, bookingDetails);

            alert(`Booking confirmed for ${boat.name}!`);
            navigate('/categories'); // Redirect to categories after successful booking
        } catch (err) {
            console.error('Error saving booking:', err);
            setError('Failed to save booking. Please try again.');
        } finally {
            setLoading(false);
        }
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
            <form onSubmit={handleBooking}>
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
                <button type="submit" disabled={loading}>
                    {loading ? 'Processing...' : 'Submit'}
                </button>
            </form>
        </div>
    );
};

export default BookingPage;
