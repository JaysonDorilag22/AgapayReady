import React, { useState, useEffect } from "react";
import axios from "axios";
import { LuPencil, LuTrash, LuPlus } from "react-icons/lu";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Link } from "react-router-dom";
export default function EvacuationGuidelinesTable() {
  const [guidelines, setGuidelines] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchGuidelines = async () => {
      try {
        const response = await axios.get("/api/v1/evacuation-guidelines");
        setGuidelines(response.data);
      } catch (error) {
        console.error("Error fetching guidelines:", error);
        // Handle error (e.g., show error message)
      }
    };

    fetchGuidelines();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const filteredGuidelines = guidelines.filter((guideline) =>
    guideline.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const currentGuidelines = filteredGuidelines.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/v1/evacuation-guidelines/${id}`);
      toast.success("Evacuation guidelines deleted successfully!");

      setGuidelines(guidelines.filter((guideline) => guideline._id !== id));
    } catch (error) {
      console.error("Error deleting guideline:", error);
    }
  };

  return (
    <section className="bg-gray-50 p-3 sm:p-5">
      <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
        <div className="bg-white relative sm:rounded-md outline outline-1 outline-slate-300 overflow-hidden">
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
              to={"/admin/create/evacuation"}
              className="flex m-3 items-center px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:ring-blue-200"
              title="Add Evacuation"
            >
              <LuPlus className="mr-1" /> Add Evacuation
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="text-sm text-center border text-slate-500">
                <tr>
                  <th scope="col" className="px-4 py-3 hover:text-black">
                    Name
                  </th>
                  <th scope="col" className="px-4 py-3 hover:text-black">
                    Tips
                  </th>
                  <th scope="col" className="px-4 py-3 hover:text-black">
                    GLB File
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {currentGuidelines.map((guideline) => (
                  <tr key={guideline._id} className="dark:border-gray-200">
                    <td className="px-4 py-3 text-center">{guideline.name}</td>
                    <td className="px-4 py-3 text-center">{guideline.tips}</td>
                    <td className="px-4 py-3 text-center">
                      <a
                        href={guideline.glbfile}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View GLB
                      </a>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex justify-center">
                        <Link    
                          to={`/admin/update/evacuation/${guideline._id}`}
                          className="mr-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-blue-700"
                          title="Edit"
                        >
                          <LuPencil className="text-lg" />
                        </Link>
                        <button
                          onClick={() => handleDelete(guideline._id)}
                          className="text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-500"
                          title="Delete"
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
                Showing{" "}
                {Math.min(indexOfFirstItem + 1, filteredGuidelines.length)} -{" "}
                {Math.min(indexOfLastItem, filteredGuidelines.length)} of{" "}
                {filteredGuidelines.length}
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
      <ToastContainer />

    </section>
  );
}
