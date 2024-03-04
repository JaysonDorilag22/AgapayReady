import React, { useState} from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';


const EmergencyReportForm = () => {
  const { currentUser } = useSelector((state) => state.user);
 console.log(currentUser._id)
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

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
    try {
      const formData = new FormData();
      formData.append('location', location);
      formData.append('description', description);
      if (image) {
        formData.append('image', image);
      }
      formData.append('userId', currentUser._id);
  
      await axios.post('/api/v1/report', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      setLocation('');
      setDescription('');
      setImage(null);
      toast.success('Emergency report sent successfully!');
    } catch (error) {
      console.error('Error submitting emergency report:', error);
      toast.error('Failed to submit emergency report');
    }
  };
  


  return (
    <div className="max-w-md mx-auto mt-8 bg-slate-200 p-5 rounded-md shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Emergency Report Form</h2>
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
            onChange={handleImageChange}
            accept="image/*"
            className="w-full"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-red-500 text-white font-bold py-2 rounded-md transition duration-300 hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default EmergencyReportForm;
