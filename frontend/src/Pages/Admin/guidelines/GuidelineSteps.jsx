import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Sidemenu from "../../../components/Sidemenu";
import { AiOutlineClose, AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
export default function GuidelineSteps() {
  const { guidelineId } = useParams();
  const [guideline, setGuideline] = useState({});
  const [steps, setSteps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    stepNumber: "",
    description: "",
    image: null,
    guideline: "",
  });

  useEffect(() => {
    const fetchGuidelineAndSteps = async () => {
      try {
        const response = await axios.get(
          `/api/v1/guidelines/${guidelineId}/steps`
        );
        const { guideline, steps } = response.data;
        setGuideline(guideline);
        setSteps(steps);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchGuidelineAndSteps();
  }, [guidelineId]);

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
    formDataToSend.append("stepNumber", formData.stepNumber);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("image", formData.image);
    formDataToSend.append("guideline", guidelineId);
    try {
      setSubmitting(true);
      console.log(guidelineId);
      const response = await axios.post(`/api/v1/steps`, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setSteps([...steps, response.data]);
      setShowModal(false);
      setSubmitting(false);
    } catch (error) {
      console.error("Error creating step:", error);
      setSubmitting(false);
    }
  };
  const handleDeleteClick = async (stepId) => {
    try {
      await axios.delete(`/api/v1/steps/${stepId}`);
      setSteps(steps.filter((step) => step._id !== stepId));
    } catch (error) {
      console.error("Error deleting step:", error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="flex">
      <section className="fixed left-0 top-0 bottom-0 w-64 bg-white overflow-y-auto border-r border-gray-200">
        <Sidemenu />
      </section>
      <div className="flex-1 ml-64 mr-4 mt-8 p-4">
        <div className="w-full h-auto bg-white rounded-lg shadow-md p-4">
          <h2 className="text-xl font-bold mb-4">{guideline.name}</h2>
          <p className="mb-4">{guideline.description}</p>
          {guideline && (
            <img src={guideline.image} alt={guideline.name} className="w-10" />
          )}

          {/* Modal */}
          {showModal && (
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
              <div className="bg-white p-8 rounded-lg z-10 relative">
                {" "}
                <div className="absolute top-2 right-2">
                  {" "}
                  <AiOutlineClose
                    size={24}
                    onClick={() => setShowModal(false)}
                    className="cursor-pointer"
                  />
                </div>
                <h2 className="text-xl font-bold mb-4">Add New Step</h2>
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label
                      htmlFor="stepNumber"
                      className="block text-sm font-semibold mb-1"
                    >
                      Step no.:
                    </label>
                    <input
                      type="number"
                      id="stepNumber"
                      name="stepNumber"
                      value={formData.stepNumber}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border rounded"
                      required
                    />
                    <label
                      htmlFor="description"
                      className="block text-sm font-semibold mb-1"
                    >
                      Description:
                    </label>
                    <input
                      type="text"
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border rounded"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="image"
                      className="block text-sm font-semibold mb-1"
                    >
                      Image:
                    </label>
                    <input
                      type="file"
                      id="image"
                      name="image"
                      onChange={handleChange}
                      className="w-full px-3 py-2 border rounded"
                      accept="image/*"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    disabled={submitting}
                  >
                    {submitting ? "Adding..." : "Add Step"}{" "}
                  </button>
                </form>
              </div>
            </div>
          )}

          <div className="w-full h-64 border-dotted border-2 border-red-400 flex flex-col justify-center items-center mt-4">
            <div
              className="text-6xl text-red-400 font-bold"
              onClick={() => setShowModal(true)}
            >
              +
            </div>
            <div className="text-lg text-red-600 mt-2">Add Steps</div>
          </div>

          <h3 className="mt-4 mb-2">Steps</h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {steps.map((step) => (
              <li
                key={step._id}
                className="bg-gray-100 rounded-lg p-4 relative"
              >
                <h2 className="text-lg font-semibold">
                  Step: {step.stepNumber}
                </h2>
                <p className="mb-2">{step.description}</p>
                {step.imageUrl && (
                  <img
                    src={step.imageUrl}
                    alt={step.imageUrl}
                    className="w-full mb-2 rounded-md"
                  />
                )}
                <div className="absolute top-2 right-2 flex space-x-2">
                  <Link
                    to={`/admin/update/steps/${step._id}`}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <AiOutlineEdit className="text-blue-500" />
                  </Link>
                  <button
                    onClick={() => handleDeleteClick(step._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <AiOutlineDelete className="text-red-500" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
