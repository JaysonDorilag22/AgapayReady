import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Sidemenu from "../../../components/Sidemenu";
export default function GuidelineSteps() {
  const { guidelineId } = useParams();
  const [guideline, setGuideline] = useState({});
  const [steps, setSteps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGuidelineAndSteps = async () => {
      try {
        const response = await axios.get(
          `/api/v1/guidelines/${guidelineId}/steps`
          // `${import.meta.env.VITE_PORT}/api/v1/login`
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="flex">
    <section className="fixed left-0 top-0 bottom-0 w-64 bg-white overflow-y-auto border-r border-gray-200">
      <Sidemenu />
    </section>
    <div className="flex-1 ml-64 mr-4 mt-8 p-4">
      <div className="w-full h-auto bg-white rounded-lg shadow-md p-4">
        <h2 className="text-xl font-bold mb-4">{guideline && guideline.name}</h2>
        <p className="mb-4">{guideline && guideline.description}</p>
        <p className="mb-4">{guideline && guideline._id}</p>
        {guideline && (
          <img src={guideline.image} alt={guideline.name} className="w-10" />
        )}
  
        <h3 className="mt-4 mb-2">Steps</h3>
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {steps.map((step) => (
            <li key={step._id} className="bg-gray-100 rounded-lg p-4">
              <h2 className="text-lg font-semibold">Step: {step.stepNumber}</h2>
              <p className="mb-2">{step.description}</p>
              {step.imageUrl && (
                <img src={step.imageUrl} alt={step.imageUrl} className="w-full mb-2 rounded-md" />
              )}
            </li>
          ))}
        </ul>
  
        <div className="w-full h-64 border-dotted border-2 border-red-400 flex flex-col justify-center items-center mt-4">
          <div className="text-6xl text-red-400 font-bold">+</div>
          <div className="text-lg text-red-600 mt-2">Add Steps</div>
        </div>
      </div>
    </div>
  </div>
  
  );
}
