import React, { useEffect, useState } from 'react';
import { getUserProfile } from '../utils/api';
import useTitle from '../components/useTitle';

const Profile = ({ user }) => {
  useTitle("Profile");
  const id = user.userId;
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUserProfile(id);
        setUserInfo(userData || {});
      } catch (error) {
        console.log('Error fetching User Info', error);
        setUserInfo({});
      }
    };
    fetchUser();
  }, [id]);

  const getStatusColor = (status) => {
    switch ((status || '').toLowerCase()) {
      case 'verified':
        return 'bg-green-100 text-green-700';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'rejected':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">👤 My Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Profile Overview</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600 font-medium">User ID:</span>
                <span className="text-gray-800">{id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 font-medium">Name:</span>
                <span className="text-gray-800">{userInfo.name || 'N/A'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 font-medium">Email:</span>
                <span className="text-gray-800">{userInfo.email || 'N/A'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 font-medium">Mobile:</span>
                <span className="text-gray-800">+91 {userInfo.phoneNumber || 'N/A'}</span>
              </div>
            </div>
          </div>

          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Academic Details</h2>
            <div className="space-y-3">
              {user.role === 'student' && (
                <>
                  <div className="flex justify-between">
                    <span className="text-gray-600 font-medium">College:</span>
                    <span className="text-gray-800">{userInfo.college || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 font-medium">Subscribed Courses:</span>
                    <span className="text-gray-800">{userInfo.noSubscribedCourses || 0}</span>
                  </div>
                </>
              )}
              <div className="flex justify-between">
                <span className="text-gray-600 font-medium">Status:</span>
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(userInfo.verification)}`}>
                  {userInfo.verification || 'N/A'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Add additional dashboard sections below if needed */}
      </div>
    </div>
  );
};

export default Profile;
