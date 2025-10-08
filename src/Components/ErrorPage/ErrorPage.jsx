import React from 'react';
import { NavLink, useNavigate } from 'react-router';

const ErrorPage = () => {
    const nevigate = useNavigate();

    return (
        <div className='Error-Alignment'>
            <img src="/src/assets/error-404.png" alt="" />
            <h1>Oops, page not found!</h1>
            <p>The page you are looking for is not available.</p>
            <NavLink onClick={()=>nevigate(-1)} className='btn bg-gradient-to-r from-indigo-500 to-blue-500 border-blue-500'>Go Back!</NavLink>
        </div>
    );
};

export default ErrorPage;