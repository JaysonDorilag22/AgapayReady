import React from "react";
import EmergencyReportForm from "./EmergencyReportForm";
import GuidelineCollections from "../Common/GuidelineCollections";
import ContactsCollection from "../Common/ContactsCollections";
import FeedbackForm from "./FeedbackForm";
import WeatherCondition from "../Common/WeatherCondition";

export default function UserDashboard() {
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
      <ContactsCollection/>
    </div>
  </div>
  
  );
}
