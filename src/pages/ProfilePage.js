import React, { useEffect, useState, useCallback } from "react";
import { Container, Row, Col, Card, Button, Modal, Form, Spinner } from "react-bootstrap";
import { useUserAuth } from "../context/UserAuthContext";
import { db } from "../firebase";
import { doc, collection, getDocs, getDoc, updateDoc } from "firebase/firestore";
import "../css/ProfilePage.css";

const ProfilePage = () => {
  const { user } = useUserAuth();
  const [userDetails, setUserDetails] = useState({});
  const [bookingHistory, setBookingHistory] = useState([]);
  const [editingDetails, setEditingDetails] = useState({});
  const [showEditModal, setShowEditModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState("");

  // Fetch user details from Firestore
  const fetchUserDetails = useCallback(async () => {
    try {
      if (!user?.uid) {
        throw new Error("User not logged in.");
      }

      const userDoc = doc(db, "users", user.uid);
      const userSnap = await getDoc(userDoc);

      if (userSnap.exists()) {
        setUserDetails(userSnap.data());
        setEditingDetails(userSnap.data());
      } else {
        console.error("No user data found!");
        setUserDetails({});
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
      setError("Failed to fetch user details. Please try again.");
    }
  }, [user?.uid]);

  // Fetch booking history from Firestore
  const fetchBookingHistory = useCallback(async () => {
    try {
      if (!user?.uid) {
        throw new Error("User not logged in.");
      }

      const bookingsRef = collection(db, `users/${user.uid}/Bookings`);
      const querySnapshot = await getDocs(bookingsRef);

      const bookings = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setBookingHistory(bookings);
    } catch (error) {
      console.error("Error fetching booking history:", error);
      setError("Failed to fetch booking history. Please try again.");
    }
  }, [user?.uid]);

  // Update user details in Firestore
  const handleUpdateUserDetails = async () => {
    setUpdating(true);
    try {
      if (!editingDetails.firstName || !editingDetails.lastName || !editingDetails.address) {
        throw new Error("All fields are required.");
      }

      const userDoc = doc(db, "users", user.uid);
      await updateDoc(userDoc, editingDetails);

      setUserDetails(editingDetails); // Update state with new details
      setShowEditModal(false); // Close modal
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating user details:", error);
      alert("Failed to update profile. Please check your input.");
    } finally {
      setUpdating(false);
    }
  };

  // Fetch user details and booking history on component mount
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await fetchUserDetails();
      await fetchBookingHistory();
      setLoading(false);
    };
    fetchData();
  }, [user, fetchUserDetails, fetchBookingHistory]);

  if (loading) {
    return (
      <div className="loading-indicator">
        <Spinner animation="border" variant="primary" />
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <Container className="profile-container">
      <h1 className="text-center">Profile</h1>
      <Row>
        <Col xs={12} md={6}>
          <Card className="user-card">
            <Card.Body>
              <Card.Title>User Details</Card.Title>
              <Card.Text>
                <strong>First Name:</strong> {userDetails.firstname || "N/A"}
              </Card.Text>
              <Card.Text>
                <strong>Last Name:</strong> {userDetails.lastname || "N/A"}
              </Card.Text>
              <Card.Text>
                <strong>Email:</strong> {userDetails.email || "N/A"}
              </Card.Text>
              <Card.Text>
                <strong>Contact Number:</strong> {userDetails.contactNumber || "N/A"}
              </Card.Text>
              <Card.Text>
                <strong>Address:</strong> {userDetails.address || "N/A"}
              </Card.Text>
              <Button
                variant="primary"
                className="edit-profile-button"
                onClick={() => setShowEditModal(true)}
              >
                Edit Profile
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} md={6}>
          <Card className="history-card">
            <Card.Body>
              <Card.Title>Booking History</Card.Title>
              {bookingHistory.length > 0 ? (
                bookingHistory.map((booking) => (
                  <div key={booking.id} className="booking-item">
                    <p>
                      <strong>Boat Name:</strong> {booking.boatName}
                    </p>
                    <p>
                      <strong>Start Date:</strong> {new Date(booking.startDate).toLocaleDateString()}
                    </p>
                    <p>
                      <strong>End Date:</strong> {new Date(booking.endDate).toLocaleDateString()}
                    </p>
                    <p>
                      <strong>Total Price:</strong> {booking.totalPrice}
                    </p>
                    <p>
                      <strong>Payment Status:</strong> {booking.paymentStatus}
                    </p>
                  </div>
                ))
              ) : (
                <p>No bookings found.</p>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                value={editingDetails.firstname || ""}
                onChange={(e) =>
                  setEditingDetails({ ...editingDetails, firstName: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                value={editingDetails.lastname || ""}
                onChange={(e) =>
                  setEditingDetails({ ...editingDetails, lastName: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                value={editingDetails.address || ""}
                onChange={(e) =>
                  setEditingDetails({ ...editingDetails, address: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Contact Number</Form.Label>
              <Form.Control
                type="text"
                value={editingDetails.contactNumber || ""}
                onChange={(e) =>
                  setEditingDetails({ ...editingDetails, contactNumber: e.target.value })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleUpdateUserDetails} disabled={updating}>
            {updating ? "Saving..." : "Save Changes"}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ProfilePage;
