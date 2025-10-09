import React, { useState, useEffect } from 'react';
import { Star, Download, Loader, AlertCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { toast, Toaster } from 'react-hot-toast';
import { useParams } from 'react-router';
import ErrorApp from '../ErrorApp/ErrorApp';

const LoadingScreen = () => (
  <div className="flex justify-center items-center h-screen">
    <Loader className="animate-spin text-purple-500" size={48} />
  </div>
);

const ErrorDisplay = ({ message }) => (
  <div className="flex flex-col justify-center items-center h-screen text-red-500">
    <AlertCircle size={48} className="mb-4" />
    <h2 className="text-xl font-semibold">Something went wrong</h2>
    <p>{message}</p>
  </div>
);

const AppFullDetails = () => {
  const { id } = useParams();
  const [appInfo, setAppInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    const fetchAppDetails = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch('/Infomation.json');
        if (!response.ok) throw new Error(`API request failed with status ${response.status}`);
        
        const allApps = await response.json();
        const currentApp = allApps.find(app => app.id === parseInt(id));

        if (currentApp) {
          setAppInfo(currentApp);
        } else {
          setAppInfo(null);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAppDetails();
  }, [id]);

  useEffect(() => {
      if (appInfo) {
          const installed = JSON.parse(localStorage.getItem('installedApps')) || [];
          if (installed.some(app => app.id === appInfo.id)) {
              setIsInstalled(true);
          }
      }
  }, [appInfo]);


  const handleInstall = () => {
    if (!appInfo) return;

    try {
      const currentInstallations = JSON.parse(localStorage.getItem('installedApps')) || [];
      
      if (currentInstallations.some(app => app.id === appInfo.id)) {
        toast.error(`${appInfo.name} is already installed.`);
        return;
      }

      const newInstallations = [...currentInstallations, appInfo];
      localStorage.setItem('installedApps', JSON.stringify(newInstallations));
      
      setIsInstalled(true);
      
      toast.success(`${appInfo.name} installed successfully!`, {
          duration: 2500,
          position: 'top-right',
      });

    } catch (error) {
      toast.error("Could not install the app due to an error.");
    }
  };

  if (isLoading) return <LoadingScreen />;
  if (error) return <ErrorDisplay message={error} />;
  if (!appInfo) return <ErrorApp />;
  
  const { name, developer, image, downloads, rating, reviews, size, description } = appInfo;

  const reviewData = [
    { name: '5 star', reviews: 10800 }, { name: '4 star', reviews: 6300 },
    { name: '3 star', reviews: 2800 }, { name: '2 star', reviews: 1800 },
    { name: '1 star', reviews: 900 }
  ];

  let buttonClassName = 'px-8 py-3 rounded-lg font-semibold text-sm transition-colors';
  let buttonText = '';

  if (isInstalled) {
    buttonClassName += ' bg-gray-300 text-gray-600 cursor-not-allowed';
    buttonText = 'Installed';
  } else {
    buttonClassName += ' bg-green-500 text-white hover:bg-green-600';
    buttonText = `Install Now (${size})`;
  }

  return (
      <div className='p-4 sm:p-8 md:p-20'>
        <Toaster position="top-Right" />
        <div className="flex flex-col md:flex-row items-start gap-8">
          <div className="flex-shrink-0">
            <img src={image} alt={name} className="w-full md:w-[250px] h-auto md:h-[250px] object-cover rounded-lg"/>
          </div>
          
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900 mb-1">{name}</h1>
            <p className="text-gray-600 mb-6">Developed by {developer}</p>
            
            <div className="flex items-start gap-8 sm:gap-12 mb-6">
              <div className="flex flex-col items-center text-center"><Download className="w-5 h-5 text-green-500 mb-2" /><span className="text-xs text-gray-500 mb-1">Downloads</span><span className="text-lg font-bold text-gray-900">{downloads}</span></div>
              <div className="flex flex-col items-center text-center"><Star className="w-5 h-5 fill-orange-400 text-orange-400 mb-2" /><span className="text-xs text-gray-500 mb-1">Ratings</span><span className="text-lg font-bold text-gray-900">{rating}</span></div>
              <div className="flex flex-col items-center text-center"><div className="w-5 h-5 mb-2 flex items-center justify-center"><svg className="w-5 h-5 text-purple-500" fill="currentColor" viewBox="0 0 20 20"><path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/><path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"/></svg></div><span className="text-xs text-gray-500 mb-1">Reviews</span><span className="text-lg font-bold text-gray-900">{reviews}</span></div>
            </div>
            
            <button
              onClick={handleInstall}
              disabled={isInstalled}
              className={buttonClassName}
            >
              {buttonText}
            </button>
          </div>
        </div>

        <hr className="h-px my-8 bg-gray-100 border-0.5"></hr>
        
        <div className="mb-8 pb-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-4">User Reviews</h2>
            <div className="h-64"><ResponsiveContainer width="100%" height="100%"><BarChart data={reviewData} layout="vertical" margin={{ top: 5, right: 30, left: 0, bottom: 5 }}><YAxis type="category" dataKey="name" axisLine={false} tickLine={false} width={60} style={{ fontSize: '14px', fill: '#4B5563' }} /><XAxis type="number" hide /><Tooltip cursor={{ fill: 'rgba(147, 51, 234, 0.1)' }} contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px'}} /><Bar dataKey="reviews" fill="#FFA500" radius={[0, 10, 10, 0]}/></BarChart></ResponsiveContainer></div>
        </div>
        <hr className="h-px my-8 bg-gray-100 border-0.5"></hr>
        <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Description</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed"><p className="text-sm">{description}</p></div>
        </div>
      </div>
  );
};

export default AppFullDetails;

