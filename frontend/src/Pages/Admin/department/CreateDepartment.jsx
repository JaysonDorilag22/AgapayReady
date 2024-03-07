import React, { useState } from 'react';
import DepartmentTable from './DepartmentTable';
import axios from 'axios'; 

export default function CreateDepartment() {
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('${import.meta.env.VITE_BACKEND_URL}/api/v1/departments', formData);
      console.log('Department created:', response.data);
    } catch (error) {
      console.error('Error creating department:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className='flex'>

      <div className="flex-1 ml-64 mr-4 mt-8 p-4 rounded shadow">
        <h1 className="text-2xl font-bold mb-4">Create Department</h1>
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
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Create Department
          </button>
        </form>
      </div>
      <div>
        <DepartmentTable />
      </div>
    </div>
  );
}
