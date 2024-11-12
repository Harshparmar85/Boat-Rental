import React, { useEffect, useState } from 'react';
import { auth, firestore } from './firebase';
import { useNavigate } from 'react-router-dom';


const AdminDashboard = () => {
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserRole = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDoc = await firestore.collection('users').doc(user.uid).get();
        setUserRole(userDoc.data().role);
      }
    };

    fetchUserRole();
  }, []);

  if (userRole !== 'admin') {
    return <p>Access Denied</p>;
  }

  return (
    <div>
      <h1>Welcome To </h1>
      <h2>Admin Dashboard</h2>
      <nav>
        <button onClick={() => navigate('/boat-owners')}>Boat Owners</button>
        <button onClick={() => navigate('/customers')}>Customers</button>
        <button onClick={() => navigate('/reviews')}>Customer Reviews</button>
      </nav>
    </div>
  );
};

export default AdminDashboard;
