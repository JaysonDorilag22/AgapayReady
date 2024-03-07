import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CategoryGuidelinesTable from "./CategoryGuidelinesTable";
import axios from "axios";

export default function CreateCategoryGuidelines() {
  const [loading, setLoading] = useState(false);
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
    setLoading(true);

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("short_description", formData.short_description);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("image", formData.image);

    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/categories`, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Category created successfully");

      console.log("Guideline category created:", response.data);
      setLoading(false);

      setFormData({
        name: "",
        short_description: "",
        description: "",
        image: null,
      });
    } catch (error) {
      toast.error("Error creating category");

      console.error("Error creating guideline category:", error);
    }
  };

  return (
    <>
      <div className="flex">
        <div className="w-full m-3">
          <ToastContainer />
          <h1 className="text-3xl font-bold mb-3 text-center">Guidelines Category</h1>
          <div className="flex flex-col md:flex-row border rounded p-4">
            {" "}
            <div className="md:mr-5 flex-1 mb-5 md:mb-0">
              <form onSubmit={handleSubmit} className="space-y-4 text-sm">
                <h1 className="text-3xl font-bold mb-3 text-center">
                  CREATE CATEGORY
                </h1>
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
                  <input
                    type="text"
                    name="short_description"
                    value={formData.short_description}
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
                <button
                  type="submit"
                  disabled={loading} // Disable button when loading
                  className={`bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 w-full md:w-auto ${
                    loading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {loading ? "Creating..." : "Create Category"}
                </button>
              </form>
            </div>
            <div className="flex-1 border-t mt-5 md:mt-0 md:border-t-0 md:border-l md:pl-5">
              <div>
                <CategoryGuidelinesTable />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
