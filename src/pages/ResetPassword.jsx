import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { resetPassword } from '../utils/api';
import styles from '../styles/ResetPassword.module.css'; // Import CSS Module

const ResetPassword = () => {
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
    <div className={styles.resetContainerWrapper}>
      <div className={styles.resetBox}>
        <h2 className={styles.resetTitle}>Reset Your Password</h2>
        <p className={styles.resetSubtitle}>Enter your new password below</p>

        {message && <div className={styles.successMessage}>{message}</div>}
        {error && <div className={styles.errorMessage}>{error}</div>}

        <form onSubmit={handleResetPassword} className={styles.resetForm}>
          <div className={styles.inputGroup}>
            <label htmlFor="newPassword" className={styles.inputLabel}>New Password</label>
            <input
              type="password"
              id="newPassword"
              className={styles.inputField}
              placeholder="Enter your new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="confirmPassword" className={styles.inputLabel}>Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              className={styles.inputField}
              placeholder="Confirm your new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className={styles.resetBtn}>Reset Password</button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
