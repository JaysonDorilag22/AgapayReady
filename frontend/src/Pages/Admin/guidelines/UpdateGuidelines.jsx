import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from 'react-router-dom';

export default function UpdateGuidelines() {
  const { guidelineId } = useParams(); // Assuming you have a route parameter for guideline ID
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: null,
    category: "", 
  });
  const [categories, setCategories] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate(); 

  useEffect(() => {
    // Fetch categories and existing guideline data when the component mounts
    fetchCategories();
    fetchGuidelineData();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/categories`);
      setCategories(response.data); 
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchGuidelineData = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/guidelines/${guidelineId}`);
      const { name, description, image, category } = response.data; // Assuming your API returns guideline data
      setFormData({ name, description, image, category }); 
      if (image) {
        setImagePreview(image);
      }
    } catch (error) {
      console.error("Error fetching guideline data:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files.length > 0) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(files[0]);
    }
    setFormData((prevState) => ({
      ...prevState,
      [name]: name === "image" ? files[0] : value,
    }));
  };
console.log(formData.image);
  const handleRemoveImage = () => {
    setFormData((prevState) => ({
      ...prevState,
      image: null,
    }));
    setImagePreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("image", formData.image);
    formDataToSend.append("category", formData.category); 

    try {
      const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/v1/guidelines/${guidelineId}`, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Guideline updated:", response.data);
      navigate("/admin/create/guidelines"); // Redirect to guidelines list after successful update
    } catch (error) {
      console.error("Error updating guideline:", error);
    }
  };

  return (
    <div className="flex">

      <div className="flex-1 ml-64 mr-4 mt-8 p-4 rounded shadow">
        <h1 className="text-2xl font-bold mb-4">Update Guidelines</h1>
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
                />
                {imagePreview && (
                  <div className="mt-2">
                    <img src={imagePreview} alt="Preview" className="max-w-20 h-auto" />
                    <button type="button" onClick={handleRemoveImage} className="text-red-500 mt-2">Remove Image</button>
                  </div>
                )}
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
            Update Guideline
          </button>
        </form>
      </div>
    </div>
  );
}
