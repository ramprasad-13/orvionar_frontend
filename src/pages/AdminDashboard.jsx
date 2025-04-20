import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/AdminDashboard.module.css';

const AdminDashboard = () => {
  return (
    <div className={styles.adminDashboard}>
      <h1 className={styles.dashboardTitle}>Admin Dashboard</h1>
      <p className={styles.dashboardSubtitle}>Manage your platform efficiently</p>

      <div className={styles.cardsContainer}>
        {/* Card for Courses */}
        <div className={styles.dashboardCard}>
          <h3 className={styles.cardTitle}>Courses</h3>
          <p className={styles.cardDescription}>Create, edit, and manage courses</p>
          <Link to="/courses" className={styles.cardLink}>Go to Courses</Link>
        </div>

        {/* Card for User Access */}
        <div className={styles.dashboardCard}>
          <h3 className={styles.cardTitle}>User Access</h3>
          <p className={styles.cardDescription}>Control user permissions and access</p>
          <Link to="/admin-user-access" className={styles.cardLink}>Go to User Access</Link>
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

export default AdminDashboard;