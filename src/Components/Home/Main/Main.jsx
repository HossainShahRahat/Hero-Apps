import React, { useState, useEffect } from 'react';
import { FiDownload } from 'react-icons/fi';
import { FaStar } from 'react-icons/fa';

import apiData from '../../../../src/Information/Infomation.json'
import { Link } from 'react-router';


const Main = () => {

    const [limitedApps, setLimitedApps] = useState([]);

    useEffect(() => {
    const limitedApiData = apiData.slice(0, 4);

    setLimitedApps(limitedApiData);
  }, []);
    
    return (
        <div className="max-w-7xl mx-auto p-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-2">Trending Apps</h2>
          <p className="text-lg text-gray-600">
            Explore All Trending Apps on the Market developed by us
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 xl:gap-8">
          {limitedApps.map((app) => (
            <div key={app.id} className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow duration-300">
              <div className={`w-full h-40 rounded-md mb-4 ${app.imagePlaceholder}`}>
                <img src={app.image} alt={app.name} className="w-full h-full object-cover rounded-md" />
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

        <div className="text-center mt-12">
          <Link className="btn bg-purple-600 text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:bg-purple-700 transition-colors" to={'/apps'}>
            Show All
          </Link>
        </div>
      </div>
    );
};

export default Main;