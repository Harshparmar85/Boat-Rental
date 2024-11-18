// src/context/NotificationContext.js

import React, { createContext, useState, useContext, useEffect } from 'react';



const NotificationContext = createContext();

// Custom hook to use the NotificationContext
export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotification must be used within a NotificationProvider");
  }
  return context;
};

const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  // Function to add a new notification
  const addNotification = (message) => {
    setNotifications((prev) => [...prev, message]);
    // Automatically remove the notification after 3 seconds
    setTimeout(() => {
      setNotifications((prev) => prev.slice(1));
    }, 3000);
  };

  return (
    <NotificationContext.Provider value={{ notifications, addNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};

export { NotificationProvider };
export default NotificationProvider;
