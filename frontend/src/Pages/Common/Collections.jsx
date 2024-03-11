import React, { useState } from 'react';
import axios from 'axios';

const Collections = () => {
  const [keyword, setKeyword] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/v1/search?keyword=${keyword}`);
      setResults(response.data);
    } catch (error) {
      setError('Error fetching search results');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Collections Search</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Enter keyword"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="border border-gray-300 rounded-md py-2 px-4 w-full"
        />
      </div>
      <button
        onClick={handleSearch}
        disabled={loading}
        className="bg-blue-500 text-white py-2 px-4 rounded-md"
      >
        {loading ? 'Searching...' : 'Search'}
      </button>

      {error && <div className="text-red-500 mt-4">{error}</div>}

      {results && (
        <div className="mt-8">
          <h2 className="text-lg font-bold mb-4">Contacts</h2>
          <pre className="bg-gray-100 p-4 rounded-md overflow-auto">
            {JSON.stringify(results.contacts, null, 2)}
          </pre>

          <h2 className="text-lg font-bold mt-4 mb-4">Guidelines</h2>
          <pre className="bg-gray-100 p-4 rounded-md overflow-auto">
            {JSON.stringify(results.guidelines, null, 2)}
          </pre>

          <h2 className="text-lg font-bold mt-4 mb-4">Categories (Contacts)</h2>
          <pre className="bg-gray-100 p-4 rounded-md overflow-auto">
            {JSON.stringify(results.categoriesContacts, null, 2)}
          </pre>

          <h2 className="text-lg font-bold mt-4 mb-4">Categories (Guidelines)</h2>
          <pre className="bg-gray-100 p-4 rounded-md overflow-auto">
            {JSON.stringify(results.categoriesGuidelines, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default Collections;
