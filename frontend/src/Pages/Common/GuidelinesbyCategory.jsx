import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Modal from './Modal';
import axios from 'axios';
import { FaSearch } from "react-icons/fa";

export default function GuidelinesbyCategory() {
  const { categoryId } = useParams();
  const [guidelines, setGuidelines] = useState([]);
  const [selectedGuideline, setSelectedGuideline] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchGuidelinesByCategory = async () => {
      try {
        const response = await axios.get(`/api/v1/category/guidelines/${categoryId}`);
        setGuidelines(response.data);
      } catch (error) {
        console.error('Error fetching guidelines:', error);
      }
    };

    fetchGuidelinesByCategory();

    return () => {
    };
  }, [categoryId]);

  const handleGuidelineClick = async (guidelineId) => {
    try {
      const response = await axios.get(`/api/v1/guidelines/${guidelineId}/steps`);
      setSelectedGuideline(response.data);
      setShowModal(true);
    } catch (error) {
      console.error('Error fetching guideline steps:', error);
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredGuidelines = guidelines.filter((guideline) =>
    guideline.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <h1 className='mt-5 text-red-600 text-2xl text-center font-bold'>Guidelines</h1>

      <div className="flex flex-1 items-center justify-center mb-5 mt-10">
        <div className="w-full max-w-lg">
          <form className="sm:flex sm:items-center">
            <input
              id="q"
              name="q"
              className="inline w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-3 leading-5 placeholder-gray-500 focus:border-red-500 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-red-500 sm:text-sm"
              placeholder="Search Guideline . . ."
              type="search"
              autoFocus=""
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <button
              type="submit"
              className="mt-3 inline-flex w-full items-center justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              <FaSearch/>
            </button>
          </form>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-8 gap-4 p-5">
        {filteredGuidelines.map((guideline, index) => (
          <div key={index} className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <button onClick={() => handleGuidelineClick(guideline._id)}>
              <img className="rounded-t-lg w-full" src={guideline.image} alt={guideline.name} />
              <div className="p-5">
                <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">{guideline.name}</h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{guideline.description}</p>
              </div>
            </button>
          </div>
        ))}
      </div>
      {showModal && <Modal onClose={() => setShowModal(false)} guideline={selectedGuideline} />}
    </>
  );
}
