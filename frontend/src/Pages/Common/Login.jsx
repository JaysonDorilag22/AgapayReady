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



    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8" >
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-40 w-auto"
            src= {logo}
            alt="Your Company"
          />
          <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Log in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} className="space-y-6" action="#" method="POST">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-red-600 hover:text-red-500">
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                   onChange={handleChange}
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="flex w-full justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
              >
              
                {loading ? "Loading..." : "Log In"}
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            No account?{' '}
            <Link to={"/register"} className="font-semibold leading-6 text-red-600 hover:text-red-500">
              Register 
            </Link>
          </p>
        </div>
      </div>
    // <section className="bg-white">
    //   <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
    //     <div className="max-w-xl lg:max-w-3xl">
    //       <div className="flex items-center justify-center">
    //         <img src={logo} alt="logo" className="w-40" />
    //       </div>

    //       <form onSubmit={handleSubmit} className="mt-8 grid grid-cols-6 gap-6">
    //         <div className="col-span-6">
    //           <label
    //             htmlFor="Email"
    //             className="block text-sm font-medium text-gray-700"
    //           >
    //             Email
    //           </label>

    //           <input
    //             type="email"
    //             id="Email"
    //             name="email"
    //             value={formData.email}
    //             onChange={handleChange}
    //             className="placeholder"
    //           />
    //         </div>

    //         <div className="col-span-6">
    //           <label
    //             htmlFor="Password"
    //             className="block text-sm font-medium text-gray-700"
    //           >
    //             Password
    //           </label>

    //           <input
    //             type="password"
    //             id="Password"
    //             name="password"
    //             value={formData.password}
    //             onChange={handleChange}
    //             className="placeholder"
    //           />
    //           {loginError && (
    //             <p className="mt-2 text-sm text-red-600">{loginError}</p>
    //           )}
    //         </div>

    //         <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
    //           <button
    //             disabled={loading}
    //             className="inline-block shrink-0 rounded-md border border-red-600 bg-red-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-red-600 focus:outline-none focus:ring active:text-red-500"
    //           >
    //             {loading ? "Loading..." : "Log In"}
    //           </button>

    //           <p className="mt-4 text-sm text-gray-500 sm:mt-0">
    //             Don't have an account?{" "}
    //             <Link to="/register" className="text-gray-700 underline">
    //               Register
    //             </Link>
    //             .
    //           </p>
    //         </div>
    //       </form>
    //     </div>
    //   </main>
    // </section>
  );
}
