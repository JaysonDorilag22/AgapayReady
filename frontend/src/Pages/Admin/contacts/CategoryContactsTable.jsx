import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import axios from 'axios';

export default function CategoryContactsTable() {
  const [categories, setCategories] = useState([]);
 

  useEffect(() => {
    fetchGuidelines();
  }, []);

  const fetchGuidelines = async () => {
    try {
      const response = await axios.get(`/api/v2/categories`);
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching guidelines:', error);
    }
  };

  const handleDelete = async (categoryId) => {
    try {
      await axios.delete(`/api/v2/categories/${categoryId}`);
      setCategories(categories.filter(category => category._id !== categoryId));
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };
  return (
    <div className="max-w-4xl mx-auto mt-8">
    <div className="overflow-x-auto">
      <table className="table-auto w-full text-sm">
        <thead>
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Short description</th>
            <th className="px-4 py-2">Description</th>
            <th className="px-4 py-2">Image</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map(category => (
            <tr key={category._id}>
              <td className="border px-4 py-2">{category.name}</td>
              <td className="border px-4 py-2">{category.short_description}</td>

              <td className="border px-4 py-2 w-auto">{category.description}</td>
              <td className="border px-4 py-2">
                <img src={category.image} alt={category.name} className="h-10 w-10 object-cover" />
              </td>
              <td className="border px-4 py-2">
              <div className="flex">
                <Link to={`/admin/update/category/contacts/${category._id}`} className="mr-2">
                  <AiOutlineEdit className="text-blue-500" />
                </Link>
                <button onClick={() => handleDelete(category._id)}>
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

  )
}
