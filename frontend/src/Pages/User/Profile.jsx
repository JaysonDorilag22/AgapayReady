import React from "react";
import { useSelector } from "react-redux";
import EmergencyReportForm from "./EmergencyReportForm";

export default function Profile() {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  return (
    <>
      <div class="bg-white w-full flex flex-col gap-5 px-3 md:px-16 lg:px-28 md:flex-row text-[#161931]">
        <aside class="hidden py-4 md:w-1/3 lg:w-1/4 md:block">
          <div class="sticky flex flex-col gap-2 p-4 text-sm border-r border-red-100 top-12">
            <h2 class="pl-3 mb-4 text-2xl font-semibold">Settings</h2>

            <a
              href="#"
              class="flex items-center px-3 py-2.5 font-bold bg-white  text-red-900 border rounded-full"
            >
              Pubic Profile
            </a>
            <a
              href="#"
              class="flex items-center px-3 py-2.5 font-semibold  hover:text-red-900 hover:border hover:rounded-full"
            >
              Account Settings
            </a>
            <a
              href="#"
              class="flex items-center px-3 py-2.5 font-semibold hover:text-red-900 hover:border hover:rounded-full  "
            >
              Notifications
            </a>
          </div>
        </aside>
        <main class="w-full min-h-screen py-1 md:w-2/3 lg:w-3/4">
          <div class="p-2 md:p-4">
            <div class="w-full px-6 pb-8 mt-8 sm:max-w-xl sm:rounded-lg">
              <h2 class="pl-6 text-2xl font-bold sm:text-xl text-center">Profile</h2>

              <div class="grid max-w-2xl mx-auto mt-8">
              <div class="flex justify-center">
                  <img
                    class="object-cover w-40 h-40 p-1 rounded-full ring-2 ring-red-300 dark:ring-red-500"
                    src={currentUser.avatar}
                    alt="Bordered avatar"
                  />

                  {/* <div class="flex flex-col space-y-5 sm:ml-8">
                    <button
                      type="button"
                      class="py-3.5 px-7 text-base font-medium text-red-100 focus:outline-none bg-[#202142] rounded-lg border border-red-200 hover:bg-red-900 focus:z-10 focus:ring-4 focus:ring-red-200 "
                    >
                      Change picture
                    </button>
                  </div> */}
                </div>

                <div class="items-center text-[#202142]">
                  <div class="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                    <div class="w-full">
                      <label
                        for="first_name"
                        class="block text-sm font-medium  dark:text-white"
                      >
                        Your first name
                      </label>
                      <input
                        type="text"
                        id="first_name"
                        class="placeholder"
                        placeholder="Your first name"
                        value={currentUser.firstname}
                        required
                      />
                    </div>

                    <div class="w-full">
                      <label
                        for="last_name"
                        class="block  text-sm font-medium  dark:text-white"
                      >
                        Your last name
                      </label>
                      <input
                        type="text"
                        id="last_name"
                        class="placeholder"
                       
                        placeholder="Your last name"
                        value={currentUser.lastname}
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-6">
                    <label
                      for="email"
                      class="block  text-sm font-medium  dark:text-white"
                    >
                      Your email
                    </label>
                    <input
                      type="email"
                      id="email"
                      class="placeholder"
                      
                      placeholder="your.email@mail.com"
                      value={currentUser.email}
                      required
                    />
                  </div>
                  <div class="flex justify-end">
                    <button
                      type="submit"
                className="flex w-full  justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"

                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
