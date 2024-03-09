import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import axios from 'axios';
import { LuTrash, LuPencil, LuPlus } from "react-icons/lu";
import { RiAddLine } from "react-icons/ri";

export default function CategoryContactsTable() {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`/api/v2/categories`);
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
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

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const currentCategories = filteredCategories.slice(indexOfFirstItem, indexOfLastItem);

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
                to={'/admin/create/category/contacts'}
                className="flex m-3 items-center px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:ring-blue-200"
                title="Add Category"
              >
                <LuPlus className="mr-1" /> Add Category
              </Link>
            </div>
            <table className="w-full">
              <thead className="text-sm text-center border text-slate-500">
                <tr>
                  <th className="px-4 py-3 hover:text-black">Name</th>
                  <th className="px-4 py-3 hover:text-black">Short Description</th>
                  <th className="px-4 py-3">Description</th>
                  <th className="px-4 py-3">Image</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {currentCategories.map((category) => (
                  <tr key={category._id} className="dark:border-gray-200">
                    <td className="px-4 py-3 text-center">{category.name}</td>
                    <td className="px-4 py-3 text-center">{category.short_description}</td>
                    <td className="px-4 py-3 text-center">{category.description}</td>
                    <td className="px-4 py-3 text-center">
                      <img
                        src={category.image}
                        alt={category.name}
                        className="h-10 w-10 object-cover"
                      />
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex justify-center">
                        <Link
                          to={`/admin/update/category/contacts/${category._id}`}
                          className="mr-2 text-blue-500 hover:text-blue-900"
                        >
                          <LuPencil className="text-lg" />
                        </Link>
                        <button
                          onClick={() => handleDelete(category._id)}
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
                Showing {Math.min(indexOfFirstItem + 1, filteredCategories.length)} -{" "}
                {Math.min(indexOfLastItem, filteredCategories.length)} of {filteredCategories.length}
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
                  disabled={indexOfLastItem >= filteredCategories.length}
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
