import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function UpdateCategoryContacts() {
  const navigate = useNavigate();
  const { categoryId } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    short_description: "",
    description: "",
    image: null,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    async function fetchCategoryDetails() {
      try {
        const response = await axios.get(`/api/v2/categories/${categoryId}`);
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
    setLoading(true);

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("short_description", formData.short_description);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("image", formData.image);

    try {
      const response = await axios.put(`/api/v2/categories/${categoryId}`, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setLoading(false);
      console.log("Category updated:", response.data);
      toast.success('Category updated successfully');
      navigate("/admin/contact/category/table");
      setFormData({
        name: "",
        short_description: "",
        description: "",
        image: null,
      });
      setImagePreview(null);

    } catch (error) {
      setLoading(false);
      console.error("Error updating category:", error);
      toast.error('Error updating contacts');

    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="max-w-lg w-full bg-slate-100 p-4 rounded-md outline outline-1 outline-slate-400 m-4">
        <form onSubmit={handleSubmit} className="space-y-4 text-sm">
        <h2 className="text-base font-semibold leading-7 text-gray-900">Update Category Contact</h2>

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
          <div className="mt-2 flex items-center justify-end gap-x-6">
            <Link to="/admin/contact/category/table" className="text-sm font-semibold leading-6 text-gray-900">Cancel</Link>
            <button type="submit" disabled={loading} className={`rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}>
              {loading ? 'Updating...' : 'Update Category'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
