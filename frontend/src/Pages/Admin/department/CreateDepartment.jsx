import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function () {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('/api/v1/departments', formData);
      setLoading(false);
      console.log('Department created:', response.data);
      toast.success('Department created successfully');
      navigate('/admin/department/table');
    } catch (error) {
      setLoading(false);
      console.error('Error creating department:', error);
      toast.error('Error creating department');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="max-w-lg w-full bg-slate-100 p-4 rounded-md outline outline-1 outline-slate-400 m-4">
        <form onSubmit={handleSubmit}>
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">Create Department</h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">Provide details about the department.</p>
  
              <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">
                <div className="col-span-full">
                  <label htmlFor="department-name" className="block text-sm font-medium leading-6 text-gray-900">Name</label>
                  <div className="mt-2">
                    <input
                      type="text"
                      id="department-name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      autoComplete="department-name"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                
                <div className="col-span-full">
                  <label htmlFor="department-description" className="block text-sm font-medium leading-6 text-gray-900">Description</label>
                  <div className="mt-2">
                    <textarea
                      id="department-description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows="3"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
  
          <div className="mt-2 flex items-center justify-end gap-x-6">
            <Link to="/admin/department/table" className="text-sm font-semibold leading-6 text-gray-900">Cancel</Link>
            <button type="submit" disabled={loading} className={`rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}>
              {loading ? 'Creating...' : 'Create Department'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
