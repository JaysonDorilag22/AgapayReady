// ToastNotification.js

import React, { useState, useEffect } from "react";
import { RiAlarmWarningLine, RiCloseCircleLine } from 'react-icons/ri';

const ToastNotification = ({ newReport }) => {
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (newReport) {
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 5000); // Hide the toast after 5 seconds
    }
  }, [newReport]);

  return (
    <div className={`fixed top-4 left-4 right-4 p-4 bg-red-500 text-white rounded-md transition-opacity duration-300 ${showToast ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className="flex items-center">
        <img src="http://localhost:5173/src/assets/services/AgapayReadylogo.png" alt="Agapay Ready Logo" className="h-8 w-8 mr-2" />
        <div className="flex-1">
          <p className="font-semibold">New Emergency Report:</p>
          <p className="text-sm">{newReport?.location} - {newReport?.description}</p>
        </div>
        <button onClick={() => setShowToast(false)} className="focus:outline-none">
          <RiCloseCircleLine size={24} />
        </button>
      </div>
    </div>
  );
};

export default ToastNotification;
