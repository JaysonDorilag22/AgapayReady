import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';
import Sidemenu from '../../components/Sidemenu';

const socket = io("http://localhost:4000"); // Establish Socket.IO connection

export default function EmergencyReport() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    fetchReports(); // Fetch initial reports on component mount

    // Listen for new reports in real-time
    socket.on('newEmergencyReport', (newReport) => {
      // Update reports state by adding the new report to the beginning of the array
      setReports(prevReports => [newReport, ...prevReports]);
    });

    // Clean up event listener on component unmount
    return () => {
      socket.off('newEmergencyReport');
    };
  }, []);

  const fetchReports = async () => {
    try {
      const response = await axios.get('/api/v1/report'); // Correct endpoint
      setReports(response.data);
    } catch (error) {
      console.error('Error fetching emergency reports:', error);
    }
  };

  return (
    <div className='flex'>
    <section className="fixed left-0 top-0 bottom-0 w-64 bg-white overflow-y-auto border-r border-gray-200">
        <Sidemenu />
      </section>
      <div className="flex-1 ml-64 mr-4 mt-8 p-4 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Emergency Reports</h2>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {reports.map((report, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap">{report.location}</td>
              <td className="px-6 py-4 whitespace-nowrap">{report.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
}
