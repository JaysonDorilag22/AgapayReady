import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function GuidelineTable() {
  const [guidelines, setGuidelines] = useState([]);

  useEffect(() => {
    fetchGuidelines();
  }, []);

  const fetchGuidelines = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_PORT}/api/v1/guidelines`);
      setGuidelines(response.data);
    } catch (error) {
      console.error('Error fetching guidelines:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <div className="overflow-x-auto">
        <table className="table-auto w-full text-sm">
          <thead>
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2">Image</th>
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
                  <Link to={`/guidelines/${guideline._id}`} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    Steps
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
