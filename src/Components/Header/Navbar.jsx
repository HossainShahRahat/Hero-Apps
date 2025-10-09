import React from 'react';

import { NavLink } from 'react-router';

import { FaHome, FaDownload } from 'react-icons/fa';
import { BsFillGrid3X3GapFill } from 'react-icons/bs';

const baseLinkClasses = "NavLink-Padding relative flex items-center gap-2 py-2 text-gray-500 transition-colors";
const hoverClasses = "hover:text-indigo-600";
const activeLinkClasses = "text-indigo-600 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-indigo-600";


const Navbar = () => {

    const GithubLink = "https://github.com/HossainShahRahat/Hero-Apps";

    return (
        <div className="bg-white text-black shadow-sm Alignment">
            <div className="Logo">
                <img src="https://i.ibb.co/KpPbm6HP/logo.png" alt="Logo"/>
                <NavLink to={'/'}>HERO.IO</NavLink>
            </div>
            <div className="Navbar-Menu-Items">
                <NavLink to={'/'} className={({ isActive }) => `${baseLinkClasses} ${isActive ? activeLinkClasses : hoverClasses}`} > <FaHome /> <span>Home</span></NavLink>
                <NavLink to={'/apps'} className={({ isActive }) => `${baseLinkClasses} ${isActive ? activeLinkClasses : hoverClasses}`}> <BsFillGrid3X3GapFill /> <span>Apps</span></NavLink>
                <NavLink to={'/installation'} className={({ isActive }) => `${baseLinkClasses} ${isActive ? activeLinkClasses : hoverClasses}`} > <FaDownload /> <span>Installation</span></NavLink>
            </div>
            <div className="Navbar-Right-Side-Button">
                <a href={GithubLink} className='btn bg-gradient-to-r from-indigo-500 to-blue-500 border-blue-500'>
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.168 6.839 9.492.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.031-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.03 1.595 1.03 2.688 0 3.848-2.338 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.001 10.001 0 0022 12c0-5.523-4.477-10-10-10z"
                clipRule="evenodd"/>
            </svg>
                Contribution</a>
            </div>
        </div>
    );
};

export default Navbar;