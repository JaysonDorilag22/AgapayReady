import React, { useState, useEffect } from "react";
import { RiPencilLine, RiDeleteBinLine, RiAddLine } from "react-icons/ri";
import { LuTrash, LuPencil, LuPlus } from "react-icons/lu";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function EmergencyReport() {
  const [reports, setReports] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const response = await axios.get(`/api/v1/report`);
      setReports(response.data);
    } catch (error) {
      console.error("Error fetching reports:", error);
      toast.error("Failed to fetch reports");
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset pagination when search query changes
  };

  const filteredReports = reports.filter((report) =>
    report.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredReports.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200 m-3"
                />
              </div>
              <button
                className="flex m-3 items-center px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:ring-blue-200"
                title="Add Product"
              >
                <LuPlus className="mr-1" /> Add Product
              </button>
            </div>
            <table className="w-full">
              <thead className="text-sm text-center border text-slate-500">
                <tr>
                  <th scope="col" className="px-4 py-3 hover:text-black">
                    Location
                  </th>
                  <th scope="col" className="px-4 py-3 hover:text-black">
                    Description
                  </th>
                  <th scope="col" className="px-4 py-3 hover:text-black">
                    Image
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {currentItems.map((report) => (
                  <tr key={report._id} className="dark:border-gray-200">
                    <td className="px-4 py-3 text-center">{report.location}</td>
                    <td className="px-4 py-3 text-center">{report.description}</td>
                    <td className="px-4 py-3 text-center">
                      <img src={report.image} alt="Report" className="h-16 w-auto mx-auto" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-between items-center mt-4">
              <div className="text-sm text-gray-600 m-3">
                Showing {Math.min(indexOfFirstItem + 1, reports.length)} -{" "}
                {Math.min(indexOfLastItem, reports.length)} of {reports.length}
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
                  disabled={indexOfLastItem >= reports.length}
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
