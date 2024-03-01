import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  logInStart,
  logInSuccess,
  logInFailure,
} from "../../redux/Users/userSlice";
import logo from '../../assets/services/vite.png'
import axios from "axios";

export default function Login() {
  const { loading, error } = useSelector((state) => state.user);
  const [loginError, setLoginError] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      dispatch(logInStart());
  
      const response = await axios.post(`/api/v1/login`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
  
      console.log("Response:", response); 
  
      if (response.data.success === false) {
        dispatch(logInFailure("Invalid email or password."));
        toast.error("Invalid email or password. Please try again.");
        return;
      }
  
      dispatch(logInSuccess(response.data));
  

      if (response.data.role === 'Admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/');
      }
    } catch (error) {
      console.error("Error occurred:", error);
      dispatch(logInFailure());
      setLoginError("An error occurred while logging in");
    }
  };
  


  return (
    <section className="bg-white">
      <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
        <div className="max-w-xl lg:max-w-3xl">
          <div className="flex items-center justify-center">
            <img src={logo} alt="logo" className="w-40" />
          </div>

          <form onSubmit={handleSubmit} className="mt-8 grid grid-cols-6 gap-6">
            <div className="col-span-6">
              <label
                htmlFor="Email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>

              <input
                type="email"
                id="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="placeholder"
              />
            </div>

            <div className="col-span-6">
              <label
                htmlFor="Password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>

              <input
                type="password"
                id="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="placeholder"
              />
              {loginError && (
                <p className="mt-2 text-sm text-red-600">{loginError}</p>
              )}
            </div>

            <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
              <button
                disabled={loading}
                className="inline-block shrink-0 rounded-md border border-red-600 bg-red-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-red-600 focus:outline-none focus:ring active:text-red-500"
              >
                {loading ? "Loading..." : "Log In"}
              </button>

              <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                Don't have an account?{" "}
                <Link to="/register" className="text-gray-700 underline">
                  Register
                </Link>
                .
              </p>
            </div>
          </form>
        </div>
      </main>
    </section>
  );
}
