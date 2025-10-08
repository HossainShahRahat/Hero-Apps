import React, { useState } from 'react';
import { FaStar, FaDownload, FaSearch } from 'react-icons/fa';
import apiData from '../../Information/Infomation.json';
import { FiDownload } from 'react-icons/fi';
import ErrorApp from '../ErrorApp/ErrorApp';

const Apps = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const appsData = apiData;

  const filteredApps = appsData.filter((app) =>
    app.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (filteredApps.length === 0) {
    return <ErrorApp />;
  } else {
    return (
      <div className="min-h-screen p-8 font-sans">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800">Our All Applications</h1>
            <p className="text-gray-500 mt-2">
              Explore All Apps on the Market developed by us. We code for Millions.
            </p>
          </div>

          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-semibold text-gray-700">
              ({filteredApps.length}) Apps Found
            </h2>
            <div className="relative">
              <input
                type="text"
                placeholder="Search Apps"
                className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 xl:gap-8">
            {filteredApps.map((app) => (
              <div
                key={app.id}
                className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow duration-300"
              >
                <div className={`w-full h-40 rounded-md mb-4 ${app.imagePlaceholder}`}>
                  <img
                    src={app.image}
                    alt={app.name}
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>

                <h3 className="text-base font-semibold text-gray-800 mb-2 truncate">
                  {app.name}
                </h3>

                <div className="flex justify-between items-center text-sm">
                  <div className="flex items-center text-gray-500">
                    <FiDownload className="mr-1 text-base" />
                    <span>{app.downloads}</span>
                  </div>
                  <div className="flex items-center text-yellow-500">
                    <FaStar className="mr-1 text-xs" />
                    <span>{app.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
};

export default Apps;
