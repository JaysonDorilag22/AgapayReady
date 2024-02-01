import { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [responseData, setResponseData] = useState(null);

  const handleSubmit = async () => {
    try {
      const response = await axios.get('/api/test/test');
      setResponseData(response.data);
      console.log(response.data);  // Log the response to the console
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <>
      <button onClick={handleSubmit}>Test Backend Connection</button>
      {responseData && (
        <div>
          <p>Response from the server:</p>
          <pre>{JSON.stringify(responseData, null, 2)}</pre>
        </div>
      )}
    </>
  );
}

export default App;
