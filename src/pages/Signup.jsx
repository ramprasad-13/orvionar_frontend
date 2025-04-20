import { useState } from 'react';
import { signup } from '../utils/api';
import { Link } from 'react-router-dom';
import styles from '../styles/Signup.module.css'; // Import CSS module

const Signup = () => {
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
    <div className={styles.signupContainerWrapper}>
      <div className={styles.signupBox}>
        <h2 className={styles.signupTitle}>Sign Up</h2>
        <p className={styles.signupSubtitle}>Create your account to get started</p>

        {error && <div className={styles.errorMessage}>{error}</div>}
        {success && <div className={styles.successMessage}>{success}</div>}

        <form onSubmit={handleSignup} className={styles.signupForm}>
          <div className={styles.inputGroup}>
            <label htmlFor="fullName" className={styles.inputLabel}>Full Name</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              placeholder="Enter your full name"
              className={styles.inputField}
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="email" className={styles.inputLabel}>Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              className={styles.inputField}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password" className={styles.inputLabel}>Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              className={styles.inputField}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="phoneNumber" className={styles.inputLabel}>Phone Number</label>
            <input
              type="number"
              id="phoneNumber"
              name="phoneNumber"
              placeholder="Enter your phone number"
              className={styles.inputField}
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="college" className={styles.inputLabel}>College</label>
            <input
              type="text"
              id="college"
              name="college"
              placeholder="Enter your college"
              className={styles.inputField}
              value={college}
              onChange={(e) => setCollege(e.target.value)}
            />
          </div>

          <button type="submit" className={styles.signupBtn}>Sign Up</button>

          <div className={styles.authLinks}>
            <p>Already have an account? <Link to="/login" className={styles.authLink}>Login</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
