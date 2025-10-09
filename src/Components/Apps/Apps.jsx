import React, { useState, useEffect, useMemo } from 'react';
import { FaStar, FaSearch, FaDownload } from 'react-icons/fa';
import { Link } from 'react-router';
import { Loader, AlertCircle } from 'lucide-react';
import ErrorApp from '../ErrorApp/ErrorApp';

const AppCardSkeleton = () => (
  <div className="bg-white rounded-lg shadow-sm p-4 animate-pulse">
    <div className="w-full h-40 rounded-md mb-4 bg-gray-200"></div>
    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
    <div className="flex justify-between items-center">
      <div className="h-4 bg-gray-200 rounded w-1/4"></div>
      <div className="h-4 bg-gray-200 rounded w-1/4"></div>
    </div>
  </div>
);

const Apps = () => {
  const [apps, setApps] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedTerm, setDebouncedTerm] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [searchTerm]);

  useEffect(() => {
    const fetchApps = async () => {
      try {
        const response = await fetch('/Infomation.json');
        if (!response.ok) {
          throw new Error('Failed to fetch data from the server.');
        }
        const data = await response.json();
        setApps(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchApps();
  }, []);

  const filteredApps = useMemo(() => {
    if (!debouncedTerm) {
      return apps;
    }
    return apps.filter((app) =>
      app.name.toLowerCase().includes(debouncedTerm.toLowerCase())
    );
  }, [apps, debouncedTerm]);

  const renderAppGrid = () => {
    if (isLoading) {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 xl:gap-8">
          {Array.from({ length: 8 }).map((_, index) => <AppCardSkeleton key={index} />)}
        </div>
      );
    }
    
    if (filteredApps.length === 0) {
      return <ErrorApp searchTerm={debouncedTerm} />;
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 xl:gap-8">
        {filteredApps.map((app) => (
          <Link to={`/apps/${app.id}`} key={app.id} className="block">
            <div className="bg-white rounded-lg shadow-sm p-4 h-full hover:shadow-md transition-shadow duration-300">
              <img src={app.image} alt={app.name} className="w-full h-40 object-cover rounded-md mb-4"/>
              <h3 className="text-base font-semibold text-gray-800 mb-2 truncate">{app.name}</h3>
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center text-gray-500"><FaDownload className="mr-1" />{app.downloads}</div>
                <div className="flex items-center text-yellow-500"><FaStar className="mr-1 text-xs" />{app.rating}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    );
  };
  
  if (error) {
    return (
      <div className="text-center p-8 text-red-500">
        <AlertCircle size={48} className="mx-auto mb-4" />
        <h2 className="text-xl font-semibold">Could not load apps</h2>
        <p>{error}</p>
      </div>
    );
  }

  let appsFoundText;
  if (isLoading) {
    appsFoundText = 'Loading Apps...';
  } else {
    appsFoundText = `(${filteredApps.length}) Apps Found`;
  }

  return (
    <div className="min-h-screen p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800">Our Applications</h1>
          <p className="text-gray-500 mt-2">
            Explore All Apps on the Market developed by us. We code for Millions.
          </p>
        </div>

        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-semibold text-gray-700">{appsFoundText}</h2>
          <div className="relative">
            <input
              type="text"
              placeholder="Search Apps..."
              className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
        </div>
        
        {renderAppGrid()}

      </div>
    </div>
  );
};

export default Apps;

