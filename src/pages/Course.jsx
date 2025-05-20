import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from '../styles/Course.module.css';
import { getCourseByIdWithoutAuth } from '../utils/api';
import WhyUs from '../components/WhyUs';
import SucessfulTransitions from '../components/SucessfulTransitions';
import Testimonials from '../components/Testimonials';
import Companies from '../components/Companies';
import FAQ from '../components/FAQ';

const Course = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCurriculumOpen, setIsCurriculumOpen] = useState(false);
  const [openHeadings, setOpenHeadings] = useState({});
  const [isProjectsOpen, setIsProjectsOpen] = useState(false);
  const [activeCertificate, setActiveCertificate] = useState('Course Completion');
  const navigate = useNavigate();
  const pricingRef = useRef(null);

  useEffect(() => {
    const fetchCourse = async () => {
      if (!id) {
        setError('No course ID provided in the URL');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const courseData = await getCourseByIdWithoutAuth(id);
        if (!courseData) {
          throw new Error('No course data returned');
        }
        setCourse(courseData);
      } catch (err) {
        setError(err.message || 'Failed to fetch course details');
        console.error('Error details:', err.response ? err.response.data : err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  const handleScrollToPricing = () => {
    pricingRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleEnroll = (level) => {
    if (course) {
      const message = encodeURIComponent(
        `I'm interested in joining the ${course.domain.toUpperCase()} domain course: ${course.name} at the ${level} level`
      );
      window.open(`https://wa.me/+917483905485?text=${message}`, '_blank');
    }
  };

  const toggleCurriculum = () => {
    setIsCurriculumOpen((prev) => !prev);
  };

  const toggleHeading = (index) => {
    setOpenHeadings((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const toggleProjects = () => {
    setIsProjectsOpen((prev) => !prev);
  };

  const certificates = [
    {
      name: 'Course Completion',
      image: 'https://mystaticimages13.s3.eu-north-1.amazonaws.com/images/course+completion+text.png',
    },
    {
      name: 'Internship',
      image: 'https://mystaticimages13.s3.eu-north-1.amazonaws.com/images/intership+cert++text.png',
    },
    {
      name: 'Certificate of Participation',
      image: 'https://mystaticimages13.s3.eu-north-1.amazonaws.com/images/particaption++text.png',
    },
  ];

  const handleCertificateClick = (name) => {
    setActiveCertificate(name);
  };

  if (loading) {
    return <div className={styles.loading}>Loading course details...</div>;
  }

  if (error || !course) {
    return (
      <div className={styles.errorContainer}>
        <p className={styles.error}>{error || 'Course not found'}</p>
        <button className={styles.backButton} onClick={() => navigate('/')}>
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <>
      <div className={styles.courseContainer}>
        <div className={styles.courseSection}>
          <div className={styles.courseHeader}>
            <h1 className={styles.courseTitle}>{course.name}</h1>
            {/* <p className={styles.courseInstructor}>By {course.instructor}</p> */}
          </div>

          <div className={styles.courseMain}>
            <div className={styles.courseImage}>
              <img src={course.thumbnail} alt={course.name} className={styles.thumbnail} />
            </div>
            <div className={styles.courseDetails}>
              <h2 className={styles.detailTitle}>{course.name}</h2>
              <p className={styles.detailInstructor}>By {course.instructor}</p>
              <p className={styles.description}>{course.description}</p>
              <div className={styles.domainTag}>
                <span>Domain: {course.domain.toUpperCase()}</span>
              </div>
              <div className={styles.tags}>
                <h3>Tags</h3>
                <div className={styles.tagList}>
                  {course.tags && course.tags.length > 0 ? (
                    course.tags.map((tag, index) => (
                      <span key={index} className={styles.tag}>{tag}</span>
                    ))
                  ) : (
                    <p>No tags available</p>
                  )}
                </div>
              </div>
              <button className={styles.enrollButton} onClick={handleScrollToPricing}>
                Enroll Now
              </button>
            </div>
          </div>

          <div className={styles.curriculum}>
            <h3
              className={`${styles.sectionHeader} ${isCurriculumOpen ? styles.activeHeader : ''}`}
              onClick={toggleCurriculum}
            >
              Curriculum
              <span
                className={`${styles.arrow} ${isCurriculumOpen ? styles.arrowUp : styles.arrowDown}`}
              >
                {isCurriculumOpen ? '↑' : '↓'}
              </span>
            </h3>
            <div className={`${styles.curriculumContent} ${isCurriculumOpen ? styles.open : ''}`}>
              {course.curriculum && course.curriculum.length > 0 ? (
                <div className={styles.curriculumList}>
                  {course.curriculum.map((item, index) => (
                    <div key={index} className={styles.curriculumItem}>
                      <h4
                        className={`${styles.curriculumHeading} ${
                          openHeadings[index] ? styles.activeHeader : ''
                        }`}
                        onClick={() => toggleHeading(index)}
                      >
                        {item.heading}
                        <span
                          className={`${styles.arrow} ${
                            openHeadings[index] ? styles.arrowUp : styles.arrowDown
                          }`}
                        >
                          {openHeadings[index] ? '↑' : '↓'}
                        </span>
                      </h4>
                      <div
                        className={`${styles.subTopicContent} ${
                          openHeadings[index] ? styles.open : ''
                        }`}
                      >
                        {item.subTopics && item.subTopics.length > 0 ? (
                          <ul className={styles.subTopicList}>
                            {item.subTopics.map((subTopic, subIndex) => (
                              <li key={subIndex} className={styles.subTopicItem}>
                                {subTopic}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className={styles.noSubTopics}>No sub-topics available</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className={styles.noCurriculum}>No curriculum available</p>
              )}
            </div>
          </div>
        </div>

        <div className={styles.projectsSection}>
          <div className={styles.projectsCard}>
            <h3
              className={`${styles.sectionHeader} ${isProjectsOpen ? styles.activeHeader : ''}`}
              onClick={toggleProjects}
            >
              Projects
              <span
                className={`${styles.arrow} ${isProjectsOpen ? styles.arrowUp : styles.arrowDown}`}
              >
                {isProjectsOpen ? '↑' : '↓'}
              </span>
            </h3>
            <div className={`${styles.projectContent} ${isProjectsOpen ? styles.open : ''}`}>
              {course.projects && course.projects.length > 0 ? (
                <div className={styles.projectList}>
                  {course.projects.map((project, index) => (
                    <div key={index} className={styles.projectCard}>
                      {project.imageUrl ? (
                        <img
                          src={project.imageUrl}
                          alt={project.name}
                          className={styles.projectImage}
                        />
                      ) : (
                        <div className={styles.projectPlaceholder}>
                          No Image Available
                        </div>
                      )}
                      <div className={styles.projectDetails}>
                        <h4 className={styles.projectName}>{project.name}</h4>
                        <p className={styles.projectDescription}>{project.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className={styles.noProjects}>No projects available</p>
              )}
            </div>
          </div>
        </div>

        <div className={styles.certificateSection}>
          <h2 className={styles.certificateTitle}>Sample Certificates</h2>
          <div className={styles.certificateContainer}>
            <div className={styles.certificateList}>
              {certificates.map((certificate) => (
                <button
                  key={certificate.name}
                  className={`${styles.certificateButton} ${
                    activeCertificate === certificate.name ? styles.activeCertificate : ''
                  }`}
                  onClick={() => handleCertificateClick(certificate.name)}
                >
                  {certificate.name}
                </button>
              ))}
            </div>
            <div className={styles.certificateImageContainer}>
              <img
                src={certificates.find((cert) => cert.name === activeCertificate).image}
                alt={activeCertificate}
                className={styles.certificateImage}
              />
            </div>
          </div>
        </div>
      </div>

        <div className={styles.pricingSection} ref={pricingRef}>
          <h2 className={styles.pricingTitle}>Choose Your Plan</h2>
          <div className={styles.pricingGrid}>
            <div className={styles.pricingCard}>
              <h3 className={styles.pricingLevel}>General</h3>
              <p className={styles.pricingDescription}>Perfect for getting started with the basics.</p>
              <ul className={styles.pricingBenefits}>
                <li>Access to core course content</li>
                <li>Community support</li>
                <li>Certificate of completion</li>
              </ul>
              <button
                className={styles.pricingEnrollButton}
                onClick={() => handleEnroll('General')}
              >
                Enroll Now
              </button>
            </div>

            <div className={styles.pricingCard}>
              <h3 className={styles.pricingLevel}>Plus</h3>
              <p className={styles.pricingDescription}>Enhanced features for a deeper learning experience.</p>
              <ul className={styles.pricingBenefits}>
                <li>All General plan benefits</li>
                <li>Access to advanced modules</li>
                <li>Priority email support</li>
                <li>One-on-one mentoring sessions</li>
              </ul>
              <button
                className={styles.pricingEnrollButton}
                onClick={() => handleEnroll('Plus')}
              >
                Enroll Now
              </button>
            </div>

            <div className={styles.pricingCard}>
              <h3 className={styles.pricingLevel}>Pro</h3>
              <p className={styles.pricingDescription}>Comprehensive package for professional growth.</p>
              <ul className={styles.pricingBenefits}>
                <li>All Plus plan benefits</li>
                <li>Exclusive workshops</li>
                <li>Personalized career guidance</li>
                <li>Lifetime access to course updates</li>
              </ul>
              <button
                className={styles.pricingEnrollButton}
                onClick={() => handleEnroll('Pro')}
              >
                Enroll Now
              </button>
            </div>
          </div>
        </div>

      <WhyUs />
      <SucessfulTransitions />
      <Testimonials />
      <Companies />
      <FAQ />
    </>
  );
};

export default Course;
