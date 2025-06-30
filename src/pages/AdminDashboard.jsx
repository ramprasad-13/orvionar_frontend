import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Admin Dashboard</h1>
        <p className="text-lg text-gray-600 mb-8">Manage your platform efficiently</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Courses Card */}
          <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Courses</h3>
            <p className="text-sm text-gray-600 mb-4">Create, edit, and manage courses</p>
            <Link
              to="/courses"
              className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Go to Courses
            </Link>
          </div>

          {/* User Access Card */}
          <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">User Access</h3>
            <p className="text-sm text-gray-600 mb-4">Control user permissions and access</p>
            <Link
              to="/admin-user-access"
              className="inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
            >
              Go to User Access
            </Link>
          </div>

          {/* My Profile Card */}
          <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">My Profile</h3>
            <p className="text-sm text-gray-600 mb-4">Your profile section</p>
            <Link
              to="/profile"
              className="inline-block bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
            >
              My Profile
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
