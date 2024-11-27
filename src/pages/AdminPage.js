import React, { useState, useEffect } from "react";
import { db } from "../firebase"; // Import Firestore
import { collection, getDocs, query, where } from "firebase/firestore"; // Import Firestore functions
import "../css/AdminPage.css";

const AdminPage = () => {
  const [boatOwners, setBoatOwners] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        
        // Fetch Boat Owners
        const boatOwnersQuery = query(collection(db, "users"), where("role", "==", "boatowner"));
        const boatOwnersSnapshot = await getDocs(boatOwnersQuery);
        const boatOwnersData = boatOwnersSnapshot.docs.map(doc => doc.data());
        setBoatOwners(boatOwnersData);
        
        // Fetch Customers
        const customersQuery = query(collection(db, "users"), where("role", "==", "customer"));
        const customersSnapshot = await getDocs(customersQuery);
        const customersData = customersSnapshot.docs.map(doc => doc.data());
        setCustomers(customersData);
        
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load data.");
        setLoading(false);
      }
    };

    fetchUsers();
  }, []); // Run this on component mount

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="admin-page">
      <h2>Admin Dashboard</h2>
      <div className="user-section">
        <h3>Boat Owners</h3>
        {boatOwners.length > 0 ? (
          <ul>
            {boatOwners.map((owner, index) => (
              <li key={index}>
                <strong>{owner.firstname} {owner.lastname}</strong><br />
                Email: {owner.email}<br />
                Contact: {owner.contactNumber}<br />
                Address: {owner.address}
              </li>
            ))}
          </ul>
        ) : (
          <p>No boat owners found.</p>
        )}
      </div>

      <div className="user-section">
        <h3>Customers</h3>
        {customers.length > 0 ? (
          <ul>
            {customers.map((customer, index) => (
              <li key={index}>
                <strong>{customer.firstname} {customer.lastname}</strong><br />
                Email: {customer.email}<br />
                Contact: {customer.contactNumber}<br />
                Address: {customer.address}
              </li>
            ))}
          </ul>
        ) : (
          <p>No customers found.</p>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
