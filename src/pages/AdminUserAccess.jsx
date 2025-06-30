import React, { useEffect, useState } from 'react';
import {
  getAllCourses,
  getUserByMail,
  addUserToCourse,
  removeUserFromCourse,
} from '../utils/api';

const AdminUserAccess = () => {
  const [courses, setCourses] = useState([]);
  const [email, setEmail] = useState('');
  const [userProfile, setUserProfile] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [message, setMessage] = useState({ text: '', type: '' });

  useEffect(() => {
    getAllCourses()
      .then((res) => setCourses(res))
      .catch(() => setMessage({ text: 'Failed to load courses', type: 'error' }));
  }, []);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setMessage({ text: '', type: '' });
    setUserProfile(null);
    try {
      const userData = await getUserByMail(email);
      setUserProfile(userData);
    } catch {
      setMessage({ text: 'User not found or invalid email', type: 'error' });
    }
  };

  const handleAddCourse = async () => {
    if (!selectedCourse || !userProfile) return;
    try {
      await addUserToCourse(selectedCourse, userProfile.userId);
      setMessage({ text: 'Course added successfully!', type: 'success' });
      const updatedUser = await getUserByMail(email);
      setUserProfile(updatedUser.profile);
      setSelectedCourse('');
    } catch {
      setMessage({ text: 'Failed to add course', type: 'error' });
    }
  };

  const handleRemoveCourse = async (courseId) => {
    if (!userProfile) return;
    try {
      await removeUserFromCourse(courseId, userProfile.userId);
      setMessage({ text: 'Course removed successfully!', type: 'success' });
      const updatedUser = await getUserByMail(email);
      setUserProfile(updatedUser.profile);
    } catch {
      setMessage({ text: 'Failed to remove course', type: 'error' });
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Manage User Course Access</h1>

      <form
        onSubmit={handleEmailSubmit}
        className="bg-white shadow-md rounded p-6 mb-6 space-y-4"
      >
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Student Email
          </label>
          <input
            id="email"
            type="email"
            className="mt-1 w-full border border-gray-300 rounded px-3 py-2"
            placeholder="Enter student email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Fetch User
        </button>
      </form>

      {message.text && (
        <div
          className={`mb-4 px-4 py-2 rounded text-sm font-medium ${
            message.type === 'success'
              ? 'bg-green-100 text-green-700'
              : 'bg-red-100 text-red-700'
          }`}
        >
          {message.text}
        </div>
      )}

      {userProfile && (
        <div className="bg-white shadow-md rounded p-6 space-y-6">
          <h2 className="text-xl font-semibold">User Profile</h2>
          <div className="space-y-2 text-sm text-gray-700">
            <p><strong>Name:</strong> {userProfile.name}</p>
            <p><strong>Email:</strong> {userProfile.email}</p>
            <p><strong>College:</strong> {userProfile.college}</p>
            <p><strong>Verification:</strong> {userProfile.verification}</p>
            <p><strong>Subscribed Courses:</strong> {userProfile.noSubscribedCourses}</p>
          </div>

          {userProfile.coursesSubscribed?.length > 0 && (
            <div>
              <h3 className="font-semibold mb-2">Current Courses</h3>
              <ul className="space-y-2 text-sm">
                {userProfile.coursesSubscribed.map((courseId) => {
                  const course = courses.find((c) => c._id === courseId);
                  return (
                    <li
                      key={courseId}
                      className="flex items-center justify-between bg-gray-100 px-4 py-2 rounded"
                    >
                      <span>{course ? course.name : courseId}</span>
                      <button
                        onClick={() => handleRemoveCourse(courseId)}
                        className="text-red-600 hover:underline text-sm"
                      >
                        Remove
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          <div>
            <h3 className="font-semibold mb-2 mt-6">Add a Course</h3>
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <div className="relative w-full sm:w-auto">
                <select
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                  className="border border-gray-300 rounded px-3 py-2 w-full sm:w-auto max-h-60 min-h-[44px] overflow-y-auto focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  size={5} // shows 5 options visibly
                >
                  <option value="">Select a course</option>
                  {courses
                    .filter((course) => !userProfile.coursesSubscribed.includes(course._id))
                    .map((course) => (
                      <option key={course._id} value={course._id}>
                        {course.name}
                      </option>
                    ))}
                </select>
              </div>

              <button
                onClick={handleAddCourse}
                disabled={!selectedCourse}
                className={`px-4 py-2 rounded text-white ${
                  selectedCourse
                    ? 'bg-green-600 hover:bg-green-700'
                    : 'bg-gray-400 cursor-not-allowed'
                }`}
              >
                Add Course
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUserAccess;
