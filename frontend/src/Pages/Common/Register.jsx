import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

export default function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    departmentId: "",
    avatar: null,
    departments: [],
  });

  const validationSchema = Yup.object({
    firstname: Yup.string().required('Password is equired'),
    lastname: Yup.string().required('Password is equired'),
    email: Yup.string().email('Invalid email address').required('Email is equired'),
    password: Yup.string().required('Password is equired'),
    departmentId: Yup.string().required('Password is equired'),

  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, avatar: e.target.files[0] });
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const response = await axios.get(`api/v1/departments`);
      setFormData((prevState) => ({
        ...prevState,
        departments: response.data,
      }));
    } catch (error) {
      console.error("Error fetching departments", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const { firstname, lastname, email, password, avatar, departmentId } =
      formData;

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("firstname", firstname);
      formDataToSend.append("lastname", lastname);
      formDataToSend.append("email", email);
      formDataToSend.append("password", password);
      formDataToSend.append("departmentId", departmentId);
      formDataToSend.append("avatar", avatar); 

      await axios.post(`/api/v1/register`, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("User registered successfully");
      navigate("/login");
      setLoading(false);

    } catch (error) {
      console.error("Registration failed", error);
    }
  };

  return (
    <>
      <section className="bg-white">
        <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <section className="relative flex h-32 place-items-center justify-end mb-4 bg-gray-900 lg:col-span-5 lg:h-screen xl:col-span-6">
            <img
              alt="Night"
              src="https://the-post-assets.sgp1.digitaloceanspaces.com/2022/12/TUP_thumbnail.png"
              className="absolute inset-0 h-full w-full object-cover opacity-60"
            />

            <div className="hidden lg:relative lg:block lg:p-12">
              <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
                Welcome to AgapayReady
              </h2>
              <p className="mt-4 leading-relaxed text-white/90">
              Find peace of mind during emergencies at TUP-Taguig with AgapayReady. We offer helpful guidance to keep you safe and empowered.
              </p>
            </div>
          </section>

          <main className="flex items-center justify-center px-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
            <div className="max-w-xl lg:max-w-3xl">
              <div className="relative mb-10 block place-items-center lg:hidden">

                <h1 className="mt-2 text-2xl text-center font-bold text-gray-900 sm:text-3xl md:text-4xl">
                  Welcome to AgapayReady
                </h1>

                <p className="mt-3 text-center leading-relaxed text-gray-500">
                Find peace of mind during emergencies at TUP-Taguig with AgapayReady. <br/> We offer helpful guidance to keep you safe and empowered.

                </p>
              </div>
              <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="text-center text-3xl font-bold leading-9 tracking-tight text-red-600">
                  Register now
                </h2>
              </div>
              <form
                onSubmit={handleSubmit}
                className="mt-5 grid grid-cols-6 gap-6"
              >
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="FirstName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    First Name
                  </label>

                  <input
                    type="text"
                    id="FirstName"
                    name="firstname"
                    value={formData.firstname}
                    onChange={handleChange}
                    className="block mt-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="LastName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Last Name
                  </label>

                  <input
                    type="text"
                    id="LastName"
                    name="lastname"
                    value={formData.lastname}
                    onChange={handleChange}
                    className="block mt-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                  />
                </div>

                <div className="col-span-6">
                  <label
                    htmlFor="Email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    {" "}
                    Email{" "}
                  </label>

                  <input
                    type="email"
                    id="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="block mt-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="Password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    {" "}
                    Password{" "}
                  </label>

                  <input
                    type="password"
                    id="Password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="block mt-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="Department"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Department
                  </label>
                  <select
                    id="Department"
                    name="departmentId"
                    value={formData.departmentId}
                    onChange={handleChange}
                    className="block mt-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                  >
                    <option value="">Select Department</option>
                    {formData.departments.map((department) => (
                      <option key={department._id} value={department._id}>
                        {department.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-span-6 sm:col-span-6">
                  <label
                    htmlFor="Avatar"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Profile
                  </label>
                  <input
                    type="file"
                    className="file-input file-input-bordered w-full mt-2 sm:text-sm sm:leading-6"
                    name="avatar"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </div>

                <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                  <button
                    disabled={loading}
                    className="flex w-full justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                  >
                    {loading ? "Creating account..." : "Create an account"}
                  </button>
                </div>
              </form>
              <p className="mt-5 text-center text-sm text-gray-500">
                Already have an account?{" "}
                <Link
                  to={"/login"}
                  className="font-semibold leading-6 text-red-600 hover:text-red-500"
                >
                  Log in
                </Link>
              </p>
            </div>
          </main>
        </div>
      </section>
    </>
  );
}
