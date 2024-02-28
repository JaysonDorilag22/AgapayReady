import React, { useState} from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const EmergencyReportForm = () => {
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/v1/report', { location, description });
      setLocation('');
      setDescription('');
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

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { io } from 'socket.io-client';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const socket = io("http://localhost:4000"); // Establish Socket.IO connection

// const EmergencyReportForm = () => {
//   const [location, setLocation] = useState('');
//   const [description, setDescription] = useState('');

//   useEffect(() => {
//     const typingTimeout = setTimeout(() => {
//       // Emit event when typing stops
//       socket.emit('typing', { location, description });
//     }, 1000); // Adjust the timeout as needed

//     return () => clearTimeout(typingTimeout);
//   }, [location, description]);

//   const handleLocationChange = (e) => {
//     setLocation(e.target.value);
//   };

//   const handleDescriptionChange = (e) => {
//     setDescription(e.target.value);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post('/api/v1/report', { location, description });
//       setLocation('');
//       setDescription('');
//       // Show success toast
//       toast.success('Emergency report sent successfully!');
//     } catch (error) {
//       console.error('Error submitting emergency report:', error);
//       // Show error toast if submission fails
//       toast.error('Failed to submit emergency report');
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto mt-8">
//       <h2 className="text-2xl font-bold mb-4">Emergency Report Form</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="block mb-1 font-medium">Location</label>
//           <input
//             type="text"
//             value={location}
//             onChange={handleLocationChange}
//             placeholder="Location"
//             className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
//           />
//         </div>
//         <div>
//           <label className="block mb-1 font-medium">Description</label>
//           <textarea
//             value={description}
//             onChange={handleDescriptionChange}
//             placeholder="Description"
//             className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
//             rows="4"
//           ></textarea>
//         </div>
//         <button
//           type="submit"
//           className="w-full bg-blue-500 text-white font-bold py-2 rounded-md transition duration-300 hover:bg-blue-600"
//         >
//           Submit
//         </button>
//       </form>
//       <ToastContainer />
//     </div>
//   );
// };

// export default EmergencyReportForm;
