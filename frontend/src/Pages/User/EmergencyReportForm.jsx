import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const EmergencyReportForm = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false); // State for loading
  const [submitSuccess, setSubmitSuccess] = useState(false); // State for submission success

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!currentUser || !currentUser._id) {
        throw new Error('User information not available');
      }
      const formData = new FormData();
      formData.append('location', location);
      formData.append('description', description);
      if (image) {
        formData.append('image', image);
      }
      formData.append('userId', currentUser._id);
      
      await axios.post(`/api/v1/report`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      setSubmitSuccess(true);
      // Reset form fields after successful submission
      setLocation('');
      setDescription('');
      setImage(null);
      // Reset form submission success state after 3 seconds
      e.target.reset();
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('Error submitting emergency report:', error);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto mt-8 bg-white p-5 rounded-md shadow-lg outline outline-1 outline-slate-400">
       <h2 className="title-font mb-1 text-lg font-medium text-gray-900">Report Form</h2>
       <p className="mb-5 leading-relaxed text-gray-600">Use this form to report emergencies and get immediate assistance. Your safety is our priority.</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Location</label>
          <input
            type="text"
            value={location}
            onChange={handleLocationChange}
            placeholder="Location"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-slate-500"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            value={description}
            onChange={handleDescriptionChange}
            placeholder="Description"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-slate-500"
            rows="4"
          ></textarea>
        </div>
        <div>
          <label className="block mb-1 font-medium">Image</label>
          <input
            type="file"
            onChange={handleImageChange}
            accept="image/*"
            className=" file-input file-input-bordered file-input-sm w-full max-w-xs"
          />
        </div>
        <button
          type="submit"
          className={`w-full font-bold py-2 rounded-md transition duration-300 ${
            submitSuccess ? 'bg-green-500 text-white hover:bg-green-600' : 'bg-red-500 text-white hover:bg-slate-600'
          }`}
          disabled={loading}
        >
          {loading ? 'Submitting...' : (submitSuccess ? 'Submitted' : 'Submit Report')}
        </button>
      </form>
    </div>
  );
};

export default EmergencyReportForm;
