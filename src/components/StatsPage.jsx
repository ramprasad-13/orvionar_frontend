import React, { useState, useEffect } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import moment from 'moment';
import { fetchLinkStats, deleteLink } from '../api/linkApi';

const StatsPage = () => {
  // Get the 'code' parameter from the URL (e.g., /code/docs -> code is 'docs')
  const { code } = useParams();
  
  const [link, setLink] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDeleted, setIsDeleted] = useState(false);

  useEffect(() => {
    const loadStats = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchLinkStats(code);
        setLink(data);
      } catch (err) {
        console.error('Failed to load link stats:', err);
        // Check for 404 response from the server
        const errorMessage = err.response?.status === 404 
          ? `Link with code /${code} not found.`
          : 'Could not load stats. Server error.';
        setError(errorMessage);
        setLink(null);
      } finally {
        setIsLoading(false);
      }
    };

    if (code) {
      loadStats();
    }
  }, [code]); // Rerun effect if the URL code changes

  // --- Delete Handler ---
  const handleDelete = async () => {
    if (!window.confirm(`Are you sure you want to permanently delete link /${code}? This action cannot be undone.`)) return;

    try {
      await deleteLink(code);
      setIsDeleted(true);
      // Optional: You could redirect to the Dashboard here instead
      // Example: history.push('/');
    } catch (err) {
      console.error('Deletion failed:', err);
      setError('Failed to delete link. Please try again.');
    }
  };

  // --- Rendering States ---

  if (isLoading) {
    return <div className="container mx-auto p-8 text-center text-indigo-600">Loading statistics...</div>;
  }

  if (error) {
    return <div className="container mx-auto p-8 text-center text-red-600 font-semibold">{error}</div>;
  }

  if (isDeleted) {
    return (
      <div className="container mx-auto p-8 text-center">
        <h2 className="text-3xl font-bold text-green-600 mb-4">✅ Link Deleted Successfully!</h2>
        <p className="text-gray-700 mb-6">The short code `/{code}` will now return a 404.</p>
        <RouterLink to="/" className="text-indigo-600 hover:text-indigo-800 font-medium">
          ← Go back to Dashboard
        </RouterLink>
      </div>
    );
  }

  if (!link) return null; // Should be covered by error state, but good for safety

  // --- Main Content Display ---
  const shortUrl = `${window.location.origin}/${link.shortCode}`;
  
  return (
    <div className="container mx-auto p-8 max-w-4xl">
      <div className="flex justify-between items-center mb-6 border-b pb-4">
        <h2 className="text-3xl font-bold text-gray-800">📊 Link Statistics: `/{link.shortCode}`</h2>
        <RouterLink to="/" className="text-indigo-600 hover:text-indigo-800 font-medium">
          ← Dashboard
        </RouterLink>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Link Details
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Performance metrics and creation metadata.
          </p>
        </div>
        <div className="border-t border-gray-200">
          <dl>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Short Link</dt>
              <dd className="mt-1 text-sm text-indigo-600 sm:mt-0 sm:col-span-2 break-all">
                <a href={shortUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">
                    {shortUrl}
                </a>
              </dd>
            </div>
            
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Original URL</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 break-all">
                {link.targetUrl}
              </dd>
            </div>

            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Total Clicks</dt>
              <dd className="mt-1 text-xl font-bold text-gray-900 sm:mt-0 sm:col-span-2">
                {link.totalClicks.toLocaleString()}
              </dd>
            </div>
            
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Created At</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {moment(link.createdAt).format('LLLL')} ({moment(link.createdAt).fromNow()})
              </dd>
            </div>
            
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Last Clicked</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {link.lastClickedAt 
                  ? `${moment(link.lastClickedAt).format('LLLL')} (${moment(link.lastClickedAt).fromNow()})`
                  : '— Never Clicked —'}
              </dd>
            </div>
          </dl>
        </div>
      </div>
      
      {/* Delete Action */}
      <div className="mt-8 pt-4 border-t border-red-200">
        <h3 className="text-lg font-medium text-red-700 mb-2">Danger Zone</h3>
        <button
          onClick={handleDelete}
          className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300"
        >
          🗑️ Delete This Link Permanently
        </button>
      </div>
      
    </div>
  );
};

export default StatsPage;