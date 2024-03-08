import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import GuidelineTable from "./GuidelineTable";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function CreateGuidelines() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: null,
    category: "", 
  });
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`/api/v1/categories`);
      setCategories(response.data); 
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
    formDataToSend.append("image", formData.image);
    formDataToSend.append("category", formData.category); 

    try {
      const response = await axios.post(`/api/v1/guidelines`, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Guideline created successfully");

      console.log("Guideline created:", response.data);
      setLoading(false);

      setFormData({
        name: "",
        description: "",
        image: null,
        category: "", 
      });
       navigate("/admin/create/guidelines")
    } catch (error) {
      toast.error("Error creating guideline");

      console.error("Error creating guideline:", error);

    }
  };

  return (
    <>
    <div className="flex">
      <div className="w-full m-3">
    <ToastContainer/>
        <h1 className="text-3xl font-bold mb-3 text-center">Guidelines</h1>
        <div className="flex flex-col md:flex-row border rounded p-4"> {/* Added border and padding */}
          <div className="md:mr-5 flex-1 mb-5 md:mb-0">
            <form onSubmit={handleSubmit} className="space-y-4 text-sm">
        <h1 className="text-3xl font-bold mb-3 text-center">CREATE GUIDELINES</h1>
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
                <label className="block mb-1 font-semibold">
                  Description:
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded"
                  rows="4"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-semibold">Image:</label>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-semibold">Category:</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded"
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <button
          type="submit"
          disabled={loading} // Disable button when loading
          className={`bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 w-full md:w-auto ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {loading ? 'Creating...' : 'Create Guideline'}
        </button>
            </form>
          </div>
          <div className="flex-1 border-t mt-5 md:mt-0 md:border-t-0 md:border-l md:pl-5">
            <div>
              <GuidelineTable />
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
  
  
  );
}
