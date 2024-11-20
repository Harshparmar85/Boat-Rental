
import React from 'react';
import { useNotification } from '../context/NotificationContext';


const NotificationsDisplay = () => {
  const { notifications } = useNotification();

  return (
    <div className="notifications">
      {notifications.map((notification, index) => (
        <div key={index} className="notification">
          {notification}
        </div>
      ))}
    </div>
  );
};

export default NotificationsDisplay;
