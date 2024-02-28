import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaTrash, FaPen } from "react-icons/fa";
export default function GuidelineTable() {
  const [guidelines, setGuidelines] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage] = useState(7);

  useEffect(() => {
    fetchGuidelines();
  }, [currentPage]);

  const fetchGuidelines = async () => {
    try {
      const response = await axios.get(`/api/v1/guidelines?page=${currentPage}&limit=${itemsPerPage}`);
      setGuidelines(response.data.guidelines);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching guidelines:', error);
    }
  };

  const handleDelete = async (guidelineId) => {
    try {
      await axios.delete(`/api/v1/guidelines/${guidelineId}`);
      setGuidelines(guidelines.filter(guideline => guideline._id !== guidelineId));
    } catch (error) {
      console.error('Error deleting guideline:', error);
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
                  <Link to={`/admin/guidelines/${guideline._id}`} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                    Steps
                  </Link>
                </td>
                <td className="border px-4 py-2">
                  <div className='flex '>
                    <Link to={`/admin/update/guidelines/${guideline._id}`} className="mr-2 text-blue-500">
                      <FaPen/>
                    </Link>
                    <button onClick={() => handleDelete(guideline._id)} className='text-red-500'>
                      <FaTrash/>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Pagination */}
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
  );
}
