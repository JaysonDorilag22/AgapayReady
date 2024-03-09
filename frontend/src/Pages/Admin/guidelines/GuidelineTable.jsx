import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaTrash, FaPen } from "react-icons/fa";
import { LuTrash, LuPencil, LuPlus } from "react-icons/lu";
import { RiAddLine } from "react-icons/ri";

export default function GuidelineTable() {
  const [guidelines, setGuidelines] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchGuidelines();
  }, []);

  const fetchGuidelines = async () => {
    try {
      const response = await axios.get(`/api/v1/guidelines`);
      console.log("Fetched guidelines:", response.data);
      setGuidelines(response.data);
    } catch (error) {
      console.error("Error fetching guidelines:", error);
    }
  };

  const handleDelete = async (guidelineId) => {
    try {
      await axios.delete(`/api/v1/guidelines/${guidelineId}`);
      setGuidelines((prevGuidelines) =>
        prevGuidelines.filter((guideline) => guideline._id !== guidelineId)
      );
    } catch (error) {
      console.error("Error deleting guideline:", error);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const filteredGuidelines = guidelines.filter(guideline =>
    guideline.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const currentGuidelines = filteredGuidelines.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <section className="bg-gray-50 p-3 sm:p-5">
      <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
        <div className="bg-white relative sm:rounded-md outline outline-1 outline-slate-300 overflow-hidden">
          <div className="overflow-x-auto">
            <div className="flex justify-between mb-4">
              <div className="flex items-center">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200 m-3"
                />
              </div>
              <Link
                to="#"
                className="flex m-3 items-center px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:ring-blue-200"
                title="Add Guideline"
              >
                <LuPlus className="mr-1" /> Add Guideline
              </Link>
            </div>
            <table className="w-full">
              <thead className="text-sm text-center border text-slate-500">
                <tr>
                  <th className="px-4 py-3 hover:text-black">Name</th>
                  <th className="px-4 py-3 hover:text-black">Description</th>
                  <th className="px-4 py-3 hover:text-black">Image</th>
                  <th className="px-4 py-3 hover:text-black">Steps</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {currentGuidelines.map((guideline) => (
                  <tr key={guideline._id} className="dark:border-gray-200">
                    <td className="px-4 py-3 text-center">{guideline.name}</td>
                    <td className="px-4 py-3 text-center">{guideline.description}</td>
                    <td className="px-4 py-3 text-center">
                      {guideline.image && (
                        <img
                          src={guideline.image}
                          alt={guideline.name}
                          className="h-16 w-auto mx-auto"
                        />
                      )}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <Link
                        to={`/admin/guidelines/${guideline._id}`}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                      >
                        Steps
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex justify-center">
                        <Link
                          to={`/admin/update/guidelines/${guideline._id}`}
                          className="mr-2 text-blue-500 hover:text-blue-900"
                        >
                          <LuPencil className="text-lg" />
                        </Link>
                        <button
                          onClick={() => handleDelete(guideline._id)}
                          className="text-red-500 hover:text-red-600"
                        >
                          <LuTrash className="text-lg" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-between items-center mt-4">
              <div className="text-sm text-gray-600 m-3">
                Showing {Math.min(indexOfFirstItem + 1, filteredGuidelines.length)} -{" "}
                {Math.min(indexOfLastItem, filteredGuidelines.length)} of {filteredGuidelines.length}
              </div>
              <div className="flex m-3">
                <button
                  className="px-4 py-2 rounded-md bg-slate-500 text-white hover:bg-slate-600"
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Prev
                </button>
                <button
                  className="px-4 py-2 ml-2 rounded-md bg-slate-500 text-white hover:bg-slate-600"
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={indexOfLastItem >= filteredGuidelines.length}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
