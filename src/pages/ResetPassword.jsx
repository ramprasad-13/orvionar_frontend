import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { resetPassword } from '../utils/api';
import useTitle from '../components/useTitle';

const ResetPassword = () => {
  useTitle('Reset Password');
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setMessage('');
    setError('');

    try {
      const response = await resetPassword(token, newPassword);

      if (response.message) {
        setMessage(response.message);
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError('Something went wrong. Please try again.');
      }
    }
  };

  useEffect(() => {
    if (!token) {
      setError('Invalid or expired token.');
    }
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-50 px-4">
      <div className="bg-white shadow-lg border border-orange-300 rounded-md p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-black mb-2 text-center">Reset Your Password</h2>
        <p className="text-gray-600 mb-6 text-center">Enter your new password below</p>

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

        <form onSubmit={handleResetPassword} className="space-y-5">
          <div>
            <label htmlFor="newPassword" className="block text-sm font-medium text-black mb-1">New Password</label>
            <input
              type="password"
              id="newPassword"
              placeholder="Enter your new password"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-black mb-1">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirm your new password"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white font-semibold py-2 px-4 rounded hover:bg-orange-600 transition duration-200"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
