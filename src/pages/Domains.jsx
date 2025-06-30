import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllCoursesWithoutAuth } from '../utils/api';
import useTitle from '../components/useTitle';
import Spinner from '../components/Spinner';

const Domains = () => {
  useTitle('Courses');
  const [domains, setDomains] = useState({
    cse: [], ece: [], mech: [], civil: [],
    management: [], pharmacy: [], agriculture: [], others: []
  });
  const [selectedDomain, setSelectedDomain] = useState('cse');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const domainDisplayNames = {
    cse: 'CSE/IT',
    ece: 'ECE/EEE',
    mech: 'MECH',
    civil: 'CIVIL',
    management: 'Management/B.Com',
    pharmacy: 'PHARMACY',
    agriculture: 'AGRICULTURE',
    others: 'OTHERS'
  };

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const allCourses = await getAllCoursesWithoutAuth();

        const coursesByDomain = {
          cse: [], ece: [], mech: [], civil: [],
          management: [], pharmacy: [], agriculture: [], others: []
        };

        allCourses.forEach(course => {
          const domain = course.domain?.toLowerCase();
          if (coursesByDomain[domain]) {
            coursesByDomain[domain].push(course);
          } else {
            coursesByDomain.others.push(course);
          }
        });

        setDomains(coursesByDomain);
      } catch (error) {
        console.error('Error fetching courses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleKnowMore = (courseId) => {
    navigate(`/course/${courseId}`, { replace: false });
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        📚 Explore Courses by Domain
      </h1>

      {/* Domain Navigation */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {Object.keys(domains).map((domain) => (
          <button
            key={domain}
            type="button"
            className={`px-4 py-2 rounded-full text-sm font-medium transition 
              ${selectedDomain === domain 
                ? 'bg-orange-500 text-white shadow-md' 
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-orange-100'}`}
            onClick={() => setSelectedDomain(domain)}
          >
            {domainDisplayNames[domain]}
          </button>
        ))}
      </div>

      {/* Courses Grid */}
      <div className="max-w-7xl mx-auto">
        {loading ? (
          <Spinner/>
        ) : domains[selectedDomain].length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 px-4">
            {domains[selectedDomain].map((course) => (
              <div
                key={course._id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300 overflow-hidden"
              >
                <img
                  src={course.thumbnail || 'https://via.placeholder.com/400x200?text=Course+Thumbnail'}
                  alt={course.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-5">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{course.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {course.description?.length > 200
                      ? `${course.description.substring(0, 200)}...`
                      : course.description || 'No description available'}
                  </p>
                  <button
                    onClick={() => handleKnowMore(course._id)}
                    className="w-full mt-auto bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition"
                  >
                    Know More →
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 text-lg">
            No courses available in <strong>{domainDisplayNames[selectedDomain]}</strong> domain
          </p>
        )}
      </div>
    </div>
  );
};

export default Domains;
