// frontend/src/components/Header.jsx

import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Title */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-extrabold text-indigo-600 tracking-tight">
              🔗 TinyLink
            </span>
          </Link>

          {/* Navigation/Actions */}
          <nav className="flex space-x-4 items-center">
            <Link 
              to="/" 
              className="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition duration-150"
            >
              Dashboard
            </Link>
            
            {/* NEW: Health Check Button */}
            <Link 
              to="/healthz" 
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium py-1.5 px-3 rounded-md transition duration-150"
            >
              🩺 Check Health
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;