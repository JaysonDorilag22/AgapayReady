import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

export default function CreateContacts() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    phone: "",
    image: null,
    category: "", // New state for category selection
  });

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch categories when the component mounts
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`/api/v2/categories`);
      setCategories(response.data); // Set categories in state
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: name === "image" ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("phone", formData.phone);
    formDataToSend.append("image", formData.image);
    formDataToSend.append("category", formData.category); 

    try {
      const response = await axios.post(`/api/v1/contacts`, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Contacts created:", response.data);
      setLoading(false);
      toast.success("Contact created successfully");
      navigate('/admin/contact/table');
    } catch (error) {
      console.error("Error creating contact:", error);
      setLoading(false);
      toast.error("Error creating contact");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="max-w-lg w-full bg-slate-100 p-4 rounded-md outline outline-1 outline-slate-400 m-4">
        <form onSubmit={handleSubmit}>
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">Create Contact</h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">Provide details about the contact.</p>

              <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">
                <div className="col-span-full">
                  <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">Name:</label>
                  <div className="mt-2">
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} autoComplete="name" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6" required />
                  </div>
                </div>
                
                <div className="col-span-full">
                  <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">Description:</label>
                  <div className="mt-2">
                    <textarea id="description" name="description" value={formData.description} onChange={handleChange} rows="3" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6" required></textarea>
                  </div>
                </div>
                
                <div className="col-span-full">
                  <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">Phone:</label>
                  <div className="mt-2">
                    <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} autoComplete="phone" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6" required />
                  </div>
                </div>
                
                <div className="col-span-full">
                  <label htmlFor="image" className="block text-sm font-medium leading-6 text-gray-900">Image:</label>
                  <div className="mt-2">
                    <input type="file" id="image" name="image" onChange={handleChange} accept="image/*" className="file-input block file-input-bordered file-input-sm w-full" required />
                  </div>
                </div>

                <div className="col-span-full">
                  <label htmlFor="category" className="block text-sm font-medium leading-6 text-gray-900">Category:</label>
                  <div className="mt-2">
                    <select id="category" name="category" value={formData.category} onChange={handleChange} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6" required>
                      <option value="">Select Category</option>
                      {categories.map((category) => (
                        <option key={category._id} value={category._id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-2 flex items-center justify-end gap-x-6">
            <Link to="/admin/contact/table" className="text-sm font-semibold leading-6 text-gray-900">Cancel</Link>
            <button type="submit" disabled={loading} className={`rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}>
              {loading ? 'Creating...' : 'Create Contact'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
