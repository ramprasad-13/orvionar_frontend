import React from 'react';

const LinkModel = ({ isOpen, onClose, onSubmit, formData, handleChange, isLoading, modalError }) => {
  if (!isOpen) return null;

  // --- Validation Helpers ---

  // FIX: Added protocol check to avoid "Failed to construct 'URL': Invalid URL" error
  const isValidUrl = (url) => {
    if (!url || url.length < 5) return false;
    
    // Must start with http:// or https:// for native URL constructor to work
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        return false;
    }
    
    try {
        new URL(url); 
        return true;
    } catch (e) {
        console.log(e)
        return false;
    }
  };

  // Client-side Custom Code validation
  const isValidCustomCode = (code) => {
    if (!code) return true; // Optional field
    // Regex check for 6-8 alphanumeric characters
    return /^[A-Za-z0-9]{6,8}$/.test(code);
  };
  
  // Form is valid if targetUrl is valid AND customCode is valid (or empty)
  const isFormValid = isValidUrl(formData.targetUrl) && isValidCustomCode(formData.customCode);

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        
        <h3 className="text-xl font-semibold mb-4 text-gray-900">Create a New TinyLink</h3>
        
        {/* Display Error Message Inside Modal */}
        {modalError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded relative mb-4 text-sm" role="alert">
            {modalError}
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-4">
          
          {/* Target URL Input */}
          <div>
            <label htmlFor="targetUrl" className="block text-sm font-medium text-gray-700">Target URL (Required)</label>
            <input
              type="url"
              name="targetUrl"
              id="targetUrl"
              value={formData.targetUrl}
              onChange={handleChange}
              required
              placeholder="e.g., https://www.example.com/long-page"
              className={`mt-1 block w-full px-3 py-2 border ${formData.targetUrl && !isValidUrl(formData.targetUrl) ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
            />
            {formData.targetUrl && !isValidUrl(formData.targetUrl) && (
              <p className="text-red-500 text-xs mt-1">Please enter a valid URL (must include http:// or https://).</p>
            )}
          </div>

          {/* Custom Code Input */}
          <div>
            <label htmlFor="customCode" className="block text-sm font-medium text-gray-700">Custom Short Code (Optional)</label>
            <input
              type="text"
              name="customCode"
              id="customCode"
              value={formData.customCode}
              onChange={handleChange}
              placeholder="e.g., docs (6-8 alphanumeric chars)"
              className={`mt-1 block w-full px-3 py-2 border ${formData.customCode && !isValidCustomCode(formData.customCode) ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
            />
            {formData.customCode && !isValidCustomCode(formData.customCode) && (
              <p className="text-red-500 text-xs mt-1">Must be 6 to 8 alphanumeric characters.</p>
            )}
            <p className="text-gray-500 text-xs mt-1">Leave blank to auto-generate a code.</p>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition duration-150"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              // Disable if loading or form is invalid (inline validation check)
              disabled={isLoading || !isFormValid} 
              className={`px-4 py-2 text-white font-semibold rounded-md shadow-md transition duration-300 ${
                isLoading || !isFormValid
                  ? 'bg-indigo-300 cursor-not-allowed'
                  : 'bg-indigo-600 hover:bg-indigo-700'
              }`}
            >
              {isLoading ? 'Creating...' : 'Shorten Link'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LinkModel;