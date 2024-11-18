import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import { doc, getDoc } from "firebase/firestore";

const OwnersDashboard = () => {
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserRole = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDocRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          setUserRole(userDoc.data().role);
        } else {
          console.log("No such document!");
        }
      }
    };

    fetchUserRole();
  }, []);

  if (userRole !== 'BoatOwners') {
    return <p style={{ color: 'red', fontSize: '20px', textAlign: 'center' }}>Access Denied</p>;
  }

  return (
    <div style={styles.dashboardContainer}>
      <div style={styles.overlay}>
        <h1 style={styles.title}>Welcome To</h1>
        <h2 style={styles.subtitle}>Owners Dashboard</h2>
        <nav style={styles.nav}>
          <button style={styles.button} onClick={() => navigate('/boat-ower')}>Boat Owners</button>
          <button style={styles.button} onClick={() => navigate('/customers')}>Customers</button>
          <button style={styles.button} onClick={() => navigate('/reviews')}>Customer Reviews</button>
        </nav>
      </div>
    </div>
  );
};

// Inline styles for better visual appeal
const styles = {
  dashboardContainer: {
    backgroundImage: 'url("https://example.com/your-background-image.jpg")', // Replace with your image URL
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    textAlign: 'center',
    position: 'relative',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Semi-transparent overlay
    padding: '40px',
    borderRadius: '10px',
  },
  title: {
    fontSize: '36px',
    marginBottom: '10px',
  },
  subtitle: {
    fontSize: '28px',
    fontWeight: '300',
    marginBottom: '20px',
  },
  nav: {
    display: 'flex',
    gap: '15px',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#333',
    color: '#fff',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s',
  },
  buttonHover: {
    backgroundColor: '#555',
  }
};

export default OwnersDashboard;
