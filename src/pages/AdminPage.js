import React, { useEffect, useState } from "react";
import { collection, getDocs, updateDoc, doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";
import "../css/AdminP.css";

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsersAndBookings = async () => {
      try {
        // Fetch users
        const usersCollection = collection(db, "users");
        const userSnapshot = await getDocs(usersCollection);
        const usersList = userSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(usersList);

        // Fetch bookings
        const bookingsCollection = collection(db, "bookings");
        const bookingSnapshot = await getDocs(bookingsCollection);
        const bookingsList = bookingSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBookings(bookingsList);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load data.");
      }
    };

    fetchUsersAndBookings();
  }, []);

  const toggleAccountStatus = async (userId, currentStatus) => {
    try {
      const newStatus = currentStatus === "active" ? "disabled" : "active";
      const userDoc = doc(db, "users", userId);
      await updateDoc(userDoc, { accountStatus: newStatus });
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, accountStatus: newStatus } : user
        )
      );
    } catch (err) {
      console.error("Error updating account status:", err);
      setError("Failed to update account status.");
    }
  };

  const deleteAccount = async (userId) => {
    try {
      const userDoc = doc(db, "users", userId);
      await deleteDoc(userDoc);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    } catch (err) {
      console.error("Error deleting account:", err);
      setError("Failed to delete account.");
    }
  };

  return (
    <div>
      <h1>Admin Page</h1>
      {error && <p>{error}</p>}

      {/* User Management */}
      {users.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>
                  {user.firstName} {user.lastName}
                </td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{user.accountStatus || "active"}</td>
                <td>{user.address || "Not Provided"}</td> {/* Display the address */}
                <td>
                  <button
                    onClick={() =>
                      toggleAccountStatus(user.id, user.accountStatus || "active")
                    }
                  >
                    {user.accountStatus === "disabled"
                      ? "Enable Account"
                      : "Disable Account"}
                  </button>
                  <button onClick={() => deleteAccount(user.id)}>Delete Account</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        !error && <p>Loading users...</p>
      )}

      {/* Booking History */}
      <h2>Booking History</h2>
      {bookings.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>User Email</th>
              <th>Customer Name</th>
              <th>Boat Name</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Price Per Day</th>
              <th>Total Price</th>
              <th>Payment Status</th>
              <th>Card Number</th>
              <th>Contact Number</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => {
              const user = users.find((user) => user.id === booking.userId);
              return (
                <tr key={booking.id}>
                  <td>{user ? user.email : "Unknown User"}</td>
                  <td>{booking.customerName || "N/A"}</td> {/* Display customer name */}
                  <td>{booking.boatName || "N/A"}</td> {/* Display boat name */}
                  <td>{booking.startDate || "N/A"}</td> {/* Display start date */}
                  <td>{booking.endDate || "N/A"}</td> {/* Display end date */}
                  <td>{booking.pricePerDay || "N/A"}</td> {/* Display price per day */}
                  <td>{booking.totalPrice || "N/A"}</td> {/* Display total price */}
                  <td>{booking.paymentStatus || "Pending"}</td> {/* Display payment status */}
                  <td>{booking.cardNumber || "N/A"}</td> {/* Display card number */}
                  <td>{booking.contactNumber || "N/A"}</td> {/* Display contact number */}
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        !error && <p>Loading booking history...</p>
      )}
    </div>
  );
};

export default AdminPage;
