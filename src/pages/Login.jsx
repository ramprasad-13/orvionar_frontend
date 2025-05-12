import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../utils/api';
import styles from '../styles/Login.module.css';
import { useUser } from '../context/UserContext';
import useTitle from '../components/useTitle';

const Login = () => {

  useTitle('Login')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setUser } = useUser();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/');
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await login(email, password);
      const { token } = response;

      if (token) {
        localStorage.setItem('token', token);
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        localStorage.setItem('user', JSON.stringify(decodedToken));
        setUser(decodedToken);
        navigate('/my-library');
      } else {
        setError('Failed to authenticate');
      }
    } catch (error) {
      setError('Invalid credentials or server error');
      console.error(error);
    }
  };

  return (
    <div className={styles.loginContainerWrapper}>
      <div className={styles.loginBox}>
        <h2 className={styles.loginTitle}>Welcome Back</h2>
        <p className={styles.loginSubtitle}>Please login to your account</p>
        {error && <div className={styles.errorMessage}>{error}</div>}
        <form onSubmit={handleLogin} className={styles.loginForm}>
          <div className={styles.inputGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className={styles.loginBtn}>Login</button>
        </form>
        <div className={styles.authLinks}>
          <p>
            Don't have an account? <a href="/signup">Sign Up</a>
          </p>
          <p>
            <a href="/request-reset-password">Forgot Password?</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
