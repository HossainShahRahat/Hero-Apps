import React, { useState, useEffect, useMemo } from 'react';
import { Download, Star, Trash2 } from 'lucide-react';
import { toast, Toaster } from 'react-hot-toast';
import ErrorApp from '../ErrorApp/ErrorApp';

const parseDownloads = (downloads) => {
    if (typeof downloads !== 'string') return 0;
    const upperCaseDownloads = downloads.toUpperCase();
    let number = parseFloat(upperCaseDownloads);
    if (upperCaseDownloads.includes('M')) {
        number *= 1_000_000;
    } else if (upperCaseDownloads.includes('K')) {
        number *= 1_000;
    }
    return number;
};

const getInstalledApps = () => {
    const savedApps = localStorage.getItem('installedApps');
    if (savedApps) {
        return JSON.parse(savedApps);
    } else {
        return [];
    }
};

const Installation = () => {
    const [installedApps, setInstalledApps] = useState([]);
    const [sortBy, setSortBy] = useState('high-low');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        setTimeout(() => {
            setInstalledApps(getInstalledApps());
            setIsLoading(false);
        }, 500);
    }, []);

    const handleUninstall = (appId, appName) => {
        try {
            const updatedApps = installedApps.filter(app => app.id !== appId);
            setInstalledApps(updatedApps);
            localStorage.setItem('installedApps', JSON.stringify(updatedApps));

            toast.success(`${appName} was uninstalled successfully!`, {
                duration: 2500,
                position: 'top-right',
            });
        } catch (error) {
            toast.error("Could not uninstall the app due to an error.");
        }
    };

    const sortedApps = useMemo(() => {
        const appsToSort = [...installedApps];
        appsToSort.sort((a, b) => {
            const downloadsA = parseDownloads(a.downloads);
            const downloadsB = parseDownloads(b.downloads);
            if (sortBy === 'high-low') {
                return downloadsB - downloadsA;
            } else {
                return downloadsA - downloadsB;
            }
        });
        return appsToSort;
    }, [installedApps, sortBy]);

    const renderAppList = () => {
        if (isLoading) {
            return Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm p-4 flex items-center justify-between animate-pulse">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-gray-200 rounded-md"></div>
                        <div>
                            <div className="h-5 bg-gray-200 rounded w-48 mb-2"></div>
                            <div className="h-4 bg-gray-200 rounded w-32"></div>
                        </div>
                    </div>
                    <div className="w-28 h-10 bg-gray-200 rounded-lg"></div>
                </div>
            ));
        }

        if (sortedApps.length === 0) {
            return <ErrorApp />;
        }

        return sortedApps.map((app) => (
            <div key={app.id} className="bg-white rounded-lg shadow-sm p-4 flex items-center justify-between transition-shadow hover:shadow-md">
                <div className="flex items-center gap-4">
                    <div className={`w-16 h-16 ${app.imagePlaceholder || 'bg-gray-200'} rounded-md flex-shrink-0`}>
                       {app.image && <img src={app.image} alt={app.name} className="w-full h-full object-cover rounded-md"/>}
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800">{app.name}</h3>
                        <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                            <span className="flex items-center gap-1"><Download size={14} />{app.downloads}</span>
                            <span className="flex items-center gap-1"><Star size={14} className="text-yellow-500 fill-yellow-500" />{app.rating}</span>
                            <span>{app.size}</span>
                        </div>
                    </div>
                </div>
                <button
                    onClick={() => handleUninstall(app.id, app.name)}
                    className="bg-green-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2"
                >
                    <Trash2 size={16} />
                    <span>Uninstall</span>
                </button>
            </div>
        ));
    };

    let appsFoundText;
    if (isLoading) {
        appsFoundText = '...';
    } else {
        appsFoundText = `${sortedApps.length} Apps Found`;
    }

    return (
        <div className="min-h-screen p-8 font-sans bg-gray-50">
            <Toaster position="top-right" />
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-800">Your Installed Apps</h1>
                    <p className="text-gray-500 mt-2">Explore All Trending Apps on the Market developed by us</p>
                </div>

                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-gray-700">
                        {appsFoundText}
                    </h2>
                    <div className="relative">
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="border rounded-lg px-4 py-2 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                            disabled={isLoading}
                        >
                            <option value="high-low">Sort by Downloads: High-Low</option>
                            <option value="low-high">Sort by Downloads: Low-High</option>
                        </select>
                    </div>
                </div>

                <div className="space-y-4">
                    {renderAppList()}
                </div>
            </div>
        </div>
    );
};

export default Installation;
