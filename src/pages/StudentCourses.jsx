import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserProfile, getCourseById } from '../utils/api';
import styles from '../styles/StudentCourses.module.css';

const StudentCourses = (props) => {
  const { user } = props;
  const id = user.userId;
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      setError('');
      try {
        const userProfile = await getUserProfile(id);
        const courseIds = userProfile.coursesSubscribed || [];

        const coursePromises = courseIds.map(courseId => getCourseById(courseId));
        const courseDetails = await Promise.all(coursePromises);
        setCourses(courseDetails);
      } catch (err) {
        console.error('Error fetching courses:', err);
        setError('Failed to load courses. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [id]);

  const handleWatchVideos = (courseId) => {
    navigate(`/course/${courseId}/videos`);
  };

  return (
    <div className={styles.studentCourses}>
      <h1 className={styles.pageTitle}>My Subscribed Courses</h1>

      {loading && <div className={styles.loading}>Loading courses...</div>}
      {error && <div className={styles.errorMessage}>{error}</div>}

      {!loading && !error && courses.length === 0 && (
        <div className={styles.noCourses}>You are not subscribed to any courses yet.</div>
      )}

      {!loading && !error && courses.length > 0 && (
        <div className={styles.coursesGrid}>
          {courses.map(course => (
            <div key={course._id} className={styles.courseCard}>
              <div className={styles.courseImage}>
                <img
                  src={course.thumbnail || 'https://via.placeholder.com/300x200?text=Course+Thumbnail'}
                  alt={course.name}
                />
              </div>
              <div className={styles.courseContent}>
                <h2 className={styles.courseTitle}>{course.name}</h2>
                <p className={styles.courseDescription}>
                  {course.description?.substring(0, 100) || 'No description available'}...
                </p>
                <p className={styles.courseDetails}>
                  <strong>Instructor:</strong> {course.instructor || 'N/A'}
                </p>
                <p className={styles.courseTags}>
                  <strong>Tags:</strong>{' '}
                  {course.tags?.length > 0 ? course.tags.join(', ') : 'None'}
                </p>
                <button
                  className={styles.watchBtn}
                  onClick={() => handleWatchVideos(course._id)}
                >
                  Watch Videos
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentCourses;
