import React, { useState } from 'react';
import AvatarDropdown from '../shadcn/Avatar';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Navbar = () => {
    const {user}=useSelector((state)=>state.auth);
  return (
    // Main navbar container with dark background and bottom border
    <div className="bg-gray-900 text-white shadow-lg border-b border-gray-700">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-20 px-4">
        {/* Logo */}
        <div>
          <h1 className="text-3xl font-bold">
            Job<span className="text-blue-500">Portal</span>
          </h1>
        </div>
        {/* Navigation Links */}
        <ul className="flex font-semibold items-center gap-8 text-gray-300">
          <li className="hover:text-blue-400 transition-colors duration-300 cursor-pointer">
            <Link to='/'>Home</Link>
          </li>
          <li className="hover:text-blue-400 transition-colors duration-300 cursor-pointer">
            <Link to='/all/jobs'>Job</Link>
          </li>
          <li className="hover:text-blue-400 transition-colors duration-300 cursor-pointer">
            <Link to='/browse'>Browse</Link>
          </li>
        </ul>

        {user ? (
          // Logged-in user view (Avatar)
          <div>
            <AvatarDropdown src="https://i.pravatar.cc/150?img=5" fallback="ST">
              <div className="p-2">
                 <h4 className="font-medium text-sm my-2 ml-2 text-white">shishirtiwari004@gmail.com</h4>
                 <ul className="text-sm text-gray-300">
                  <Link to='/profile'>
                    <li className="px-4 py-2 hover:bg-gray-700 rounded-md cursor-pointer">
                     Profile
                   </li>
                  </Link>
                   <li className="px-4 py-2 hover:bg-gray-700 rounded-md cursor-pointer">
                     Settings
                   </li>
                   <li className="px-4 py-2 hover:bg-gray-700 text-red-500 rounded-md cursor-pointer">
                     Logout
                   </li>
                 </ul>
              </div>
            </AvatarDropdown>
          </div>
        ) : (
          // Logged-out user view (Buttons)
          <div className="flex gap-4">
            
              <Link to='/login'>
              <button className="px-5 py-2 font-semibold rounded-lg bg-transparent border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition-all duration-300">Login</button>
              </Link>
              <Link to='/signup'>
            <button className="px-5 py-2 font-semibold rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-purple-500 focus:ring-opacity-50 transition-all duration-300 transform hover:scale-105">
              Signup
            </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
