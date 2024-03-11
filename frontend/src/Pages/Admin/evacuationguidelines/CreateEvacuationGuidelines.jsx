import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function CreateEvacuationGuidelines() {
  const [name, setName] = useState('');
  const [tips, setTips] = useState([]);
  const [tipInput, setTipInput] = useState('');
  const [glbfile, setGlbFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('tips', JSON.stringify(tips));
      formData.append('glbfile', glbfile);

      await axios.post('/api/v1/evacuation-guidelines', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success('Evacuation guidelines created successfully!');
      // Navigate to the evacuation table
      navigate('/admin/evacuation/table');
    } catch (error) {
      console.error('Error creating evacuation guidelines:', error);
      toast.error('Failed to create evacuation guidelines');
    } finally {
      setLoading(false);
    }
  };

  const handleAddTip = () => {
    if (tipInput.trim() !== '') {
      setTips([...tips, tipInput.trim()]);
      setTipInput('');
    }
  };

  const handleCancel = () => {
    // You can implement cancel functionality here,
    // such as clearing form inputs or redirecting to another page.
    // For example:
    navigate('/admin/evacuation/table');
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="max-w-lg w-full bg-white p-4 rounded-md shadow-md m-4">
        <form onSubmit={handleSubmit}>
          <h2 className="text-lg font-semibold mb-4">Create Evacuation Guidelines</h2>
          <div className="space-y-6">
            <div>
              <label htmlFor="evacuation-name" className="block text-sm font-medium text-gray-700">Name</label>
              <input type="text" id="evacuation-name" value={name} onChange={(e) => setName(e.target.value)} autoComplete="off" className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm" required />
            </div>
            
            <div>
              <label htmlFor="tip-input" className="block text-sm font-medium text-gray-700">Tips</label>
              <textarea id="tip-input" value={tipInput} onChange={(e) => setTipInput(e.target.value)} placeholder="Enter a tip..." className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm"></textarea>
              <button type="button" onClick={handleAddTip} className="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">Add Tip</button>
              <ul className="mt-2">
                {tips.map((tip, index) => (
                  <li key={index} className="text-sm text-gray-900">{tip}</li>
                ))}
              </ul>
            </div>
            
            <div>
              <label htmlFor="glb-file" className="block text-sm font-medium text-gray-700">GLB File</label>
              <input type="file" name="glbfile" onChange={(e) => setGlbFile(e.target.files[0])} required />
            </div>
          </div>
      
          <div className="mt-6 flex justify-end">
            <button type="button" onClick={handleCancel} className="mr-2 inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">Cancel</button>
            <button type="submit" disabled={loading} className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">{loading ? 'Creating...' : 'Create'}</button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}
