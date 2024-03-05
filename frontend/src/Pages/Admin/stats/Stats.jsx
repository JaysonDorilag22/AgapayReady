import React from "react";
import { useSelector } from "react-redux";

export default function Stats() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <section className="bg-white">
      
      <div className="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <div className="mt-8 sm:mt-12">
          <dl className="grid grid-cols-1 gap-4 sm:grid-cols-4">
            <div className="flex flex-col rounded-lg px-4 py-8 text-center">
              <dt className="order-last text-lg font-medium text-gray-500">
                Users
              </dt>

              <dd className="text-4xl font-extrabold text-red-600 md:text-5xl">
                48
              </dd>
            </div>

            <div className="flex flex-col rounded-lg px-4 py-8 text-center">
              <dt className="order-last text-lg font-medium text-gray-500">
                Emergency
              </dt>

              <dd className="text-4xl font-extrabold text-blue-600 md:text-5xl">
                24
              </dd>
            </div>

            <div className="flex flex-col rounded-lg px-4 py-8 text-center">
              <dt className="order-last text-lg font-medium text-gray-500">
                Guidelines
              </dt>

              <dd className="text-4xl font-extrabold text-green-600 md:text-5xl">
                20
              </dd>
            </div>

            <div className="flex flex-col rounded-lg px-4 py-8 text-center">
              <dt className="order-last text-lg font-medium text-gray-500">
              Contacts
                
              </dt>

              <dd className="text-4xl font-extrabold text-yellow-600 md:text-5xl">
                20
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
