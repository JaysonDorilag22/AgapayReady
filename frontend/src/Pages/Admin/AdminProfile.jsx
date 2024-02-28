import React from "react";
import { useSelector } from "react-redux";
import Sidemenu from "../../components/Sidemenu";
export default function AdminProfile() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="flex">
      <section className="fixed left-0 top-0 bottom-0 w-64 bg-white overflow-y-auto border-r border-gray-200">
        <Sidemenu />
      </section>
      <div className="border-blue-700 w-10 h-10">

      </div>
 
    </div>
  );
}
