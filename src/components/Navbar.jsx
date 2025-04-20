import { useState, useEffect } from 'react';
import { useNavigate, useLocation, NavLink } from 'react-router-dom';
import styles from '../styles/Navbar.module.css';
import navbarLogo from '../assets/logo/logo.png';
import { getCoursesByDomainWithoutAuth } from '../utils/api';
import TypingAnimation from '../components/TypingAnimation'; // Import the new component

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProgramsOpen, setIsProgramsOpen] = useState(false);
  const [selectedDomain, setSelectedDomain] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loadingCourses, setLoadingCourses] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const domains = [
    { display: 'CSE/IT', key: 'cse' },
    { display: 'ECE/EEE', key: 'ece' },
    { display: 'MECH', key: 'mech' },
    { display: 'CIVIL', key: 'civil' },
    { display: 'MANAGEMENT/B.COM', key: 'management' },
    { display: 'PHARMACY', key: 'pharmacy' },
    { display: 'AGRICULTURE', key: 'agriculture' },
    { display: 'OTHERS', key: 'others' },
  ];

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, [location]);

  const fetchCourses = async (domainKey) => {
    try {
      setLoadingCourses(true);
      const coursesData = await getCoursesByDomainWithoutAuth(domainKey);
      setCourses(coursesData);
    } catch (error) {
      console.error('Error fetching courses:', error);
      setCourses([]);
    } finally {
      setLoadingCourses(false);
    }
  };

  const handleDomainClick = (domainKey) => {
    if (selectedDomain === domainKey) {
      setSelectedDomain(null);
      setCourses([]);
    } else {
      setSelectedDomain(domainKey);
      fetchCourses(domainKey);
    }
  };

  const handleProgramsToggle = () => {
    setIsProgramsOpen(!isProgramsOpen);
    setSelectedDomain(null);
    setCourses([]);
  };

  const handleLoginLogout = () => {
    if (isLoggedIn) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setIsLoggedIn(false);
      navigate('/');
    } else {
      navigate('/login');
    }
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setIsProgramsOpen(false);
    setSelectedDomain(null);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarContainer}>
        <div className={styles.logoContainer}>
          <NavLink to="/" onClick={() => setIsMobileMenuOpen(false)}>
            <img src={navbarLogo} alt="Logo" className={styles.navbarLogo} />
          </NavLink>
          <TypingAnimation />
        </div>

        <button className={styles.mobileToggle} onClick={toggleMobileMenu}>
          <span className={`${styles.hamburger} ${isMobileMenuOpen ? styles.open : ''}`}>
            {isMobileMenuOpen ? (
              <span className={styles.closeIcon}>✕</span>
            ) : (
              <>
                <span className={styles.bar}></span>
                <span className={styles.bar}></span>
                <span className={styles.bar}></span>
              </>
            )}
          </span>
        </button>

        <div className={`${styles.navMenu} ${isMobileMenuOpen ? styles.open : ''}`}>
          <ul className={styles.navList}>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </NavLink>
            </li>

            <li className={styles.programsContainer}>
              <span
                className={styles.navLink}
                onClick={handleProgramsToggle}
              >
                Programs <span className={styles.arrow}>▼</span>
              </span>
              {isProgramsOpen && (
                <div className={`${styles.dropdown} ${isProgramsOpen ? styles.open : ''}`}>
                  <ul className={styles.domainList}>
                    {domains.map((domain) => (
                      <li
                        key={domain.key}
                        className={styles.domainItem}
                        onClick={() => handleDomainClick(domain.key)}
                      >
                        <span>
                          {domain.display} 
                          <span className={styles.domainArrow}>
                            {window.innerWidth <= 768 ? '▼' : '▶'}
                          </span>
                        </span>
                        {selectedDomain === domain.key && (
                          <ul className={styles.coursesList}>
                            {loadingCourses ? (
                              <li className={styles.loading}>Loading courses...</li>
                            ) : courses.length > 0 ? (
                              courses.map((course) => (
                                <li key={course._id}>
                                  <NavLink
                                    to={`/course/${course._id}`}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                  >
                                    {course.name}
                                  </NavLink>
                                </li>
                              ))
                            ) : (
                              <li className={styles.noCourses}>No courses available</li>
                            )}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>

            {['My-library', 'About-Us', 'Careers'].map((label) => (
              <li key={label}>
                <NavLink
                  to={`/${label.toLowerCase().replace(' ', '-')}`}
                  className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>

          <button className={styles.authButton} onClick={handleLoginLogout}>
            {isLoggedIn ? 'Logout' : 'Login / Signup'}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;