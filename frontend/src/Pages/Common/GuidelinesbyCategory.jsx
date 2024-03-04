import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Modal from '../../components/Modal';
import axios from 'axios';

export default function GuidelinesbyCategory() {
  const { categoryId } = useParams();
  const [guidelines, setGuidelines] = useState([]);
  const [selectedGuideline, setSelectedGuideline] = useState(null); // State to keep track of the selected guideline
  const [showModal, setShowModal] = useState(false); // State to control the visibility of the modal

  useEffect(() => {
    // Define a function to fetch guidelines by category ID
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

  // Function to handle guideline card click
  const handleGuidelineClick = async (guidelineId) => {
    try {
      const response = await axios.get(`/api/v1/guidelines/${guidelineId}/steps`);
      // Set the selected guideline and show the modal
      setSelectedGuideline(response.data);
      setShowModal(true);
    } catch (error) {
      console.error('Error fetching guideline steps:', error);
    }
  };

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 p-5">
        {guidelines.map((guideline, index) => (
          <div key={index} className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <button onClick={() => handleGuidelineClick(guideline._id)}>
              <img className="rounded-t-lg w-full" src={guideline.image} alt={guideline.name} />
              <div className="p-5">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{guideline.name}</h5>
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