import React from 'react';
import { useNavigate } from 'react-router';

const ErrorApp = () => {

    const nevigate = useNavigate();

    return (
        <div className='Error-Alignment'>
            <img src="/src/assets/App-Error.png" alt="" />
            <h1>Oops!! App not found!</h1>
            <p>The App you are requesting is not found on our system.  please try another apps</p>
            <NavLink onClick={()=>nevigate(-1)} className='btn bg-gradient-to-r from-indigo-500 to-blue-500 border-blue-500'>Go Back!</NavLink>
        </div>
    );
};

export default ErrorApp;