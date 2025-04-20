import React, { useEffect, useState } from 'react';
import { getAllCourses, getUserByMail, addUserToCourse, removeUserFromCourse } from '../utils/api';
import styles from '../styles/AdminUserAccess.module.css';

const AdminUserAccess = () => {
  const [courses, setCourses] = useState([]);
  const [email, setEmail] = useState('');
  const [userProfile, setUserProfile] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [message, setMessage] = useState({ text: '', type: '' }); // For success/error messages

  // Fetch all courses on mount
  useEffect(() => {
    getAllCourses()
      .then(response => setCourses(response))
      .catch(error => {
        console.error('Error fetching courses:', error);
        setMessage({ text: 'Failed to load courses', type: 'error' });
      });
  }, []);

  // Handle email submission to fetch user profile
  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setMessage({ text: '', type: '' }); // Clear previous messages
    setUserProfile(null); // Reset profile

    try {
      const userData = await getUserByMail(email);
      setUserProfile(userData);
    } catch (error) {
      console.error('Error fetching user:', error);
      setMessage({ text: 'User not found or invalid email', type: 'error' });
    }
  };

  // Handle adding a course to the user
  const handleAddCourse = async () => {
    if (!selectedCourse || !userProfile) return;

    try {
      await addUserToCourse(selectedCourse, userProfile.userId);
      setMessage({ text: 'Course added successfully!', type: 'success' });
      // Refresh user profile to show updated courses
      const updatedUser = await getUserByMail(email);
      setUserProfile(updatedUser.profile);
      setSelectedCourse(''); // Reset dropdown
    } catch (error) {
      console.error('Error adding course:', error);
      setMessage({ text: 'Failed to add course', type: 'error' });
    }
  };

  // Handle removing a course from the user
  const handleRemoveCourse = async (courseId) => {
    if (!userProfile) return;

    try {
      await removeUserFromCourse(courseId, userProfile.userId);
      setMessage({ text: 'Course removed successfully!', type: 'success' });
      // Refresh user profile
      const updatedUser = await getUserByMail(email);
      setUserProfile(updatedUser.profile);
    } catch (error) {
      console.error('Error removing course:', error);
      setMessage({ text: 'Failed to remove course', type: 'error' });
    }
  };

  return (
    <div className={styles.adminUserAccess}>
      <h1 className={styles.adminTitle}>Manage User Course Access</h1>
      
      {/* Email Form */}
      <form onSubmit={handleEmailSubmit} className={styles.emailForm}>
        <div className={styles.formGroup}>
          <label htmlFor="email">Student Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter student email"
            required
          />
        </div>
        <button type="submit" className={styles.submitBtn}>Fetch User</button>
      </form>

      {/* Message Display */}
      {message.text && (
        <div className={`${styles.message} ${styles[message.type]}`}>
          {message.text}
        </div>
      )}

      {/* User Profile and Course Management */}
      {userProfile && (
        <div className={styles.userProfileCard}>
          <h2 className={styles.profileTitle}>User Profile</h2>
          <div className={styles.profileDetails}>
            <p><strong>Name:</strong> {userProfile.name}</p>
            <p><strong>Email:</strong> {userProfile.email}</p>
            <p><strong>College:</strong> {userProfile.college}</p>
            <p><strong>Verification:</strong> {userProfile.verification}</p>
            <p><strong>Subscribed Courses:</strong> {userProfile.noSubscribedCourses}</p>
          </div>

          {/* Current Courses */}
          {userProfile.coursesSubscribed.length > 0 && (
            <div className={styles.currentCourses}>
              <h3>Current Courses</h3>
              <ul>
                {userProfile.coursesSubscribed.map((courseId) => {
                  const course = courses.find(c => c._id === courseId);
                  return (
                    <li key={courseId}>
                      {course ? course.name : courseId}
                      <button
                        className={styles.removeBtn}
                        onClick={() => handleRemoveCourse(courseId)}
                      >
                        Remove
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          {/* Add Course Dropdown */}
          <div className={styles.addCourseSection}>
            <h3>Add a Course</h3>
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className={styles.courseDropdown}
            >
              <option value="">Select a course</option>
              {courses
                .filter(course => !userProfile.coursesSubscribed.includes(course._id))
                .map(course => (
                  <option key={course._id} value={course._id}>
                    {course.name}
                  </option>
                ))}
            </select>
            <button
              onClick={handleAddCourse}
              className={styles.addBtn}
              disabled={!selectedCourse}
            >
              Add Course
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUserAccess;