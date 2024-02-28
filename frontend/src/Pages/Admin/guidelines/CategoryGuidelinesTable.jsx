import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { FaTrash, FaPen } from "react-icons/fa";
import axios from 'axios';


export default function CategoryGuidelinesTable() {
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage] = useState(7);

  useEffect(() => {
    fetchGuidelines();
  }, [currentPage]);

  const fetchGuidelines = async () => {
    try {
      const response = await axios.get(`/api/v1/categories/pagination?page=${currentPage}&limit=${itemsPerPage}`);
      setCategories(response.data.categories);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching guidelines:', error);
    }
  };
  const handleDelete = async (categoryId) => {
    try {
      await axios.delete(`/api/v1/categories/${categoryId}`);
      setCategories(categories.filter(category => category._id !== categoryId));
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  return (
    <div className="w-full mx-auto mt-8 flex justify-center">
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
          {categories.map(category => (
            <tr key={category._id}>
              <td className="border px-4 py-2">{category.name}</td>
              <td className="border px-4 py-2 w-auto">{category.description}</td>
              <td className="border px-4 py-2">
                <img src={category.image} alt={category.name} className="h-10 w-10 object-cover" />
              </td>
              <td className="border px-4 py-2">
              <div className="flex">
                <Link to={`/admin/update/category/guidelines/${category._id}`} className="mr-2">
                  <FaPen className="text-blue-500" />
                </Link>
                <button onClick={() => handleDelete(category._id)}>
                      <FaTrash className="text-red-500" />
                    </button>
              </div>
            </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center mt-4">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => paginate(index + 1)}
              className={`mx-1 px-3 py-1 rounded ${currentPage === index + 1 ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-800'}`}
            >
              {index + 1}
            </button>
          ))}
        </div>
    </div>
  </div>
  )
}
