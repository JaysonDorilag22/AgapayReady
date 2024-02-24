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
      <h2>{guideline && guideline.name}</h2>
      <p>{guideline && guideline.description}</p>
      <p>{guideline && guideline._id}</p>
      {guideline && (
        <img src={guideline.image} alt={guideline.name} className="w-10" />
      )}

      <h3>Steps</h3>
      <ul>
        {steps.map((step) => (
          <li key={step._id}>
            <h2>Step: {step.stepNumber}</h2>

            {step.description}
            {step.imageUrl && (
              <img src={step.imageUrl} alt={step.imageUrl} className="w-10" />
            )}
          </li>
        ))}
      </ul>
    </div>
    </div>
  );
}
