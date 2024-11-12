import React from "react";

const About = () => {
  return (
    <div style={styles.container}>
      <div style={styles.overlay}>
        <h1 style={styles.heading}>About Auckland Boat Rentals</h1>
        <p style={styles.paragraph}>
          Welcome to Auckland Boat Rentals! We are passionate about helping you experience Auckland’s beautiful waterfront. 
          Whether you want to explore the Hauraki Gulf, enjoy a day on Waitematā Harbour, or try a new water activity, we have 
          the perfect boat for you.
        </p>
        
        <h2 style={styles.subheading}>Our Mission</h2>
        <p style={styles.paragraph}>
          Our mission is to provide high-quality boat rentals for an unforgettable experience on the water. With well-maintained 
          boats and excellent customer service, we offer flexible rental options to suit every need.
        </p>
        
        <h2 style={styles.subheading}>Our Fleet</h2>
        <p style={styles.paragraph}>
          From sleek motorboats to luxurious yachts, our fleet offers a range of options for every type of adventure. All boats 
          are equipped with modern amenities and are regularly serviced to ensure top safety and comfort.
        </p>
        
        <h2 style={styles.subheading}>Why Choose Us?</h2>
        <ul style={styles.list}>
          <li>Wide Selection: Boats for every occasion and adventure.</li>
          <li>Safety First: Regularly maintained for the best standards.</li>
          <li>Easy Booking: Simple online booking system.</li>
          <li>Local Expertise: We know Auckland’s waterways and can help plan your route.</li>
        </ul>
        
        <h2 style={styles.subheading}>Contact Us</h2>
        <p style={styles.paragraph}>
          Got questions? Contact us at <a href="mailto:info@aucklandboatrentals.co.nz">info@aucklandboatrentals.co.nz</a> or call us at (123) 456-7890.
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundImage: `url('/path/to/your/background-image.jpg')`, // Change this to the actual path of your image
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: "relative",
    padding: "50px 20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent overlay for readability
    padding: "40px",
    borderRadius: "8px",
    color: "#fff",
    maxWidth: "800px",
    textAlign: "center",
  },
  heading: {
    fontSize: "2.5em",
    marginBottom: "20px",
    color: "#fff",
  },
  subheading: {
    fontSize: "1.8em",
    marginTop: "20px",
    marginBottom: "10px",
    color: "#fff",
  },
  paragraph: {
    fontSize: "1.1em",
    lineHeight: "1.8",
    marginBottom: "15px",
    color: "#f0f0f0",
  },
  list: {
    paddingLeft: "20px",
    fontSize: "1.1em",
    lineHeight: "1.8",
    color: "#f0f0f0",
    textAlign: "left",
    listStyleType: "disc",
  },
};

export default About;
