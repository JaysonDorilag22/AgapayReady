import React, { useEffect } from "react";
import EmergencyReportForm from "./EmergencyReportForm";
import FeedbackForm from "./FeedbackForm";
import WeatherCondition from "../Common/WeatherCondition";
import Collections from "../Common/Collections";
import io from "socket.io-client";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const socket = io("http://localhost:4000"); // Adjust the URL accordingly

export default function UserDashboard() {
  useEffect(() => {
    socket.on("notification", handleNotification);

    return () => {
      socket.off("notification", handleNotification);
    };
  }, []);

  const handleNotification = (data) => {
    toast.success(data.message);
  };

  return (
    <div>
      <div className="grid grid-cols-3 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <div className="mt-2 p-4 sm:p-10">
          <WeatherCondition />
        </div>
        <div className="p-4 sm:p-10">
          <EmergencyReportForm />
        </div>
        <div className="p-4 sm:p-10">
          <FeedbackForm />
        </div>
      </div>
      <div className="container mx-auto px-4 sm:px-8 xl:px-20 mt-10 outline outline-1 outline-slate-500 rounded-md mb-5">
        <Collections />
      </div>
    </div>
  );
}
