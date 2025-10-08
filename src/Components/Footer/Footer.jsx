import React from 'react';

import { NavLink } from 'react-router';

import { FaHome, FaDownload } from 'react-icons/fa';
import { BsFillGrid3X3GapFill } from 'react-icons/bs';

import { FaXTwitter, FaLinkedinIn, FaFacebookF } from "react-icons/fa6";

const Footer = () => {
    return (
        <div className="Footer">
            <div className="Upper-Footer Footer flex">
            <div className="Footer-Left-Side-Content flex">
                <img src="/src/assets/logo.png" alt="Logo"/>
                <NavLink to={'/'}>HERO.IO</NavLink>
            </div>
            <div className="Footter-Right-Side-Content">
                <h1>Social Links</h1>
                <div className="Social-Links-Icon flex gap-2">
                    <NavLink to={''} className="w-8 h-8 bg-white rounded-full flex items-center justify-center"><FaXTwitter className="text-black text-xl" /></NavLink>
                    <NavLink to={''} className="w-8 h-8 bg-white rounded-full flex items-center justify-center"><FaLinkedinIn className="text-black text-2xl" /></NavLink>
                    <NavLink to={''} className="w-8 h-8 bg-white rounded-full flex items-center justify-center"><FaFacebookF className="text-black text-2xl" /></NavLink>
                </div>
            </div>
        </div>
        <hr className="w-full border-t border-gray-700" />
        <div className="Bottom-Footer">
            <p>Copyright © 2025 - All right reserved</p>
        </div>
        </div>
    );
};

export default Footer;