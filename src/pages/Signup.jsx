import { useState } from 'react';
import { signup } from '../utils/api';
import { Link } from 'react-router-dom';
import useTitle from '../components/useTitle';

const Signup = () => {
  useTitle('Signup');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [fullName, setFullName] = useState('');
  const [college, setCollege] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!email || !password || !phoneNumber || !fullName || !college) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      const response = await signup(fullName, email, password, phoneNumber, college);

      if (response.message) {
        setSuccess(response.message);
        setError('');
      } else {
        setError('Error creating account. Please try again.');
      }
    } catch (error) {
      setError(error.response ? error.response.data.message : 'Server error. Please try again later.');
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-50 px-4">
      <div className="bg-white shadow-md rounded-md p-8 w-full max-w-lg border border-orange-300">
        <h2 className="text-3xl font-bold text-black mb-2 text-center">Sign Up</h2>
        <p className="text-gray-600 mb-6 text-center">Create your account to get started</p>

        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-2 mb-4 rounded text-sm">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-100 text-green-700 px-4 py-2 mb-4 rounded text-sm">
            {success}
          </div>
        )}

        <form onSubmit={handleSignup} className="space-y-5">
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-black mb-1">Full Name</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              placeholder="Enter your full name"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-black mb-1">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-black mb-1">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-black mb-1">Phone Number</label>
            <input
              type="number"
              id="phoneNumber"
              name="phoneNumber"
              placeholder="Enter your phone number"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="college" className="block text-sm font-medium text-black mb-1">College</label>
            <input
              type="text"
              id="college"
              name="college"
              placeholder="Enter your college"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={college}
              onChange={(e) => setCollege(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white font-semibold py-2 px-4 rounded hover:bg-orange-600 transition duration-200"
          >
            Sign Up
          </button>

          <div className="mt-4 text-center text-sm text-gray-700">
            <p>
              Already have an account?{' '}
              <Link to="/login" className="text-orange-600 hover:underline">
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
