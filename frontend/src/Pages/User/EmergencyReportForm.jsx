import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EmergencyReportForm = () => {
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null); // State to store the selected image file

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]); // Capture the selected image file
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData(); // Create a FormData object
      formData.append('location', location);
      formData.append('description', description);
      formData.append('image', image); // Append the selected image file

      await axios.post('/api/v1/report', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Set content type to multipart/form-data for file upload
        },
      });
      setLocation('');
      setDescription('');
      setImage(null); // Reset the selected image
      toast.success('Emergency report sent successfully!');
    } catch (error) {
      console.error('Error submitting emergency report:', error);
      toast.error('Failed to submit emergency report');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Emergency Report Form</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Location</label>
          <input
            type="text"
            value={location}
            onChange={handleLocationChange}
            placeholder="Location"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            value={description}
            onChange={handleDescriptionChange}
            placeholder="Description"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            rows="4"
          ></textarea>
        </div>
        <div>
          <label className="block mb-1 font-medium">Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="border rounded-md p-2"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-bold py-2 rounded-md transition duration-300 hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default EmergencyReportForm;
