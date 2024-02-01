import React from "react";
import Updates from "../Components/Updates";
import RecentNews from "../Components/RecentNews";

export default function landingPage() {
  return (
    <div className="flex flex-col md:flex-row items-center p-10">
    <Updates />
    <RecentNews />
  </div>
  );
}
