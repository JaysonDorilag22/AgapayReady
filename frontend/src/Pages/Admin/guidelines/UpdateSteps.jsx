import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function UpdateSteps() {
    const navigate = useNavigate();
  const { stepId } = useParams();
  const [step, setStep] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    stepNumber: "",
    description: "",
    image: null,
    guideline: "",
  });
  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    const fetchStep = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/steps/${stepId}`);
        setStep(response.data);
        setFormData({
          stepNumber: response.data.stepNumber,
          description: response.data.description,
          image: response.data.imageUrl, 
          guideline: response.data.guideline,
        });
        setLoading(false);
        // Set image preview if image exists
        if (response.data.imageUrl) {
          setImagePreview(response.data.imageUrl);
        }
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchStep();
  }, [stepId]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      const imageFile = files[0];
      setFormData((prevState) => ({
        ...prevState,
        image: imageFile,
      }));

      // Display image preview
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagePreview(reader.result);
        }
      };
      reader.readAsDataURL(imageFile);
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleRemoveImage = () => {
    setFormData((prevState) => ({
      ...prevState,
      image: null,
    }));
    setImagePreview("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("stepNumber", formData.stepNumber);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("image", formData.image);
    formDataToSend.append("guideline", step.guideline);
    try {
      const response = await axios.put(
        `/api/v1/steps/${stepId}`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setStep(response.data);
      navigate(`${import.meta.env.VITE_BACKEND_URL}/admin/guidelines/${step.guideline}`); // Navigate to the specific guideline
    } catch (error) {
      console.error("Error updating step:", error);
    }
  };
  

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="max-w-lg mx-auto mt-8 p-4 bg-gray-100 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Update Steps</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-semibold">Step Number:</label>
          <input
            type="number"
            name="stepNumber"
            value={formData.stepNumber}
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
            <div className="mt-2 flex items-center">
              <img src={imagePreview} alt="Image Preview" className="w-20 h-20 mr-2 rounded" />
              <button
                type="button"
                onClick={handleRemoveImage}
                className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Remove Image
              </button>
            </div>
          )}
        </div>
        
        <button
          type="submit"
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Update
        </button>
      </form>
    </div>
  );
}
