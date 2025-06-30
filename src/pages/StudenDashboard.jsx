import React from 'react';
import { Link } from 'react-router-dom';

const StudentDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-2">Student Dashboard</h1>
      <p className="text-center text-gray-600 mb-10">Track All your Courses efficiently</p>

      <div className="max-w-6xl mx-auto grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 px-4">
        {/* All Courses Card */}
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">All Courses</h3>
          <p className="text-gray-600 mb-4">All Available courses</p>
          <Link to="/domains" className="text-orange-500 hover:underline font-medium">Go to Courses →</Link>
        </div>

        {/* My Courses Card */}
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">My Courses</h3>
          <p className="text-gray-600 mb-4">Your Subscribed Courses</p>
          <Link to="/courses" className="text-orange-500 hover:underline font-medium">My Courses →</Link>
        </div>

        {/* My Profile Card */}
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">My Profile</h3>
          <p className="text-gray-600 mb-4">Your profile Section</p>
          <Link to="/profile" className="text-orange-500 hover:underline font-medium">My Profile →</Link>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;