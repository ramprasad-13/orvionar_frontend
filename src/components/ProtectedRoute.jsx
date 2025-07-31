import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../context/useUser'; // Assuming useUser is imported
import Spinner from './Spinner'; // Assuming you have a Spinner component

const ProtectedRoute = ({ children }) => {
  const { user, isLoadingUser } = useUser(); // Get user and isLoadingUser from context

  if (isLoadingUser) {
    // Show a spinner while the user data is being fetched
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (!user) {
    // If not loading and user is null, it means not authenticated, so redirect to login
    return <Navigate to="/login" />;
  }

  // If loading is complete and user is not null, render the children
  return children;
};

export default ProtectedRoute;