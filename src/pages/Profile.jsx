import React, { useEffect, useState } from 'react';
import { getUserProfile } from '../utils/api';
import useTitle from '../components/useTitle';
import Spinner from '../components/Spinner'; // Make sure Spinner is imported
import { useUser } from '../context/useUser'; // Import useUser hook

const Profile = () => { // Removed 'user' prop, get it from context
  useTitle("Profile");
  const { user, isLoadingUser } = useUser(); // Get user and loading state from context
  const [userInfo, setUserInfo] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    // Only fetch if user is available and not currently loading from context
    if (user && user.userId && !isLoadingUser) {
      const fetchUser = async () => {
        try {
          // No need for a separate loading state here if UserContext handles it,
          // but if this component fetches additional data, keep its own loading.
          // For now, rely on UserContext's loading for initial user data.
          const userData = await getUserProfile(); // Call without ID, backend infers from token
          setUserInfo(userData || {});
          setError(null);
        } catch (err) {
          console.error('Error fetching User Info:', err);
          setError('Failed to load profile details. Please try again.');
          setUserInfo({});
        }
      };
      fetchUser();
    } else if (!user && !isLoadingUser) {
        // If user is null and not loading, it means not authenticated or session expired
        setError("User not authenticated or session expired. Please log in.");
    }
  }, [user, isLoadingUser]); // Depend on user and isLoadingUser

  // Display loading spinner while user data is being fetched by UserContext
  if (isLoadingUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <Spinner />
      </div>
    );
  }

  // If user is null after loading, it means they are not authenticated
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white shadow-md rounded-lg p-6 text-center text-red-700">
          <p>{error || "You are not logged in. Please log in to view your profile."}</p>
          {/* Optionally add a link to login */}
          {/* <a href="/login" className="text-orange-600 hover:underline mt-4 block">Go to Login</a> */}
        </div>
      </div>
    );
  }

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
                {/* Use userInfo.userId which is from the backend fetch */}
                <span className="text-gray-800">{userInfo.userId || 'N/A'}</span>
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
              {/* Use userInfo.role from the backend-fetched data for conditional rendering */}
              {userInfo.role === 'student' && (
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