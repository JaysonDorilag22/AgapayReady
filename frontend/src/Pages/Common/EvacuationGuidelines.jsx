import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaUniversity, FaSearch } from "react-icons/fa";
import Loader from "../Loader"; // If you have a loader component

const EvacuationGuidelines = () => {
  const [guidelines, setGuidelines] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

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
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredGuidelines = guidelines.filter(guideline =>
    guideline.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-4 mb-10 mt-5">
      {loading ? (
        <Loader /> // Use a loader component while data is being fetched
      ) : (
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
              <div className="flex items-center justify-between mb-5">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder="Search Guidelines"
                  className="p-2 border border-gray-300 rounded-md w-full"
                />
                <FaSearch className="ml-2 text-gray-600" />
              </div>
              <div className="grid gap-4 grid-cols-2 lg:grid-cols-3">
                {filteredGuidelines.map((guideline) => (
                  <Card
                    key={guideline._id}
                    Icon={FaUniversity}
                    title={guideline.name}
                    guidelineId={guideline._id} // Pass the ID to the Card component
                  />
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const Card = ({ Icon, guidelineId, title }) => {
  return (
    <Link to={`/evacuation/guidelines/${guidelineId}`}
    className="w-full p-4 rounded border-[1px] border-slate-300 relative overflow-hidden group bg-white shadow-md hover:shadow-lg transition-shadow duration-300"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <Icon className="absolute z-10 -top-12 -right-12 text-9xl text-slate-100 group-hover:text-red-400 group-hover:rotate-12 transition-transform duration-300" />
      <Icon className="mb-2 text-2xl text-red-600 group-hover:text-white transition-colors relative z-10 duration-300" />
      <h3 className="font-medium text-lg text-slate-950 group-hover:text-white relative z-10 duration-300">
        {title}
      </h3>
    </Link>
  );
};

export default EvacuationGuidelines;
