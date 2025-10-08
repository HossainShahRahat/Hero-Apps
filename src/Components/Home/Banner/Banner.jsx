import React from 'react';

const Banner = () => {
    return (
        <div>
            <div className="banner text-align">
                    <h1>We Build<br/>
                    <strong>Productive </strong>Apps</h1>
                <div className="description">
                    <p>At <strong>HERO.IO</strong> , we craft innovative apps designed to make everyday life simpler, smarter, and more exciting.<br/> Our goal is to turn your ideas into digital experiences that truly make an impact</p>
                </div>
                <div className="flex gap-4 p-6">
                    <a href="https://play.google.com/store/games" className='btn btn-outline btn-success'>
                        <img alt="" className="w-10" src="https://img.icons8.com/?size=96&amp;id=rZwnRdJyYqRi&amp;format=png"></img>
                        Play Store</a>
                    <a href="https://www.apple.com/app-store/" className='btn btn-outline btn-success'>
                        <img alt="" className="w-10" src="https://img.icons8.com/?size=160&amp;id=FY7tVsFoeON4&amp;format=png"></img>
                        App Store</a>
                </div>
                <div className="hero-image">
                    <img src="/src/assets/hero.png" alt="Hero Mobile App Image" />
                </div>
            </div>
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-12">
          Trusted By Millions, Built For You
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
          <div className="flex flex-col items-center">
            <p className="text-base font-semibold text-indigo-200">Total Downloads</p>
            <p className="text-5xl sm:text-6xl font-bold text-white mt-2 mb-1">29.6M</p>
            <p className="text-sm text-indigo-200">21% More Than Last Month</p>
          </div>

          <div className="flex flex-col items-center">
            <p className="text-base font-semibold text-indigo-200">Total Reviews</p>
            <p className="text-5xl sm:text-6xl font-bold text-white mt-2 mb-1">906K</p>
            <p className="text-sm text-indigo-200">46% More Than Last Month</p>
          </div>

          <div className="flex flex-col items-center">
            <p className="text-base font-semibold text-indigo-200">Active Apps</p>
            <p className="text-5xl sm:text-6xl font-bold text-white mt-2 mb-1">132+</p>
            <p className="text-sm text-indigo-200">31 More Will Launch</p>
          </div>
        </div>
      </div>
    </div>
        </div>
    );
};

export default Banner;