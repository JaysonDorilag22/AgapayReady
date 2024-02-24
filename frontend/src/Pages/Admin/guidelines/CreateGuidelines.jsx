import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidemenu from "../../../components/Sidemenu";
import GuidelineTable from './GuidelineTable'
export default function CreateGuidelines() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: null,
    category: "", // New state for category selection
  });
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate(); // Import and use useNavigate hook

  useEffect(() => {
    // Fetch categories when the component mounts
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`/api/v1/categories`);
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

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("image", formData.image);
    formDataToSend.append("category", formData.category); // Use formData.category directly

    try {
      const response = await axios.post(`/api/v1/guidelines`, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Guideline created:", response.data);
      // navigate("/create/steps"); /admin/create/guidelines
      navigate("/admin/create/guidelines");
      // Add any success handling here (e.g., redirect to a success page)
    } catch (error) {
      console.error("Error creating guideline:", error);
      // Add error handling here (e.g., show error message to the user)
    }
  };

  return (
    <div className="flex">
    <section className="fixed left-0 top-0 bottom-0 w-64 bg-white overflow-y-auto border-r border-gray-200">
        <Sidemenu />
      </section>
      <div className="flex-1 ml-64 mr-4 mt-8 p-4 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Create Guidelines</h1>
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
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Create Guideline
        </button>
      </form>
    </div>
    <div>
    <GuidelineTable />
  </div>
    </div>
  );
}
