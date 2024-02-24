import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';

export default function GuidelineTable() {
  const [guidelines, setGuidelines] = useState([]);

  useEffect(() => {
    fetchGuidelines();
  }, []);

  const fetchGuidelines = async () => {
    try {
      const response = await axios.get(`/api/v1/guidelines`);
      setGuidelines(response.data);
    } catch (error) {
      console.error('Error fetching guidelines:', error);
    }
  };

  const handleDelete = async (guidelineId) => {
    try {
      await axios.delete(`/api/v1/guidelines/${guidelineId}`);
      // If deletion is successful, update the state to remove the deleted guideline
      setGuidelines(guidelines.filter(guideline => guideline._id !== guidelineId));
    } catch (error) {
      console.error('Error deleting guideline:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <div className="overflow-x-auto">
        <table className="table-auto w-full text-sm">
          <thead>
            <tr>
              <th className="px-4 py-1">Name</th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2">Image</th>
              <th className="px-4 py-2">Steps</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {guidelines.map(guideline => (
              <tr key={guideline._id}>
                <td className="border px-4 py-2">{guideline.name}</td>
                <td className="border px-4 py-2">{guideline.description}</td>
                <td className="border px-4 py-2">
                  <img src={guideline.image} alt={guideline.name} className="h-10 w-10 object-cover" />
                </td>
                <td className="border px-4 py-2">
                <Link to={`/admin/guidelines/${guideline._id}`} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    Steps
                  </Link>
                </td>

                <td className="border px-4 py-2">
                <div className='flex '>
                  
                  <Link to={`/admin/update/guidelines/${guideline._id}`} className="mr-2">
                  <AiOutlineEdit className="text-blue-500" />
                </Link>
                <button onClick={() => handleDelete(guideline._id)}>
                      <AiOutlineDelete className="text-red-500" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
