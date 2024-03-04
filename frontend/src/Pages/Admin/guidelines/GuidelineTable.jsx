import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaTrash, FaPen } from "react-icons/fa";

export default function GuidelineTable() {
  const [guidelines, setGuidelines] = useState([]);

  useEffect(() => {
    fetchGuidelines();
  }, []);
  
  const fetchGuidelines = async () => {
    try {
      const response = await axios.get(`/api/v1/guidelines`);
      console.log("Fetched guidelines:", response.data);
      setGuidelines(response.data);
    } catch (error) {
      console.error("Error fetching guidelines:", error);
    }
  };
  

  const handleDelete = async (guidelineId) => {
    try {
      await axios.delete(`/api/v1/guidelines/${guidelineId}`);
      setGuidelines((prevGuidelines) =>
        prevGuidelines.filter((guideline) => guideline._id !== guidelineId)
      );
    } catch (error) {
      console.error("Error deleting guideline:", error);
    }
  };

  return (
    <div className="w-full mx-auto mt-8 flex justify-center">
      <div className="overflow-x-auto">
        <table className="table-auto w-full text-sm">
          <thead>
            <tr>
              <th className="px-4 py-1">Name</th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2">Image</th>
              <th className="px-4 py-2">Steps</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {guidelines &&
              guidelines.map((guideline) => (
                <tr key={guideline._id}>
                  <td className="border px-4 py-2">{guideline.name}</td>
                  <td className="border px-4 py-2">{guideline.description}</td>
                  <td className="border px-4 py-2">
                    {guideline.image && (
                      <img
                        src={guideline.image}
                        alt={guideline.name}
                        className="h-10 w-10 object-cover"
                      />
                    )}
                  </td>
                  <td className="border px-4 py-2">
                    <Link
                      to={`/admin/guidelines/${guideline._id}`}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                      Steps
                    </Link>
                  </td>
                  <td className="border px-4 py-2">
                    <div className="flex ">
                      <Link
                        to={`/admin/update/guidelines/${guideline._id}`}
                        className="mr-2 text-blue-500"
                      >
                        <FaPen />
                      </Link>
                      <button
                        onClick={() => handleDelete(guideline._id)}
                        className="text-red-500"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
