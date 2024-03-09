import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function CreateCategoryContacts() {
  const [formData, setFormData] = useState({
    name: "",
    short_description: "",
    description: "",
    image: null,
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

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
    formDataToSend.append("short_description", formData.short_description);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("image", formData.image);

    try {
      const response = await axios.post(`/api/v2/categories`, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setLoading(false);

      console.log("Contact category created:", response.data);
      toast.success("Category created successfully");
      setFormData({
        name: "",
        short_description: "",
        description: "",
        image: null,
      });
      navigate("/admin/contact/category/table");
    } catch (error) {
      setLoading(false);

      console.error("Error creating contact category:", error);
      toast.error("Error creating category");
    }
  };

  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <div className="max-w-lg w-full bg-slate-100 p-4 rounded-md outline outline-1 outline-slate-400 m-4">
          <form onSubmit={handleSubmit}>
            <div className="space-y-12">
              <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-base font-semibold leading-7 text-gray-900">Create Contact Category</h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">Provide details about the category.</p>

                <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">
                  <div className="col-span-full">
                    <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">Name</label>
                    <div className="mt-2">
                      <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} autoComplete="name" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6" required />
                    </div>
                  </div>

                  <div className="col-span-full">
                    <label htmlFor="short-description" className="block text-sm font-medium leading-6 text-gray-900">Short Description</label>
                    <div className="mt-2">
                      <input type="text" id="short-description" name="short_description" value={formData.short_description} onChange={handleChange} autoComplete="short-description" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6" required />
                    </div>
                  </div>

                  <div className="col-span-full">
                    <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">Description</label>
                    <div className="mt-2">
                      <textarea id="description" name="description" value={formData.description} onChange={handleChange} rows="3" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6" required></textarea>
                    </div>
                  </div>

                  <div className="col-span-full">
                    <label htmlFor="image" className="block text-sm font-medium leading-6 text-gray-900">Image</label>
                    <div className="mt-2">
                      <input type="file" id="image" name="image" onChange={handleChange} className="file-input block file-input-bordered file-input-sm w-full" required />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-2 flex items-center justify-end gap-x-6">
            <Link to={"/admin/contact/category/table"} className="text-sm font-semibold leading-6 text-gray-900">Cancel</Link>
            <button type="submit" disabled={loading} className={`rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}>
              {loading ? 'Creating...' : 'Create Category'}
            </button>
          </div>
          </form>
        </div>
      </div>
    </>
  );
}
