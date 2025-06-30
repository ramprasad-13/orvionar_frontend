import { useState } from 'react';
import { requestResetPassword } from '../utils/api';

const RequestResetPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleRequestReset = async (e) => {
    e.preventDefault();

    setMessage('');
    setError('');

    try {
      const response = await requestResetPassword(email);

      if (response.message) {
        setMessage(response.message);
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError('Something went wrong. Please try again.');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-50 px-4">
      <div className="bg-white shadow-lg border border-orange-300 rounded-md p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-black mb-2 text-center">Reset Your Password</h2>
        <p className="text-gray-600 mb-6 text-center">Enter your email to receive a reset link</p>

        {message && (
          <div className="bg-green-100 text-green-700 px-4 py-2 mb-4 rounded text-sm text-center">
            {message}
          </div>
        )}

        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-2 mb-4 rounded text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleRequestReset} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-black mb-1">Email Address</label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white font-semibold py-2 px-4 rounded hover:bg-orange-600 transition duration-200"
          >
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
};

export default RequestResetPassword;
