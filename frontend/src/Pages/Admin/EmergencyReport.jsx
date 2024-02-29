import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';

const socket = io("http://localhost:4000"); 
export default function EmergencyReport() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    fetchReports(); 

    socket.on('newEmergencyReport', (newReport) => {
      setReports(prevReports => [newReport, ...prevReports]);
    });

    return () => {
      socket.off('newEmergencyReport');
    };
  }, []);

  const fetchReports = async () => {
    try {
      const response = await axios.get('/api/v1/report'); 
      setReports(response.data);
    } catch (error) {
      console.error('Error fetching emergency reports:', error);
    }
  };

  return (
    <div>
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
