import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { db, auth } from '../firebase'; // Import Firebase config
import { doc, collection, addDoc } from 'firebase/firestore';
import { QRCodeCanvas } from 'qrcode.react'; // Use named import
import "../css/PaymentPage.css";

const PaymentPage = () => {
    const { state } = useLocation(); // Get booking details from navigation state
    const navigate = useNavigate();
    const bookingDetails = state?.bookingDetails;

    const [cardNumber, setCardNumber] = useState('');
    const [cvv, setCvv] = useState('');
    const [expiryMonth, setExpiryMonth] = useState('');
    const [expiryYear, setExpiryYear] = useState('');
    const [cardName, setCardName] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const currentYear = new Date().getFullYear();

    const handlePayment = async (e) => {
        e.preventDefault();

        // Validation for card number (16 digits, numeric only)
        if (!/^\d{16}$/.test(cardNumber)) {
            setError('Card number must be exactly 16 digits.');
            return;
        }

        // Validation for CVV (3 or 4 digits, numeric only)
        if (!/^\d{3,4}$/.test(cvv)) {
            setError('CVV must be 3 or 4 digits.');
            return;
        }

        // Validation for expiry month (valid number between 1-12)
        if (!/^(0?[1-9]|1[0-2])$/.test(expiryMonth)) {
            setError('Expiry month must be a valid month (1-12).');
            return;
        }

        // Validation for expiry year (current year or greater)
        if (!/^\d{4}$/.test(expiryYear) || parseInt(expiryYear) < currentYear) {
            setError('Expiry year must be the current year or later.');
            return;
        }

        // Validation for cardholder name (non-empty, no special characters)
        if (!/^[a-zA-Z\s]+$/.test(cardName)) {
            setError('Name on card must contain only letters and spaces.');
            return;
        }

        setError(''); // Clear any existing error

        const user = auth.currentUser;
        if (!user) {
            setError('You must be logged in to complete the payment.');
            navigate('/login'); // Redirect to login if not logged in
            return;
        }

        // Save booking with payment status
        const paymentDetails = {
            ...bookingDetails,
            cardNumber: `**** **** **** ${cardNumber.slice(-4)}`, // Mask card number
            cardName,
            paymentStatus: 'Completed',
        };

        setLoading(true);
        try {
            const userRef = doc(db, 'users', user.uid);
            const bookingsRef = collection(userRef, 'Bookings');
            await addDoc(bookingsRef, paymentDetails);

            alert('Payment successful! Your booking is confirmed.');
            navigate('/categories'); // Redirect to categories after successful payment
        } catch (err) {
            console.error('Error saving payment details:', err);
            setError('Payment failed. Please try again.');
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
                    <p><strong>Total:</strong> {bookingDetails.price}</p>
                    {/* QR Code */}
                    <div className="qr-code">
                        <QRCodeCanvas
                            value={`Payment for ${bookingDetails.boatName} - ${bookingDetails.price}`}
                            size={128}
                        />
                        <p>Scan to pay</p>
                    </div>
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
                                type="text"
                                value={cvv}
                                onChange={(e) => setCvv(e.target.value)}
                                placeholder="CVV"
                                maxLength={4}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Name on Card</label>
                            <input
                                type="text"
                                value={cardName}
                                onChange={(e) => setCardName(e.target.value)}
                                placeholder="Name on Card"
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
