// EditProfileModal.jsx
import React from "react";

const EditProfileModal = ({ userData, setIsModalOpen, handleInputChange, handleFileChange, handleSubmit }) => {
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50 rounded-md p-10">
      <div className="bg-white p-8 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Edit Profile</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="firstname" className="block text-gray-700">First Name</label>
            <input type="text" id="firstname" name="firstname" defaultValue={userData.firstname} onChange={handleInputChange} className="form-input mt-1 block w-full" />
          </div>
          <div className="mb-4">
            <label htmlFor="lastname" className="block text-gray-700">Last Name</label>
            <input type="text" id="lastname" name="lastname" defaultValue={userData.lastname} onChange={handleInputChange} className="form-input mt-1 block w-full" />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">Email</label>
            <input type="email" id="email" name="email" defaultValue={userData.email} onChange={handleInputChange} className="form-input mt-1 block w-full" />
          </div>
          <div className="mb-4">
            <label htmlFor="phoneNumber" className="block text-gray-700">Phone Number</label>
            <input type="text" id="phoneNumber" name="phoneNumber" defaultValue={userData.phoneNumber} onChange={handleInputChange} className="form-input mt-1 block w-full" />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">Password</label>
            <input type="password" id="password" name="password" defaultValue={userData.password} onChange={handleInputChange} className="form-input mt-1 block w-full" />
          </div>
          {/* Add other input fields as needed */}
          <div className="mt-6 flex justify-end">
            <button type="button" onClick={handleCloseModal} className="mr-4 py-2 px-4 rounded bg-gray-300 hover:bg-gray-400">Cancel</button>
            <button type="submit" className="py-2 px-4 rounded bg-blue-500 text-white hover:bg-blue-600">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;
