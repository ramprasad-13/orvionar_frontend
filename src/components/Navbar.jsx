import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation, NavLink } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import navbarLogo from '../assets/logo2.webp';
import { getCoursesByDomainWithoutAuth } from '../utils/api';
import Spinner from '../components/Spinner';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProgramsOpen, setIsProgramsOpen] = useState(false);
  const [selectedDomain, setSelectedDomain] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const programsRef = useRef(null); // Ref for the programs dropdown

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

  const { data: courses = [], isLoading: loadingCourses } = useQuery({
    queryKey: ['courses', selectedDomain],
    queryFn: () => getCoursesByDomainWithoutAuth(selectedDomain),
    enabled: !!selectedDomain,
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, [location]);

  // Effect to handle clicks outside the programs dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (programsRef.current && !programsRef.current.contains(event.target) && isProgramsOpen) {
        setIsProgramsOpen(false);
        setSelectedDomain(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isProgramsOpen]);

  const handleDomainClick = (domainKey) => {
    setSelectedDomain(prev => (prev === domainKey ? null : domainKey));
  };

  const handleProgramsToggle = () => {
    setIsProgramsOpen(!isProgramsOpen);
    setSelectedDomain(null);
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

  const handleCourseClick = () => {
    // When a course is clicked, close all menus
    setIsMobileMenuOpen(false);
    setIsProgramsOpen(false);
    setSelectedDomain(null);
  };

  return (
    <nav className="bg-black text-white shadow-md sticky top-0 z-50">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between px-4 py-3">
        <NavLink to="/" onClick={() => setIsMobileMenuOpen(false)}>
          <img src={navbarLogo} alt="Logo" className="h-14 rounded transition-transform hover:scale-105" loading="lazy" />
        </NavLink>

        <button
          onClick={toggleMobileMenu}
          className="md:hidden text-orange-500 text-2xl"
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? '✕' : '☰'}
        </button>

        <div
          className={`${
            isMobileMenuOpen ? 'flex' : 'hidden'
          } md:flex flex-col md:flex-row md:items-center absolute md:static top-16 left-0 w-full md:w-auto bg-black md:bg-transparent transition-all duration-300 p-4 md:p-0 space-y-4 md:space-y-0 md:space-x-6`}
        >
          <NavLink to="/" onClick={() => setIsMobileMenuOpen(false)} className={({ isActive }) => `hover:bg-orange-500 px-3 py-2 rounded ${isActive ? 'bg-orange-500' : ''}`}>Home</NavLink>

          <div className="relative" ref={programsRef}> {/* Attach ref here */}
            <button onClick={handleProgramsToggle} className="hover:bg-orange-500 px-3 py-2 rounded flex items-center">
              Programs <span className="ml-1">▼</span>
            </button>
            {isProgramsOpen && (
              <div className="absolute top-full left-0 bg-white text-black rounded shadow-lg mt-2 w-72 z-40">
                <ul>
                  {domains.map((domain) => (
                    <li key={domain.key}>
                      <button
                        className="w-full text-left px-4 py-2 hover:bg-orange-500 hover:text-white"
                        onClick={() => handleDomainClick(domain.key)}
                      >
                        {domain.display} {selectedDomain === domain.key ? <span className="ml-1">▼</span> : <span className="ml-1">▶</span>}
                      </button>
                      {selectedDomain === domain.key && (
                        <ul className="bg-gray-100 max-h-60 overflow-y-auto px-4 py-2 border-t border-gray-200"> {/* Added bg-gray-100 for differentiation */}
                          {loadingCourses ? (
                            <li className="italic text-sm text-gray-600"><Spinner /></li>
                          ) : courses.length > 0 ? (
                            courses.map((course) => (
                              <li key={course._id}>
                                <NavLink
                                  to={`/course/${course._id}`}
                                  className="block px-2 py-1 hover:text-orange-600 bg-gray-200 my-1 rounded" // Added different background color and padding
                                  onClick={handleCourseClick}
                                >
                                  {course.name}
                                </NavLink>
                              </li>
                            ))
                          ) : (
                            <li className="italic text-sm text-gray-500">No courses available</li>
                          )}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {['My-library', 'About-Us', 'Careers'].map((label) => (
            <NavLink
              key={label}
              to={`/${label.toLowerCase().replace(' ', '-')}`}
              className={({ isActive }) => `hover:bg-orange-500 px-3 py-2 rounded ${isActive ? 'bg-orange-500' : ''}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {label}
            </NavLink>
          ))}

          <button onClick={handleLoginLogout} className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 w-full md:w-auto">
            {isLoggedIn ? 'Logout' : 'Login / Signup'}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;