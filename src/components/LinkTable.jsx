import React from 'react';
import moment from 'moment'; // Recommended for date formatting

const LinkTable = ({ links, onDelete }) => {
  if (links.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">
        <p className="text-lg mb-2">No links found.</p>
        <p>Click 'Create New Link' to get started!</p>
      </div>
    );
  }

  const handleCopy = (code) => {
    // Assuming your base URL is available globally or passed down (e.g., VITE_BASE_URL)
    const baseUrl = window.location.origin; 
    const shortLink = `${baseUrl}/${code}`;
    
    navigator.clipboard.writeText(shortLink).then(() => {
      alert(`Copied: ${shortLink}`);
    }).catch(err => {
      console.error('Could not copy text: ', err);
    });
  };

  return (
    <div className="mt-8 shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Short Code
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Target URL
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Clicks
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Clicked
              </th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {links.map((link) => (
              <tr key={link.shortCode} className="hover:bg-gray-50">
                
                {/* Short Code */}
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">
                  <a href={`${import.meta.env.VITE_BACKEND_URL}/${link.shortCode}`} target="_blank" rel="noopener noreferrer" className="hover:underline">
                    /{link.shortCode}
                  </a>
                </td>

                {/* Target URL */}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <div className="truncate w-64" title={link.targetUrl}>
                    {link.targetUrl}
                  </div>
                </td>

                {/* Clicks */}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {link.totalClicks}
                </td>

                {/* Last Clicked */}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {link.lastClickedAt 
                    ? moment(link.lastClickedAt).fromNow() 
                    : 'Never'}
                </td>

                {/* Actions */}
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                  <button
                    onClick={() => handleCopy(link.shortCode)}
                    className="text-indigo-600 hover:text-indigo-900 transition duration-150"
                  >
                    Copy
                  </button>
                  <a 
                    href={`/code/${link.shortCode}`}
                    className="text-gray-600 hover:text-gray-900 transition duration-150 ml-2"
                  >
                    Stats
                  </a>
                  <button
                    onClick={() => onDelete(link.shortCode)}
                    className="text-red-600 hover:text-red-900 transition duration-150 ml-2"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LinkTable;