import React, { useState, useEffect } from "react";
import Sidemenu from '../../../components/Sidemenu'
import axios from "axios";
import { useParams, useNavigate } from 'react-router-dom';

export default function UpdateCategoryGuidelines() {
    const navigate = useNavigate();
    const { categoryId } = useParams();
    const [formData, setFormData] = useState({
        name: "",
        short_description: "",
        description: "",
        image: null,
      });
    const [imagePreview, setImagePreview] = useState(null);
    
      useEffect(() => {
        async function fetchCategoryDetails() {
          try {
            const response = await axios.get(`${import.meta.env.VITE_PORT}/api/v1/categories/${categoryId}`);
            const { name, short_description, description, image } = response.data;
            setFormData({ name, short_description, description, image });
            if (image) {
              setImagePreview(image);
            }
          } catch (error) {
            console.error("Error fetching category details:", error);
          }
        }
        fetchCategoryDetails();
      }, [categoryId]);
    
    
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
        formDataToSend.append("short_description", formData.short_description);
        formDataToSend.append("description", formData.description);
        formDataToSend.append("image", formData.image);
    
        try {
          const response = await axios.put(`${import.meta.env.VITE_PORT}/api/v1/categories/${categoryId}`, formDataToSend, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          console.log("Category updated:", response.data);
        navigate("/admin/create/category/guidelines")
          setFormData({
            name: "",
            short_description: "",
            description: "",
            image: null,
          });
          setImagePreview(null);
    
        } catch (error) {
          console.error("Error updating category:", error);
        }
      };
    
      return (
        <div className='flex'>
          <section className="fixed left-0 top-0 bottom-0 w-64 bg-white overflow-y-auto border-r border-gray-200">
            <Sidemenu />
          </section>
          <div className="flex-1 ml-64 mr-4 mt-8 p-4 rounded shadow">
            <h1 className="text-2xl font-bold mb-4">Update Contacts Category</h1>
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
                />
                {imagePreview && (
                  <div className="mt-2">
                    <img src={imagePreview} alt="Preview" className="max-w-20 h-auto" />
                    <button type="button" onClick={handleRemoveImage} className="text-red-500 mt-2">Remove Image</button>
                  </div>
                )}
              </div>
              <button
                type="submit"
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Update Contacts Category
              </button>
            </form>
          </div>
        </div>
      );
}
