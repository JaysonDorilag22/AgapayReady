// import React, { useState, useEffect } from "react";
// import axios from "axios";

// export default function CreateSteps() {
//   const [formData, setFormData] = useState({
//     stepNumber: "",
//     description: "",
//     image: null,
//     guideline: "", // State for guideline selection
//   });
//   const [guidelines, setGuidelines] = useState([]);

//   useEffect(() => {
//     fetchGuidelines();
//   }, []);

//   const fetchGuidelines = async () => {
//     try {
//       const response = await axios.get(`${import.meta.env.VITE_PORT}/api/v1/guidelines`);
//       setGuidelines(response.data);
//     } catch (error) {
//       console.error("Error fetching guidelines:", error);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     setFormData((prevState) => ({
//       ...prevState,
//       [name]: name === "image" ? files[0] : value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formDataToSend = new FormData();
//     formDataToSend.append("stepNumber", formData.stepNumber);
//     formDataToSend.append("description", formData.description);
//     formDataToSend.append("image", formData.image);
//     formDataToSend.append("guideline", formData.guideline); 

//     try {
//       const response = await axios.post(`/api/v1/steps`, formDataToSend, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });
//       console.log("Step created:", response.data);
//       // Reset form after successful submission
//       setFormData({
//         stepNumber: "",
//         description: "",
//         image: null,
//         guideline: "",
//       });
//     } catch (error) {
//       console.error("Error creating step:", error);
//     }
//   };

//   console.log("Rendering component"); // Log rendering to check component lifecycle

//   return (
//     <div className="max-w-lg mx-auto mt-8 p-4 bg-gray-100 rounded shadow">
//       <h1 className="text-2xl font-bold mb-4">Create Steps</h1>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="block mb-1 font-semibold">Step Number:</label>
//           <input
//             type="number"
//             name="stepNumber"
//             value={formData.stepNumber}
//             onChange={handleChange}
//             className="w-full px-3 py-2 border rounded"
//             required
//           />
//         </div>
//         <div>
//           <label className="block mb-1 font-semibold">Description:</label>
//           <textarea
//             name="description"
//             value={formData.description}
//             onChange={handleChange}
//             className="w-full px-3 py-2 border rounded"
//             rows="4"
//             required
//           />
//         </div>
//         <div>
//           <label className="block mb-1 font-semibold">Image:</label>
//           <input
//             type="file"
//             name="image"
//             accept="image/*"
//             onChange={handleChange}
//             className="w-full px-3 py-2 border rounded"
//             required
//           />
//         </div>
//         <div>
//           <label className="block mb-1 font-semibold">Guideline:</label>
//           <select
//             name="guideline"
//             value={formData.guideline}
//             onChange={handleChange}
//             className="w-full px-3 py-2 border rounded"
//             required
//           >
//             <option value="">Select Guideline</option>
//             {guidelines.map((guideline) => (
//               <option key={guideline._id} value={guideline._id}>
//                 {guideline.name}
//               </option>
//             ))}
//           </select>
//         </div>
//         <button
//           type="submit"
//           className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
//         >
//           Create Steps
//         </button>
//       </form>
//     </div>
//   );
// }
import React from 'react'

export default function CreateSteps() {
  return (
    <div>CreateSteps</div>
  )
}
