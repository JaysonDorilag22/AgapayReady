import React from "react";
import Vite from "../assets/services/AgapayReadylogo.png";

export default function Loader() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col gap-4 items-center">
        <div className="w-28 h-28 border-8 text-red-400 text-4xl animate-spin border-gray-300 flex items-center justify-center border-t-red-400 rounded-full">
          <img src={Vite} alt="Vite Logo" className="animate-ping w-5" />
        </div>
      </div>
    </div>
  );
}
