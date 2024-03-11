import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import axios from "axios";
import {
  logOutUserStart,
  deleteUserFailure,
  deleteUserSuccess,
} from "../../redux/Users/userSlice";
import { HiOutlineHome, HiOutlineUser} from 'react-icons/hi';
import { IoIosLogOut } from "react-icons/io";
import { RiGuideLine } from "react-icons/ri";
import { BiCategory } from "react-icons/bi";
import { RiContactsBook2Line } from "react-icons/ri";
import { MdOutlinePhone, MdOutlineEmergencyShare } from "react-icons/md";
import { Link, useLocation } from "react-router-dom"; 
import AgapayReadylogo from "../../assets/services/vite.png";
import { GrMap } from "react-icons/gr";
const navigation = [
  { name: "Dashboard", to: "/admin/dashboard", icon: HiOutlineHome },
  { name: "Departments", to: "/admin/department/table", icon: HiOutlineUser },
  { name: "Contacts", to: "/admin/contact/table", icon: MdOutlinePhone },
  { name: "Guidelines", to: "/admin/guideline/table", icon: RiGuideLine },
  { name: "Contacts Category", to: "/admin/contact/category/table", icon: RiContactsBook2Line },
  { name: "Guidelines Category", to: "/admin/guideline/category/table", icon: BiCategory },
  { name: "Emergency Report", to: "/admin/report", icon: MdOutlineEmergencyShare },
  { name: "Evacuation Guidelines", to: "/admin/evacuation/table", icon: GrMap },
];

export default function AdminNavbar() {
  const dispatch = useDispatch();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handlelogout = async () => {
    try {
      dispatch(logOutUserStart());
      const response = await axios.get(`/api/v1/logout`);
      const data = await response.data;

      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        navigate("/");
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={toggleSidebar}
        className="text-gray-500 hover:text-gray-600 mt-2 ml-2"
        aria-controls="docs-sidebar"
        aria-label="Toggle navigation"
      >
        <span className="sr-only">Toggle Navigation</span>
        <svg className="flex-shrink-0 size-4" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
        </svg>
      </button>
      <div
        id="docs-sidebar"
        className={`hs-overlay transition-all duration-300 transform fixed top-0 start-0 bottom-0 z-[60] w-64 bg-white border-e border-gray-200 pt-7 pb-10 overflow-y-auto lg:block lg:translate-x-0 lg:end-auto lg:bottom-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300`}
      >
        <div className="px-6 flex justify-center">
          <Link to="/" className="flex-none text-xl font-semibold" aria-label="Brand">
            <img src={AgapayReadylogo} className='w-20'/>
          </Link>
          <button
            type="button"
            onClick={toggleSidebar}
            className="absolute top-0 right-0 mt-2 mr-2 lg:hidden"
            aria-label="Close"
          >
            <svg
              className="w-6 h-6 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <nav className="hs-accordion-group p-6 w-full flex flex-col flex-wrap" data-hs-accordion-always-open>
          <ul className="space-y-1.5">
            {navigation.map((item, index) => (
              <li key={index}>
                <Link
                  to={item.to}
                  className={`flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-lg  hover:bg-slate-300 ${
                    location.pathname === item.to ? 'bg-slate-300' : ''
                  }`}
                >
                  {item.icon && <item.icon className="size-4" />}
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
            <li>
              <Link
                to="/admin/profile"
                className={`flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-lg  hover:bg-slate-400 ${
                  location.pathname === "/admin/profile" ? 'bg-slate-300' : ''
                }`}
              >
                <HiOutlineUser className="size-4" />
                <span>Admin Profile</span>
              </Link>
            </li>
            <li>
              <Link
                to="/"
                onClick={handlelogout}
                className={`flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-lg hover:bg-slate-400`}
              >
                <IoIosLogOut className="size-4" />
                <span>Logout</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
