import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/Domains.module.css';
import { getAllCoursesWithoutAuth } from '../utils/api';

const Domains = () => {
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
        // Fetch all courses at once
        const allCourses = await getAllCoursesWithoutAuth();

        // Categorize courses by domain
        const coursesByDomain = {
          cse: [], ece: [], mech: [], civil: [],
          management: [], pharmacy: [], agriculture: [], others: []
        };

        allCourses.forEach(course => {
          const domain = course.domain.toLowerCase();
          if (coursesByDomain[domain]) {
            coursesByDomain[domain].push(course);
          } else {
            coursesByDomain.others.push(course); // Fallback for unrecognized domains
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
    <div className={styles['domains-container']}>
      <h1 className={styles['main-title']}>Explore Courses by Domain</h1>

      {/* Domain Navigation */}
      <nav className={styles['domain-nav']}>
        {Object.keys(domains).map((domain) => (
          <button
            key={domain}
            className={`${styles['domain-btn']} ${selectedDomain === domain ? styles['active'] : ''}`}
            onClick={() => setSelectedDomain(domain)}
            type="button"
          >
            {domainDisplayNames[domain]}
          </button>
        ))}
      </nav>

      {/* Courses Section */}
      <section className={styles['courses-section']}>
        {loading ? (
          <p className={styles['loading-text']}>Loading courses...</p>
        ) : domains[selectedDomain].length > 0 ? (
          <div className={styles['course-grid']}>
            {domains[selectedDomain].map((course) => (
              <div className={styles['course-card']} key={course._id}>
                <img
                  src={course.thumbnail}
                  alt={course.name}
                  className={styles['course-thumbnail']}
                />
                <div className={styles['course-content']}>
                  <h3 className={styles['course-title']}>{course.name}</h3>
                  <p className={styles['course-instructor']}>By {course.instructor}</p>
                  <p className={styles['course-description']}>{course.description}</p>
                  <p className={styles['course-tags']}>{course.tags.join(", ")}</p>
                  <button
                    type="button"
                    className={styles['enroll-btn']}
                    onClick={() => handleKnowMore(course._id)}
                  >
                    Know More
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className={styles['no-courses']}>
            No courses available in {domainDisplayNames[selectedDomain]} domain
          </p>
        )}
      </section>
    </div>
  );
};

export default Domains;