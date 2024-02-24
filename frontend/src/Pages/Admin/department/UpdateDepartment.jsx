import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Sidemenu from '../../../components/Sidemenu';

export default function UpdateDepartment() {
  const { departmentId } = useParams(); // Get departmentId from URL parameters
 const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });

  useEffect(() => {
    // Fetch department data when the component mounts
    const fetchDepartment = async () => {
      try {
        const response = await axios.get(`/api/v1/departments/${departmentId}`);
        const departmentData = response.data;
        setFormData({
          name: departmentData.name,
          description: departmentData.description
        });
      } catch (error) {
        console.error('Error fetching department:', error);
        // Handle errors, such as showing an error message to the user
      }
    };

    fetchDepartment(); 
  }, [departmentId]); 

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/v1/departments/${departmentId}`, formData);
      console.log('Department updated successfully');
      navigate("/admin/create/departments")
    } catch (error) {
      console.error('Error updating department:', error);
    }
  };

  return (
    <div className="flex">
      <section className="fixed left-0 top-0 bottom-0 w-64 bg-white overflow-y-auto border-r border-gray-200">
        <Sidemenu />
      </section>
      <div className="flex-1 ml-64 mr-4 mt-8 p-4 rounded shadow">
        <h1 className="text-2xl font-bold mb-4">Update Department</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-semibold">Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Description:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              rows="4"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Update Department
          </button>
        </form>
      </div>
    </div>
  );
}
