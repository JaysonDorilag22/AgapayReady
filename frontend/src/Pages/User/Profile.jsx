import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Profile() {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [department, setDepartment] = useState(null);

  useEffect(() => {
    const fetchDepartment = async () => {
      try {
        const response = await fetch(`/api/v1/departments/${currentUser.department}`);
        if (!response.ok) {
          throw new Error("Failed to fetch department data");
        }
        const data = await response.json();
        setDepartment(data);
      } catch (error) {
        console.error("Error fetching department data:", error);
      }
    };

    if (currentUser && currentUser.department) {
      fetchDepartment();
    }
  }, [currentUser]);

  return (
    <div className="p-16 flex justify-center bg-slate-300">
      <div className="relative w-full max-w-screen-lg">
        <img className="w-full h-96 object-cover rounded-t-xl" src={currentUser.coverPhoto} alt="Cover Photo" />
        <div className="absolute inset-0 bg-black opacity-50 rounded-t-xl"></div>
        <div className="p-8 bg-white shadow -mt-20 relative">
          <div className="grid grid-cols-1 md:grid-cols-3">
            <div className="grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0">
              <div>
                <p className="font-bold text-gray-700 text-xl">22</p>
                <p className="text-gray-400">Guidelines</p>
              </div>
              <div>
                <p className="font-bold text-gray-700 text-xl">10</p>
                <p className="text-gray-400">Reports</p>
              </div>
              <div>
                <p className="font-bold text-gray-700 text-xl">89</p>
                <p className="text-gray-400">Contacts</p>
              </div>
            </div>
            <div className="relative">
              <div className="w-48 h-48 bg-indigo-100 mx-auto rounded-full  absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
                <img src={currentUser.avatar} alt="Avatar" className="w-48 h-48 rounded-full" />
              </div>
            </div>
            <div className="space-x-8 flex justify-between mt-32 md:mt-0 md:justify-center">
              <button className="text-white py-2 px-4 rounded bg-red-400 hover:bg-red-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
                Edit Profile
              </button>
              <button className="text-white py-2 px-4 rounded bg-gray-700 hover:bg-gray-800 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
                Send Report
              </button>
            </div>
          </div>
          <div className="mt-20 text-center border-b pb-12">
            <h1 className="text-4xl font-medium text-gray-700">{currentUser.firstname} {currentUser.lastname}</h1>
            <p className="font-light text-gray-600 mt-3">{currentUser.email}</p>
            {department && (
              <>
                <p className="mt-8 text-gray-500">{department.name}</p>
                <p className="mt-2 text-gray-500">{department.description}</p>
              </>
            )}
            <p className="mt-2 text-gray-500">Technological University of the Philippines</p>
          </div>
          {/* <div className="mt-12 flex flex-col justify-center">
            <p className="text-gray-600 text-center font-light lg:px-16">An artist of considerable range, Ryan — the name taken by Melbourne-raised, Brooklyn-based Nick Murphy — writes, performs and records all of his own music, giving it a warm, intimate feel with a solid groove structure. An artist of considerable range.</p>
            <button className="text-indigo-500 py-2 px-4 font-medium mt-4">
              Show more
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
}
