import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

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
    firstname: Yup.string().required("Firstname is required"),
    lastname: Yup.string().required("Lastname is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
    departmentId: Yup.string().required("Department is required"),
    avatar: Yup.mixed().required("Profile is required"),
  });

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

  return (
    <>
      <section className="bg-white">
        <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
          {/* Left section */}
          <section className="relative flex h-32 place-items-center justify-end mb-4 bg-gray-900 lg:col-span-5 lg:h-screen xl:col-span-6">
            {/* Image */}
            <img
              alt="Night"
              src="https://the-post-assets.sgp1.digitaloceanspaces.com/2022/12/TUP_thumbnail.png"
              className="absolute inset-0 h-full w-full object-cover opacity-60"
            />
            {/* Text */}
            <div className="hidden lg:relative lg:block lg:p-12">
              <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
                Welcome to AgapayReady
              </h2>
              <p className="mt-4 leading-relaxed text-white/90">
                Find peace of mind during emergencies at TUP-Taguig with
                AgapayReady. We offer helpful guidance to keep you safe and
                empowered.
              </p>
            </div>
          </section>

          {/* Right section */}
          <main className="flex items-center justify-center px-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
            <div className="max-w-xl lg:max-w-3xl">
              <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="text-center text-3xl font-bold leading-9 tracking-tight text-red-600">
                  Register now
                </h2>
              </div>
              <Formik
                initialValues={formData}
                validationSchema={validationSchema}
                onSubmit={async (values) => {
                  setLoading(true);
                  try {
                    const formDataToSend = new FormData();
                    Object.entries(values).forEach(([key, value]) => {
                      formDataToSend.append(key, value);
                    });
                    await axios.post(`/api/v1/register`, formDataToSend, {
                      headers: {
                        "Content-Type": "multipart/form-data",
                      },
                    });
                    console.log("User registered successfully");
                    navigate("/email-verification");
                  } catch (error) {
                    console.error("Registration failed", error);
                  }
                  setLoading(false);
                }}
              >
                {({ isSubmitting, setFieldValue }) => (
                  <Form className="mt-5 grid grid-cols-6 gap-6">
                    {/* First Name */}
                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="firstname" className="block text-sm font-medium text-gray-700">
                        First Name
                      </label>
                      <Field type="text" id="firstname" name="firstname" className="placeholder" />
                      <ErrorMessage name="firstname" component="div" className="text-red-600 text-sm mt-1" />
                    </div>
                    {/* Last Name */}
                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="lastname" className="block text-sm font-medium text-gray-700">
                        Last Name
                      </label>
                      <Field type="text" id="lastname" name="lastname" className="placeholder" />
                      <ErrorMessage name="lastname" component="div" className="text-red-600 text-sm mt-1" />
                    </div>
                    {/* Email */}
                    <div className="col-span-6">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email
                      </label>
                      <Field type="email" id="email" name="email" className="placeholder" />
                      <ErrorMessage name="email" component="div" className="text-red-600 text-sm mt-1" />
                    </div>
                    {/* Password */}
                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Password
                      </label>
                      <Field type="password" id="password" name="password" className="placeholder" />
                      <ErrorMessage name="password" component="div" className="text-red-600 text-sm mt-1" />
                    </div>
                    {/* Department */}
                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="departmentId" className="block text-sm font-medium text-gray-700">
                        Department
                      </label>
                      <Field as="select" id="departmentId" name="departmentId" className="placeholder">
                        <option value="">Select Department</option>
                        {formData.departments.map((department) => (
                          <option key={department._id} value={department._id}>{department.name}</option>
                        ))}
                      </Field>
                      <ErrorMessage name="departmentId" component="div" className="text-red-600 text-sm mt-1" />
                    </div>
                    {/* Avatar */}
                    <div className="col-span-6 sm:col-span-6">
                      <label htmlFor="avatar" className="block text-sm font-medium text-gray-700">
                        Profile
                      </label>
                      <input
                        type="file"
                        id="avatar"
                        name="avatar"
                        accept="image/*"
                        className="file-input file-input-bordered w-full mt-2 sm:text-sm sm:leading-6"
                        onChange={(event) => {
                          setFieldValue("avatar", event.currentTarget.files[0]);
                        }}
                      />
                      <ErrorMessage name="avatar" component="div" className="text-red-600 text-sm mt-1" />
                    </div>
                    {/* Submit button */}
                    <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                      <button
                        type="submit"
                        disabled={loading}
                        className="flex w-full justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                      >
                        {loading ? "Creating account..." : "Create an account"}
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
              <p className="mt-5 text-center text-sm mb-5 text-gray-500">
                Already have an account?{" "}
                <Link to={"/login"} className="font-semibold leading-6 text-red-600 hover:text-red-500">
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
