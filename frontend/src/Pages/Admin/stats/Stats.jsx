import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux";
import axios from 'axios'
import BarChart from "./../charts/BarChart";

export default function Stats() {
  const { currentUser } = useSelector((state) => state.user);
  const [usersCount, setUsersCount] = useState(0);
  const [reportsCount, setReportsCount] = useState(0);

  useEffect(() => {
    axios.get('/api/v1/users') // replace with your API endpoint
      .then(res => {
        setUsersCount(res.data.length);
      })
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    axios.get('/api/v1/report') // replace with your API endpoint
      .then(res => {
        setReportsCount(res.data.length);
      })
      .catch(err => console.error(err));
  }, []);

  
  return (
    <section className="bg-white">
      
      <div className="mx-auto max-w-screen-xl px-2 py-2 sm:px-4 md:py-8 lg:px-4">
        <div className="mt-8 sm:mt-12">
          <dl className="grid grid-cols-1 text-center justify-center gap-4 sm:grid-cols-4">
            <div className="w-1/3 flex flex-col rounded-lg px-4 py-8 text-center justify-center">
              <dt className="order-last text-xl font-medium text-gray-500">
                   Users
              </dt>

              <dd className="text-4xl font-extrabold text-red-700 md:text-9xl hover:text-red-500 hover:text-9xl">
                {usersCount}
              </dd>
            </div>
            
            <div className='flex flex-row w-max gap-x-24 rounded-lg ring-2 ring-red-600 px-8 py-16 text-center items-center hover:shadow-xl hover:bg-red-200'>
              <div className="w-2/3 flex flex-col px-4 py-8 text-center">
                <dt className="order-last text-lg font-medium text-gray-500">
                  Emergency Reports
                </dt>

                <dd className="text-4xl font-extrabold text-blue-600 md:text-5xl">
                  {reportsCount}
                </dd>
              </div>
              <div className='justify-items-end'>
                <BarChart/>  
              </div>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
