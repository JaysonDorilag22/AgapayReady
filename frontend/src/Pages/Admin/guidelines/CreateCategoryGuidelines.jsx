import React, { useState } from "react";
import CategoryGuidelinesTable from './CategoryGuidelinesTable'
import Sidemenu from '../../../components/Sidemenu'
import axios from "axios";

export default function CreateCategoryGuidelines() {
  const [formData, setFormData] = useState({
    name: "",
    short_description: "",
    description: "",
    image: null,
  });

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
    formDataToSend.append("short_description", formData.short_description);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("image", formData.image);

    try {
      const response = await axios.post(`${import.meta.env.VITE_PORT}/api/v1/categories`, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Guideline category created:", response.data);

      setFormData({
        name: "",
        short_description: "",
        description: "",
        image: null,
      });

    } catch (error) {
      console.error("Error creating guideline category:", error);
    }
  };

  return (
    <div className='flex'>
    <section className="fixed left-0 top-0 bottom-0 w-64 bg-white overflow-y-auto border-r border-gray-200">
        <Sidemenu />
      </section>
      <div className="flex-1 ml-64 mr-4 mt-8 p-4 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Create Guidelines Category</h1>
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
          <label className="block mb-1 font-semibold">Short Description:</label>
          <textarea
            name="short_description"
            value={formData.short_description}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            rows="4"
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
        <button
          type="submit"
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Create Guideline Category
        </button>
      </form>
    </div>
    <div>
    <CategoryGuidelinesTable />
    </div>
  </div>
  )
}

