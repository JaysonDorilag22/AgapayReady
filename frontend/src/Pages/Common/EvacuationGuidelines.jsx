import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaRegCheckCircle, FaSearch } from "react-icons/fa";
import { FaUniversity } from "react-icons/fa";

const EvacuationGuidelines = () => {
  const [guidelines, setGuidelines] = useState([]);

  useEffect(() => {
    fetchEvacuationGuidelines();
  }, []);

  const fetchEvacuationGuidelines = async () => {
    try {
      const response = await fetch('/api/v1/evacuation-guidelines');
      if (!response.ok) {
        throw new Error('Failed to fetch guidelines');
      }
      const data = await response.json();
      setGuidelines(data);
    } catch (error) {
      console.error('Error fetching guidelines:', error);
    }
  };

  return (
    <div className="p-4 mb-10 mt-5">
      <>
      <div className="max-w-xl mx-auto space-y-3 sm:text-center mb-5">
        <h3 className="text-red-600 font-semibold">
          Safety Areas on Campus
        </h3>
        <p className="text-gray-800 text-3xl font-semibold sm:text-4xl">
          Navigating Your Campus Safely
        </p>
        <p>
          Your safety is our priority. Explore the designated safety areas on campus where you can find help, refuge, and support during emergencies. These areas are strategically located to ensure quick access and protection for all members of the campus community.
        </p>
      </div>
      <div className="flex flex-1 items-center justify-center mb-10">
        <div className="w-full max-w-lg">
          {/* Display fetched guidelines */}
          {guidelines.map((guideline) => (
            <Card
              key={guidelines._id}
              Icon={FaUniversity}
              title={guideline.name}
              guidelineId={guideline._id} // Pass the ID to the Card component
            />
          ))}
        </div>
      </div>
      </>
    </div>
  );
};

const Card = ({ Icon, guidelineId, title }) => {
  return (
    <Link to={`/evacuation/guidelines/${guidelineId}`}> {/* Specify the URL to navigate to when clicked */}
      <div className="w-full p-10 rounded border-[1px] border-slate-300 relative overflow-hidden group bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
        <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <Icon className="absolute z-10 -top-12 -right-12 text-9xl text-slate-100 group-hover:text-red-400 group-hover:rotate-12 transition-transform duration-300" />
        <Icon className="mb-2 text-2xl text-red-600 group-hover:text-white transition-colors relative z-10 duration-300" />
        <h3 className="font-medium text-lg text-slate-950 group-hover:text-white relative z-10 duration-300">
          {title}
        </h3>
      </div>
    </Link>
  );
};

export default EvacuationGuidelines;
