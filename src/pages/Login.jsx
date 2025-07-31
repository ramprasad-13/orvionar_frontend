import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../utils/api';
// import { useUser } from '../context/UserContext'; // No longer import useUser from UserContext directly
import { useUser } from '../context/useUser'; // Import useUser from its new separate file
import useTitle from '../components/useTitle';

const Login = () => {
  useTitle('Login');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setUser, loadUser } = useUser(); // Get loadUser function from context

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // If a token exists, and the user data is already being loaded/set by context,
      // just navigate. The context will handle setting 'user'.
      navigate('/my-library'); 
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await login(email, password);
      const { token } = response;

      if (token) {
        localStorage.setItem('token', token); // ONLY store the raw, signed token

        // Explicitly trigger user data load in context after setting the token.
        // This ensures the context state is updated immediately.
        await loadUser(); 

        navigate('/my-library'); 
      } else {
        setError('Failed to authenticate');
      }
    } catch (error) {
      setError('Invalid credentials or server error');
      console.error(error);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setUser(null); 
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-50 px-4">
      <div className="bg-white shadow-md rounded-md p-8 w-full max-w-md border border-orange-300">
        <h2 className="text-3xl font-bold text-black mb-2 text-center">Welcome Back</h2>
        <p className="text-gray-600 mb-6 text-center">Please login to your account</p>

        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-2 mb-4 rounded text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-black mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-black mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white font-semibold py-2 px-4 rounded hover:bg-orange-600 transition duration-200"
          >
            Login
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-700">
          <p className="mb-2">
            Don&apos;t have an account?{' '}
            <a href="/signup" className="text-orange-600 hover:underline">
              Sign Up
            </a>
          </p>
          <p>
            <a href="/request-reset-password" className="text-orange-600 hover:underline">
              Forgot Password?
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;