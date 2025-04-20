import { useState } from 'react';
import { requestResetPassword } from '../utils/api';
import styles from '../styles/RequestResetPassword.module.css'; // Use CSS module

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
    <div className={styles.resetContainerWrapper}>
      <div className={styles.resetBox}>
        <h2 className={styles.resetTitle}>Reset Your Password</h2>
        <p className={styles.resetSubtitle}>Enter your email to receive a reset link</p>

        {message && <div className={styles.successMessage}>{message}</div>}
        {error && <div className={styles.errorMessage}>{error}</div>}

        <form onSubmit={handleRequestReset} className={styles.resetForm}>
          <div className={styles.inputGroup}>
            <label htmlFor="email" className={styles.inputLabel}>Email Address</label>
            <input
              type="email"
              id="email"
              className={styles.inputField}
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" className={styles.resetBtn}>Send Reset Link</button>
        </form>
      </div>
    </div>
  );
};

export default RequestResetPassword;
