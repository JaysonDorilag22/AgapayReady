import React from "react";

export default function RecentNews() {
  return (
    <div className="card bg-lime-500 p-8 h-screen rounded-lg w-100 h-50">
        <a className="badge bg-black text-white mb-3 p-4 font-medium">Recent News</a>
      <div className="card-container max-h-screen overflow-y-auto">
        <div className="flex mb-4">
          <div className="flex-shrink-0 pr-4">
            <img
              className="w-50 h-50 object-cover rounded-lg mb-3"
              src="https://via.placeholder.com/150"
              alt="Image 1"
            />
          </div>
          <div className="flex-grow">
            <h2 className="font-bold text-xl mb-2">Report 1</h2>
            <p className="overflow-hidden line-clamp-3">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <small>January 31, 2024</small>
          </div>
        </div>
        <div className="flex mb-4">
          <div className="flex-shrink-0 pr-4">
            <img
              className="w-50 h-50 object-cover rounded-lg mb-3"
              src="https://via.placeholder.com/150"
              alt="Image 1"
            />
          </div>
          <div className="flex-grow">
            <h2 className="font-bold text-xl mb-2">Report 2</h2>
            <p className="overflow-hidden line-clamp-3">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <small>January 31, 2024</small>
          </div>
        </div>

        <div className="flex mb-4">
          <div className="flex-shrink-0 pr-4">
            <img
              className="w-50 h-50 object-cover rounded-lg mb-3"
              src="https://via.placeholder.com/150"
              alt="Image 1"
            />
          </div>
          <div className="flex-grow">
            <h2 className="font-bold text-xl mb-2">Report 3</h2>
            <p className="overflow-hidden line-clamp-3">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <small>January 31, 2024</small>
          </div>
        </div>
      </div>
    </div>
  );
}
