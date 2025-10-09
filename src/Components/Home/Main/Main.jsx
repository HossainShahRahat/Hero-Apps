import React, { useState, useEffect } from 'react';
import { FiDownload } from 'react-icons/fi';
import { FaStar } from 'react-icons/fa';
import { Link } from 'react-router';
import { AlertCircle } from 'lucide-react';

const CardSkeleton = () => (
  <div className="bg-white rounded-lg shadow-sm p-4 animate-pulse">
    <div className="w-full h-40 rounded-md mb-4 bg-gray-200"></div>
    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
    <div className="flex justify-between items-center">
      <div className="h-4 bg-gray-200 rounded w-1/4"></div>
      <div className="h-4 bg-gray-200 rounded w-1/4"></div>
    </div>
  </div>
);


const Main = () => {
    const [apps, setApps] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTrendingApps = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await fetch('/public/Infomation.json');
                if (!response.ok) {
                    throw new Error('Failed to fetch apps. Please try again later.');
                }
                const data = await response.json();
                setApps(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTrendingApps();
    }, []);

    const renderContent = () => {
        if (isLoading) {
            return Array.from({ length: 8 }).map((_, index) => <CardSkeleton key={index} />);
        }

        if (error) {
            return (
                <div className="col-span-full text-center p-8 bg-red-50 rounded-lg">
                    <AlertCircle size={48} className="mx-auto mb-4 text-red-400" />
                    <h3 className="text-xl font-semibold text-red-600">Could not load trending apps</h3>
                    <p className="text-red-500">{error}</p>
                </div>
            );
        }
        
        return apps.slice(0, 8).map((app) => (
            <Link key={app.id} to={`/apps/${app.id}`} className="block">
                <div className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow duration-300 h-full">
                    <div className={`w-full h-40 rounded-md mb-4 ${app.imagePlaceholder}`}>
                        <img src={app.image} alt={app.name} className="w-full h-full object-cover rounded-md" />
                    </div>
                    <h3 className="text-base font-semibold text-gray-800 mb-2 truncate">{app.name}</h3>
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
            </Link>
        ));
    };

    return (
        <div className="max-w-7xl mx-auto p-8">
            <div className="text-center mb-12">
                <h2 className="text-4xl font-extrabold text-gray-900 mb-2">Trending Apps</h2>
                <p className="text-lg text-gray-600">
                    Explore All Trending Apps on the Market developed by us
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 xl:gap-8">
                {renderContent()}
            </div>

            <div className="text-center mt-12">
                <Link className="btn bg-purple-600 text-white font-semibold py-3 px-8 rounded-lg border-purple shadow-md hover:bg-purple-700 transition-colors" to={'/apps'}>
                    Show All
                </Link>
            </div>
        </div>
    );
};

export default Main;
