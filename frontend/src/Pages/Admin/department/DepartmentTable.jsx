import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import axios from 'axios';

export default function DepartmentTable() {
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    // Fetch departments data when the component mounts
    const fetchDepartments = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/departments`);
        setDepartments(response.data);
      } catch (error) {
        console.error('Error fetching departments:', error);
        // Handle errors, such as showing an error message to the user
      }
    };
    // ${import.meta.env.VITE_BACKEND_URL}
    fetchDepartments(); // Call the fetchDepartments function
  }, []); // Empty dependency array ensures that this effect runs only once on component mount

  const handleDelete = async (departmentId) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/v1/departments/${departmentId}`);
      console.log('Department deleted successfully');
      // Remove the deleted department from the local state
      setDepartments(departments.filter(department => department._id !== departmentId));
    } catch (error) {
      console.error('Error deleting department:', error);
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
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {departments.map((department) => (
              <tr key={department._id}>
                <td className="border px-4 py-2">{department.name}</td>
                <td className="border px-4 py-2 w-auto">{department.description}</td>
                <td className="border px-4 py-2">
                  <div className="flex">
                    <Link to={`/admin/update/departments/${department._id}`} className="mr-2">
                      <AiOutlineEdit className="text-blue-500" />
                    </Link>
                    <button onClick={() => handleDelete(department._id)}>
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
  );
}
