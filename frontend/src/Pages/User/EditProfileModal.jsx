import React from "react";

const EditProfileModal = ({ isOpen, onClose }) => {
  return (
    <div className={`modal ${isOpen ? "is-active" : ""}`}>
      <div className="modal-background" onClick={onClose}></div>
      <div className="modal-content">
        {/* Your modal content goes here */}
        <div className="box">
          <p>Edit your profile here</p>
          {/* Add your form fields for profile editing */}
        </div>
      </div>
      <button className="modal-close is-large" aria-label="close" onClick={onClose}></button>
    </div>
  );
};

export default EditProfileModal;
