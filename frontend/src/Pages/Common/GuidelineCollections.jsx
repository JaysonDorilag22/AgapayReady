import React, { useState, useEffect } from "react";
import { FaRegCheckCircle, FaSearch } from "react-icons/fa";
import { Link } from 'react-router-dom';
import Loader from "../../components/Loader";

const GuidelineCollections = () => {
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/categories`);
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-4 mb-10 mt-5">
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="max-w-xl mx-auto space-y-3 sm:text-center mb-5">
            <h3 className="text-red-600 font-semibold">
              Guideline Categories
            </h3>
            <p className="text-gray-800 text-3xl font-semibold sm:text-4xl">
              Connecting You to Safety
            </p>
            <p>
              We prioritize safety and preparedness. Here, you'll find a comprehensive array of categories designed to equip you with the knowledge and tools needed to navigate various emergency situations effectively.
            </p>
          </div>
          <div className="flex flex-1 items-center justify-center mb-10">
            <div className="w-full max-w-lg">
              <form className="sm:flex sm:items-center">
                <input
                  id="q"
                  name="q"
                  className="inline w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-3 leading-5 placeholder-gray-500 focus:border-red-500 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-red-500 sm:text-sm"
                  placeholder="Search Guideline . . ."
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
          <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
            {filteredCategories.map((category) => (
              <Card
                key={category._id}
                title={category.name}
                subtitle={category.short_description}
                Icon={FaRegCheckCircle}
                categoryId={category._id}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const Card = ({ title, subtitle, Icon, categoryId }) => {
  return (
    <Link
      to={`/guidelines/category/guideline/${categoryId}`}
      className="w-full p-4 rounded border-[1px] border-slate-300 relative overflow-hidden group bg-white shadow-md hover:shadow-lg transition-shadow duration-300"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <Icon className="absolute z-10 -top-12 -right-12 text-9xl text-slate-100 group-hover:text-red-400 group-hover:rotate-12 transition-transform duration-300" />
      <Icon className="mb-2 text-2xl text-red-600 group-hover:text-white transition-colors relative z-10 duration-300" />
      <h3 className="font-medium text-lg text-slate-950 group-hover:text-white relative z-10 duration-300">
        {title}
      </h3>
      <p className="text-slate-400 group-hover:text-red-200 relative z-10 duration-300">
        {subtitle}
      </p>
    </Link>
  );
};

export default GuidelineCollections;
