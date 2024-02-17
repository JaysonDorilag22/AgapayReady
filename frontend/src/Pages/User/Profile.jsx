import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Profile() {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch user profile data
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      // Make a request to your backend to fetch the user profile
      const response = await axios.get('/api/v1/profile', {
        headers: {
          'Content-Type': 'application/json',
          // Include credentials: 'include' if you're using cookies for authentication
          // withCredentials: true,
        },
      });

      // Parse the response
      setUserData(response.data);
    } catch (error) {
      setError(error.message);
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>User Profile</h1>
      <img src={userData.avatar}/>
      <div>
        <strong>First Name:</strong> {userData.firstname}
      </div>
      <div>
        <strong>Last Name:</strong> {userData.lastname}
      </div>
      <div>
        <strong>Email:</strong> {userData.email}
      </div>
    </div>
  );
}
