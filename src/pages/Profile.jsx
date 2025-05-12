import React, { useEffect, useState } from 'react';
import { getUserProfile } from '../utils/api';
import styles from '../styles/Profile.module.css';
import useTitle from '../components/useTitle';

const Profile = (props) => {
  useTitle("Profile")
  const { user } = props;
  const id = user.userId;
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUserProfile(id);
        setUserInfo(userData || {});
      } catch (error) {
        console.log('Error fetching User Info', error);
        setUserInfo({});
      }
    };
    fetchUser();
  }, [id]);

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileCard}>
        <div className={styles.profileHeader}>
          <h1 className={styles.profileTitle}>User Profile</h1>
          <span className={styles.profileId}>ID: {id}</span>
        </div>

        <div className={styles.profileContent}>
          <div className={styles.profileItem}>
            <span className={styles.label}>Name:</span>
            <span className={styles.value}>{userInfo.name || 'N/A'}</span>
          </div>

          <div className={styles.profileItem}>
            <span className={styles.label}>Email:</span>
            <span className={styles.value}>{userInfo.email || 'N/A'}</span>
          </div>

          <div className={styles.profileItem}>
            <span className={styles.label}>Mobile Number:</span>
            <span className={styles.value}>+91 {userInfo.phoneNumber || 'N/A'}</span>
          </div>

          {user.role === 'student' && (
            <>
              <div className={styles.profileItem}>
                <span className={styles.label}>College:</span>
                <span className={styles.value}>{userInfo.college || 'N/A'}</span>
              </div>

              <div className={styles.profileItem}>
                <span className={styles.label}>Subscribed Courses:</span>
                <span className={styles.value}>
                  {userInfo.noSubscribedCourses || 0}
                </span>
              </div>
            </>
          )}

          <div className={styles.profileItem}>
            <span className={styles.label}>Status:</span>
            <span
              className={`${styles.value} ${styles.status} ${
                styles[userInfo.verification?.toLowerCase()] || ''
              }`}
            >
              {userInfo.verification || 'N/A'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
