import React, { useState, useEffect } from 'react';
import axios from 'axios';


export default function CategoryGuidelinesTable() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchGuidelines();
  }, []);

  const fetchGuidelines = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_PORT}/api/v1/categories`);
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching guidelines:', error);
    }
  };
  return (
    <div className="max-w-4xl mx-auto mt-8">
    <div className="overflow-x-auto">
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Description</th>
            <th className="px-4 py-2">Image</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map(category => (
            <tr key={category._id}>
              <td className="border px-4 py-2">{category.name}</td>
              <td className="border px-4 py-2">{category.description}</td>
              <td className="border px-4 py-2">
                <img src={category.image} alt={category.name} className="h-10 w-10 object-cover" />
              </td>
              <td className="border px-4 py-2">
                
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
  )
}
