import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { db, auth } from '../firebase'; // Firebase config
import { doc, collection, addDoc } from 'firebase/firestore';
import "../css/PaymentPage.css";

const PaymentPage = () => {
    const { state } = useLocation(); // Get booking details from navigation state
    const navigate = useNavigate();
    const bookingDetails = state?.bookingDetails;

    const [cardNumber, setCardNumber] = useState('');
    const [cvv, setCvv] = useState('');
    const [expiryMonth, setExpiryMonth] = useState('');
    const [expiryYear, setExpiryYear] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const currentYear = new Date().getFullYear();

    const handlePayment = async (e) => {
        e.preventDefault();

        // Input Validation
        if (!/^\d{16}$/.test(cardNumber)) {
            setError("Card number must be exactly 16 digits.");
            return;
        }
        if (!/^\d{3,4}$/.test(cvv)) {
            setError("CVV must be 3 or 4 digits.");
            return;
        }
        const expiryDate = new Date(parseInt(expiryYear), parseInt(expiryMonth) - 1);
        if (expiryDate < new Date()) {
            setError("The expiry date must be in the future.");
            return;
        }

        setError(''); // Clear any previous error

        const user = auth.currentUser;
        if (!user) {
            setError("You must be logged in to complete the payment.");
            navigate('/login');
            return;
        }

        // Prepare booking details to save in Firestore
        const bookingData = {
            ...bookingDetails,
            cardNumber: `**** **** **** ${cardNumber.slice(-4)}`, // Masked card number
            paymentStatus: "Completed",
        };

        setLoading(true);
        try {
            const userRef = doc(db, "users", user.uid); // Reference to current user document
            const bookingsRef = collection(userRef, "Bookings"); // Sub-collection "Bookings"
            await addDoc(bookingsRef, bookingData); // Save booking data

            alert("Payment successful! Your booking is confirmed.");
            navigate("/categories"); // Redirect after successful payment
        } catch (err) {
            console.error("Error saving booking details:", err.message); // Log error
            setError("Payment failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (!bookingDetails) {
        return <p>No booking details found. Please start your booking again.</p>;
    }

    return (
        <div className="payment-page">
            <h1>Payment Details</h1>
            <div className="payment-container">
                {/* Order Summary */}
                <div className="order-summary">
                    <h2>Order Summary</h2>
                    <p><strong>Item Name:</strong> {bookingDetails.boatName}</p>
                    <p><strong>Total:</strong> {bookingDetails.totalPrice}</p>
                </div>

                {/* Payment Information */}
                <div className="payment-information">
                    <h2>Payment Information</h2>
                    <form onSubmit={handlePayment}>
                        {error && <p className="error-message">{error}</p>}
                        <div className="form-group">
                            <label>Card Number</label>
                            <input
                                type="text"
                                value={cardNumber}
                                onChange={(e) => setCardNumber(e.target.value)}
                                placeholder="Enter card number"
                                maxLength={16}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Expiry Date</label>
                            <div className="expiry-date">
                                <select
                                    value={expiryMonth}
                                    onChange={(e) => setExpiryMonth(e.target.value)}
                                    required
                                >
                                    <option value="">Month</option>
                                    {[...Array(12)].map((_, i) => (
                                        <option key={i + 1} value={i + 1}>
                                            {i + 1}
                                        </option>
                                    ))}
                                </select>
                                <select
                                    value={expiryYear}
                                    onChange={(e) => setExpiryYear(e.target.value)}
                                    required
                                >
                                    <option value="">Year</option>
                                    {[...Array(10)].map((_, i) => (
                                        <option key={i} value={currentYear + i}>
                                            {currentYear + i}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="form-group">
                            <label>CVV</label>
                            <input
                                type="password"
                                value={cvv}
                                onChange={(e) => setCvv(e.target.value)}
                                placeholder="CVV"
                                maxLength={4}
                                required
                            />
                        </div>
                        <button type="submit" className="pay-button" disabled={loading}>
                            {loading ? 'Processing...' : 'Pay'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PaymentPage;
