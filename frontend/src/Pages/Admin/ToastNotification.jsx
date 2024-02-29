import React, { useState, useEffect } from "react";
import { RiCloseCircleLine } from 'react-icons/ri';

const ToastNotification = ({ newReport }) => {
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (newReport) {
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 5000); 
    }
  }, [newReport]);

  return (
    <div className={`fixed top-4 right-4 max-w-sm p-4 bg-red-500 text-white rounded-md transition-opacity duration-300 ${showToast ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className="flex justify-between items-center">
        <div>
          <p className="font-semibold">New Emergency Report:</p>
          <p className="text-sm">{newReport?.location} - {newReport?.description}</p>
        </div>
        <button onClick={() => setShowToast(false)} className="focus:outline-none">
          <RiCloseCircleLine size={24} />
        </button>
      </div>
      {/* Render the image */}
      {newReport && newReport.image && <img src={newReport.image} alt="Emergency Report" className="w-full h-auto mt-2" />}
    </div>
  );
};

export default ToastNotification;
