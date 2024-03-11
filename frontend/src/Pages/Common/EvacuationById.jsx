import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../Loader';
export default function EvacuationById() {
  const { guidelineId } = useParams();
  const [guideline, setGuideline] = useState(null);

  useEffect(() => {
    // Fetch guideline details by ID
    fetchEvacuationGuideline();
  }, [guidelineId]);

  const fetchEvacuationGuideline = async () => {
    try {
      const response = await fetch(`/api/v1/evacuation-guidelines/${guidelineId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch guideline');
      }
      const data = await response.json();
      setGuideline(data);
    } catch (error) {
      console.error('Error fetching guideline:', error);
    }
  };

  return (
    <div>
      {guideline ? (
        <div>
          <h1>{guideline.name}</h1>
          <p>{guideline.tips}</p>
          <p>{guideline.glbfile}</p>

        </div>
      ) : (
        <Loader/>
      )}
    </div>
  );
}
