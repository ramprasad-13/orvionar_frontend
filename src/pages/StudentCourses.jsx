import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserProfile, getCourseById } from '../utils/api';
import Spinner from '../components/Spinner';

const StudentCourses = ({ user }) => {
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
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">🎓 My Subscribed Courses</h1>

      {loading && (
        <Spinner />
      )}

      {error && (
        <div className="text-center text-red-600 bg-red-100 p-4 rounded-md max-w-lg mx-auto">{error}</div>
      )}

      {!loading && !error && courses.length === 0 && (
        <div className="text-center text-gray-500 text-lg">You are not subscribed to any courses yet.</div>
      )}

      {!loading && !error && courses.length > 0 && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 px-4 max-w-7xl mx-auto">
          {courses.map(course => (
            <div key={course._id} className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition duration-300">
              <img
                src={course.thumbnail || 'https://via.placeholder.com/300x200?text=Course+Thumbnail'}
                alt={course.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-5">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">{course.name}</h2>
                <p className="text-gray-600 text-sm mb-3">
                  {course.description?.substring(0, 100) || 'No description available'}...
                </p>
                <p className="text-sm text-gray-700 mb-1">
                  <strong>Instructor:</strong> {course.instructor || 'N/A'}
                </p>
                <p className="text-sm text-gray-700 mb-3">
                  <strong>Tags:</strong> {course.tags?.length > 0 ? course.tags.join(', ') : 'None'}
                </p>
                <button
                  onClick={() => handleWatchVideos(course._id)}
                  className="mt-2 w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition"
                >
                  ▶ Watch Videos
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
