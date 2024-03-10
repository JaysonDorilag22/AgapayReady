import React from "react";
import EmergencyReportForm from "./EmergencyReportForm";
import GuidelineCollections from "../Common/GuidelineCollections";
import ContactsCollection from "../Common/ContactsCollections";
import FeedbackForm from "./FeedbackForm";
import WeatherCondition from "../Common/WeatherCondition";

export default function UserDashboard() {
  return (
    <div className=" grid grid-cols-1 lg:grid-cols-4">
      <div className="mt-7">
        <WeatherCondition />
      </div>
      <div>
        <EmergencyReportForm />
      </div>
      <div>
        <FeedbackForm />
      </div>
      <div className="bg-slate-200 shadow-xl">
        <GuidelineCollections />
      </div>
      <div>
        <ContactsCollection />
      </div>
    </div>
  );
}
