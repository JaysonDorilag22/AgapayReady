import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import axios from 'axios';
import { Link } from 'react-router-dom';
import Loader from "../Loader"

export default function ContactsCollection() {
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true); // Initially set loading to true

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`/api/v2/categories`);
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching guidelines:', error);
    } finally {
      setLoading(false); // Set loading to false when fetching is complete
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="py-14">
      <div className="max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8">
        {/* Render Loader if loading */}
        {loading ? (
          <Loader />
        ) : (
          <>
            <div className="max-w-xl mx-auto space-y-3 sm:text-center mb-5">
              <h3 className="text-red-600 font-semibold">Emergency Contacts</h3>
              <p className="text-gray-800 text-3xl font-semibold sm:text-4xl">
                Connecting You to Safety
              </p>
              <p>
                In times of crisis, quick access to emergency contacts is vital.
                Browse our directory for immediate assistance. Your safety matters
                to us.
              </p>
            </div>
            <div className="flex items-center justify-center mb-10">
              <div className="w-full max-w-lg">
                <form className="sm:flex sm:items-center">
                  <input
                    id="q"
                    name="q"
                    className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-3 leading-5 placeholder-gray-500 focus:border-red-500 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-red-500 sm:text-sm"
                    placeholder="Search Categories . . ."
                    type="search"
                    autoFocus=""
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                  <button
                    type="submit"
                    className="mt-3 inline-flex w-full items-center justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    <FaSearch />
                  </button>
                </form>
              </div>
            </div>
            <div className="mt-12">
              <p className="text-gray-800 text-3xl font-semibold sm:text-4xl mb-5">
                Categories
              </p>
              <ul className="grid gap-y-8 gap-x-12 sm:grid-cols-2 lg:grid-cols-3">
                {filteredCategories.map(category => (
                  <Link key={category._id} to={`/contacts/category/contact/${category._id}`}>
                    <li className="flex gap-x-4 p-5 rounded-md shadow-xl hover:bg-slate-200">
                      <img src={category.image} className="flex-none w-12 h-12 bg-red-50 text-red-600 rounded-lg flex items-center justify-center" alt={category.name} />
                      <div>
                        <h4 className="text-lg text-red-600 font-bold">
                          {category.name}
                        </h4>
                        <p className="mt-3">{category.description}</p>
                      </div>
                    </li>
                  </Link>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
