import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidemenu from "../../../components/Sidemenu";
import ContactsTable from './ContactsTable';

export default function CreateContacts() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    phone: "",
    image: null,
    category: "", // New state for category selection
  });

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch categories when the component mounts
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("/api/v2/categories");
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
    formDataToSend.append("phone", formData.phone);
    formDataToSend.append("image", formData.image);
    formDataToSend.append("category", formData.category); // Use formData.category directly

    try {
      const response = await axios.post("/api/v1/contacts", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Contacts created:", response.data);
    } catch (error) {
      console.error("Error creating contact:", error);
    }
  };

  return (
    <div className="flex">
    <section>
      <Sidemenu/>
    </section>
    <div className="max-w-lg mx-auto mt-8 p-4 bg-gray-100 rounded shadow">
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
          <label className="block mb-1 font-semibold">Phone:</label>
          <input
            name="phone"
            value={formData.phone}
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
    <ContactsTable />
  </div>
    </div>
  )
}
