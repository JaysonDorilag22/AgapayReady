import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function UpdateGuidelines() {
  const { guidelineId } = useParams(); 
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: null,
    category: "", 
  });
  const [categories, setCategories] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); 

  useEffect(() => {
    fetchCategories();
    fetchGuidelineData();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`/api/v1/categories`);
      setCategories(response.data); 
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchGuidelineData = async () => {
    try {
      const response = await axios.get(`/api/v1/guidelines/${guidelineId}`);
      const { name, description, image, category } = response.data;
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

    setLoading(true);
    try {
      const response = await axios.put(`/api/v1/guidelines/${guidelineId}`, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Guideline updated:", response.data);
      setLoading(false);
      toast.success("Guideline updated successfully");
      navigate("/admin/guideline/table"); // Redirect to guidelines list after successful update
    } catch (error) {
      setLoading(false);
      console.error("Error updating guideline:", error);
      toast.error("Error updating guideline");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="max-w-lg w-full bg-slate-100 p-4 rounded-md outline outline-1 outline-slate-400 m-4">
        <form onSubmit={handleSubmit} className="space-y-4 text-sm">
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">Update Guideline</h2>
              <div>
                <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-red-600 focus:border-red-600 sm:text-sm"
                  required
                />
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-red-600 focus:border-red-600 sm:text-sm"
                  rows="3"
                  required
                ></textarea>
              </div>
              <div className="mt-4">
                  <label htmlFor="image" className="block text-sm font-medium leading-6 text-gray-900">Image:</label>
                  <input type="file" id="image" name="image" onChange={handleChange} accept="image/*" className="file-input block file-input-bordered file-input-sm w-full" />
                  {imagePreview && (
                    <div className="mt-2">
                      <img src={imagePreview} alt="Preview" className="max-w-20 h-auto" />
                      <button type="button" onClick={handleRemoveImage} className="text-red-500 mt-2">Remove Image</button>
                    </div>
                  )}
                </div>
              <div>
                <label htmlFor="category" className="block text-sm font-medium leading-6 text-gray-900">Category</label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-red-600 focus:border-red-600 sm:text-sm"
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
            </div>
          </div>
          <div className="mt-2 flex items-center justify-end gap-x-6">
            <Link to="/admin/guideline/table" className="text-sm font-semibold leading-6 text-gray-900">Cancel</Link>
            <button type="submit" disabled={loading} className={`rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}>
              {loading ? 'Updating...' : 'Update Guideline'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
