import React, { useState, useEffect } from 'react';
import LinkModel from './LinkModel'; // Component to handle the Add/Edit form
import LinkTable from './LinkTable'; // Component to display the list of links
import { fetchLinks, createLink, deleteLink } from '../api/linkApi'; // API functions

// Initial state for the new link form
const initialLinkState = {
  targetUrl: '',
  customCode: '',
};

const Dashboard = () => {
  const [links, setLinks] = useState([]);
  const [formData, setFormData] = useState(initialLinkState);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // State for errors returned by the server, primarily displayed in the modal
  const [modalError, setModalError] = useState(null); 
  
  // State for informational/success messages displayed on the dashboard
  const [successMessage, setSuccessMessage] = useState(null); 

  // --- Data Fetching ---
  const loadLinks = async () => {
    setModalError(null);
    try {
      const data = await fetchLinks();
      // Safety check: Ensure data is an array before setting state
      setLinks(Array.isArray(data) ? data : []); 
    } catch (err) {
      console.error('Failed to load links:', err);
      setModalError('Could not load links. Please check the server connection.');
      setLinks([]); 
    }
  };

  useEffect(() => {
    loadLinks();
  }, []);

  // --- Form Handlers ---
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setModalError(null);
    setSuccessMessage(null); // Clear previous success messages
    
    try {
      const response = await createLink(formData);
      
      // Check for success/info response (Backend returns 200 OK for duplicate URLs)
      if (response.shortCode && response.message) { 
          // Case 1: Duplicate URL found (Backend returned 200 with 'message')
          setSuccessMessage(response.message);
      } else {
          // Case 2: New link created (Backend returned 201)
          // Add the new link to state and sort (newest first)
          setLinks(prevLinks => [response, ...prevLinks].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
          setSuccessMessage(`Link successfully created! Code: /${response.shortCode}`);
      }
      
      // Clean up
      setFormData(initialLinkState);
      setIsModalOpen(false);

    } catch (err) {
      // Handles 400 (Validation) and 409 (Conflict) errors
      console.error('Creation failed:', err);
      const errorMessage = err.response?.data?.error || 'Failed to create link. Check input and ensure http/https is used.';
      setModalError(errorMessage); // Keep the error displayed inside the modal
    } finally {
      setIsLoading(false);
    }
  };

  // --- Delete Handler ---
  const handleDelete = async (code) => {
    if (!window.confirm(`Are you sure you want to delete link /${code}?`)) return;

    try {
      await deleteLink(code);
      // Remove the link from the local state
      setLinks(links.filter(link => link.shortCode !== code));
      setSuccessMessage(`Link /${code} successfully deleted.`);
    } catch (err) {
      console.error('Deletion failed:', err);
      setModalError('Failed to delete link. Try again.');
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">🔗 TinyLink Dashboard</h1>
        <button
          onClick={() => {
            setFormData(initialLinkState); 
            setModalError(null); // Clear errors from previous attempts
            setSuccessMessage(null); // Clear success message if any
            setIsModalOpen(true);
          }}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300"
        >
          ➕ Create New Link
        </button>
      </header>

      {/* Success/Info Message Display */}
      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
          <strong className="font-bold">Info:</strong>
          <span className="block sm:inline ml-2">{successMessage}</span>
          <button onClick={() => setSuccessMessage(null)} className="absolute top-0 bottom-0 right-0 px-4 py-3 text-green-700">
             &times;
          </button>
        </div>
      )}

      {/* Link Creation Modal */}
      <LinkModel
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateSubmit}
        formData={formData}
        handleChange={handleChange}
        isLoading={isLoading}
        modalError={modalError} // Pass error state to modal
      />
      
      {/* Table of Links */}
      <LinkTable links={links} onDelete={handleDelete} />

    </div>
  );
};

export default Dashboard;