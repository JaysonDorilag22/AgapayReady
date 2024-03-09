import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import axios from 'axios';
import { LuTrash, LuPencil, LuPlus } from "react-icons/lu";
import { RiAddLine } from "react-icons/ri";

export default function DepartmentTable() {
  const [departments, setDepartments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const response = await axios.get(`/api/v1/departments`);
      setDepartments(response.data);
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  };

  const handleDelete = async (departmentId) => {
    try {
      await axios.delete(`/api/v1/departments/${departmentId}`);
      setDepartments(departments.filter(department => department._id !== departmentId));
    } catch (error) {
      console.error('Error deleting department:', error);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const filteredDepartments = departments.filter(department =>
    department.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const currentDepartments = filteredDepartments.slice(indexOfFirstItem, indexOfLastItem);

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
                to={'/admin/create/departments'}
                className="flex m-3 items-center px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:ring-blue-200"
                title="Add Department"
              >
                <LuPlus className="mr-1" /> Add Department
              </Link>
            </div>
            <table className="w-full">
              <thead className="text-sm text-center border text-slate-500">
                <tr>
                  <th className="px-4 py-3 hover:text-black">Name</th>
                  <th className="px-4 py-3 hover:text-black">Description</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {currentDepartments.map((department) => (
                  <tr key={department._id} className="dark:border-gray-200">
                    <td className="px-4 py-3 text-center">{department.name}</td>
                    <td className="px-4 py-3 text-center">{department.description}</td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex justify-center">
                        <Link
                          to={`/admin/update/departments/${department._id}`}
                          className="mr-2 text-blue-500 hover:text-blue-900"
                        >
                          <LuPencil className="text-lg" />
                        </Link>
                        <button
                          onClick={() => handleDelete(department._id)}
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
                Showing {Math.min(indexOfFirstItem + 1, filteredDepartments.length)} -{" "}
                {Math.min(indexOfLastItem, filteredDepartments.length)} of {filteredDepartments.length}
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
                  disabled={indexOfLastItem >= filteredDepartments.length}
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
