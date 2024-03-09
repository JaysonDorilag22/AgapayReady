import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from 'react-router-dom';
import { toast } from "react-toastify";

export default function UpdateContacts() {
  const { contactId } = useParams(); // Assuming you have a route parameter for contact ID
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    phone: "",
    image: null,
    category: "", 
  });
  const [categories, setCategories] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate(); 

  useEffect(() => {
    fetchCategories();
    fetchContactData();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`/api/v2/categories`);
      setCategories(response.data); 
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchContactData = async () => {
    try {
      const response = await axios.get(`/api/v1/contacts/${contactId}`);
      const { name, description, phone, image, category } = response.data; 
      setFormData({ name, description, phone, image, category }); 
      if (image) {
        setImagePreview(image);
      }
    } catch (error) {
      console.error("Error fetching contact data:", error);
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
    formDataToSend.append("phone", formData.phone);
    formDataToSend.append("image", formData.image);
    formDataToSend.append("category", formData.category); 

    try {
      const response = await axios.put(`/api/v1/contacts/${contactId}`, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Contact updated:", response.data);
      toast.success("Contact updated successfully");
      navigate("/admin/contact/table"); // Redirect to contacts list after successful update
    } catch (error) {
      console.error("Error updating contact:", error);
      toast.error("Error updating contact");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="max-w-lg w-full bg-slate-100 p-4 rounded-md outline outline-1 outline-slate-400 m-4">
        <form onSubmit={handleSubmit}>
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">Contact Information</h2>
              <div className="mt-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">Name:</label>
                  <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6" required />
                </div>
                <div className="mt-4">
                  <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">Description:</label>
                  <textarea id="description" name="description" value={formData.description} onChange={handleChange} rows="3" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6" required></textarea>
                </div>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">Phone:</label>
                  <input type="text" id="phone" name="phone" value={formData.phone} onChange={handleChange} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6" required />
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
                <div className="mt-4">
                  <label htmlFor="category" className="block text-sm font-medium leading-6 text-gray-900">Category:</label>
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

          <div className="mt-2 flex items-center justify-end gap-x-6">
          <Link to="/admin/contact/table" className="text-sm font-semibold leading-6 text-gray-900">Cancel</Link>

            <button type="submit" className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}
