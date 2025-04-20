import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/StudentDashboard.module.css'; // CSS Module import

const StudentDashboard = () => {
  return (
    <div className={styles.adminDashboard}>
      <h1 className={styles.dashboardTitle}>Student Dashboard</h1>
      <p className={styles.dashboardSubtitle}>Track All your Courses efficiently</p>

      <div className={styles.cardsContainer}>
        {/* Card for Courses */}
        <div className={styles.dashboardCard}>
          <h3 className={styles.cardTitle}>All Courses</h3>
          <p className={styles.cardDescription}>All Available courses</p>
          <Link to="/domains" className={styles.cardLink}>Go to Courses</Link>
        </div>

        {/* Card for Videos */}
        <div className={styles.dashboardCard}>
          <h3 className={styles.cardTitle}>My Courses</h3>
          <p className={styles.cardDescription}>Your Subscribed Courses</p>
          <Link to="/courses" className={styles.cardLink}>My Courses</Link>
        </div>

        {/* Card for User Profile */}
        <div className={styles.dashboardCard}>
          <h3 className={styles.cardTitle}>My Profile</h3>
          <p className={styles.cardDescription}>Your profile Section</p>
          <Link to="/profile" className={styles.cardLink}>My Profile</Link>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
