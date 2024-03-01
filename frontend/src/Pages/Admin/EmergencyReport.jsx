import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { io } from "socket.io-client";

const socket = io("http://localhost:4000");

export default function ReportTable() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    fetchReports();
  
    socket.on("newEmergencyReport", (newReport) => {
      setReports(prevReports => [newReport, ...prevReports]);
    });

    return () => {
      socket.off("newEmergencyReport");
    };
  }, []);

  const fetchReports = async () => {
    try {
      const response = await axios.get("/api/v1/report");
      setReports(response.data);
    } catch (error) {
      console.error("Error fetching reports:", error);
      toast.error("Failed to fetch reports");
    }
  };

  const handleConfirmReport = async (reportId, reporterUserId) => {
    try {
      await axios.post("/api/v1/report-confirm", {
        reportId,
        userId: reporterUserId,
      });
      // Optionally, you can update the UI to reflect the confirmation
      toast.success("Report confirmed successfully");
    } catch (error) {
      console.error("Error confirming report:", error);
      toast.error("Failed to confirm report");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Emergency Reports</h2>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Location
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Description
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Image
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report) => (
            <tr key={report._id}>
              <td className="px-6 py-4 whitespace-nowrap">{report.location}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {report.description}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <img src={report.image} alt="Report" className="h-12" />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {!report.confirmed && (
                  <button
                    onClick={() => handleConfirmReport(report._id, report.user)}
                    className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600"
                  >
                    Confirm
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ToastContainer />
    </div>
  );
}
