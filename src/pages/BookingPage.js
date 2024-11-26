import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useUserAuth } from "../context/UserAuthContext";
import "../css/BookingPage.css";

const BookingPage = () => {
    const { state } = useLocation();
    const boat = state?.boat;
    const navigate = useNavigate();
    const { user } = useUserAuth();

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [customerName, setCustomerName] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [error, setError] = useState('');
    const [totalPrice, setTotalPrice] = useState(0);

    const calculatePrice = () => {
        if (startDate && endDate && boat?.price) {
            const start = new Date(startDate);
            const end = new Date(endDate);

            if (start > end) {
                setError('End date must be after the start date.');
                setTotalPrice(0);
                return;
            }

            const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1; // Include both start and end days
            const pricePerDay = parseFloat(boat.price.replace(/\$/g, '')); // Remove "$" if included and parse
            const price = days * pricePerDay;

            if (!isNaN(price)) {
                setTotalPrice(price);
                setError('');
            } else {
                setError('Invalid price format in boat data.');
                setTotalPrice(0);
            }
        } else {
            setTotalPrice(0);
            setError('Please select valid dates.');
        }
    };

    useEffect(() => {
        calculatePrice();
    }, [startDate, endDate]); // Trigger calculation when dates change

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

        if (totalPrice <= 0) {
            setError('Invalid date range or price. Please select valid dates.');
            return;
        }

        const bookingDetails = {
            boatName: boat.name,
            pricePerDay: `$${boat.price}`, // Per-day price from boat data
            totalPrice: `$${totalPrice}`, // Calculated total price
            startDate,
            endDate,
            customerName,
            contactNumber,
        };

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
                <div>
                    <label>Total Price:</label>
                    <p>{totalPrice > 0 ? `$${totalPrice}` : 'Please select valid dates.'}</p>
                </div>
                <button type="submit">Proceed to Payment</button>
            </form>
        </div>
    );
};

export default BookingPage;
