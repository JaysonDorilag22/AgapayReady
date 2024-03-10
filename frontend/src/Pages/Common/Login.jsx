import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {
  logInStart,
  logInSuccess,
  logInFailure,
} from "../../redux/Users/userSlice";
import logo from '../../assets/services/vite.png'
import axios from "axios";
import baseURL from "../ApiService";

export default function Login() {
  const { loading, error } = useSelector((state) => state.user);
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initialValues = {
    email: "",
    password: ""
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is equired'),
    password: Yup.string().required('Password is equired')
  });

const onSubmit = async (values, { setSubmitting }) => {
  try {
    dispatch(logInStart());
    const response = await axios.post(`/api/v1/login`, values, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    
    const { data } = response;

    if (data.success === false) {
      dispatch(logInFailure("Invalid email or password."));
      setLoginError("Invalid email or password.");
      setSubmitting(false);
      return;
    }

    dispatch(logInSuccess(data));

    if (data.role === 'Admin') {
      navigate('/admin/dashboard');
    } else {
      navigate('/user/dashboard');
    }
  } catch (error) {
    console.error("Error occurred:", error);
    dispatch(logInFailure());
    setLoginError("An error occurred. Please try again.");
    setSubmitting(false);
  }
};

  
  

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-5 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-40 w-auto"
          src={logo}
          alt="Your Company"
        />
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <Form className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <Field
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                />
                <ErrorMessage name="email" component="div" className="text-red-600 text-sm mt-1" />
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
                <Field
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                />
                <ErrorMessage name="password" component="div" className="text-red-600 text-sm mt-1" />
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
          </Form>
        </Formik>
        <p className="mt-2 text-center text-sm text-gray-500">
          {loginError && (
            <span className="text-red-600">{loginError}</span>
          )}
        </p>

        <p className="mt-10 text-center text-sm text-gray-500">
          No account?{' '}
          <Link to={"/register"} className="font-semibold leading-6 text-red-600 hover:text-red-500">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
