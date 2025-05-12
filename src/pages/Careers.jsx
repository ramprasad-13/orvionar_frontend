import React from 'react';
import styles from '../styles/Careers.module.css';
import useTitle from '../components/useTitle';

const Careers = () => {
  useTitle("Careers")
  const jobs = [
    {
      id: 1,
      title: 'Online Instructor - Web Development',
      description:
        'Join our team to teach web development courses, including HTML, CSS, and JavaScript. Create engaging content and mentor students to build real-world projects.',
      applyLink: '#',
    },
    {
      id: 2,
      title: 'Content Developer - Data Science',
      description:
        'Develop high-quality data science course materials, including tutorials, quizzes, and assignments. Collaborate with instructors to ensure content accuracy.',
      applyLink: '#',
    },
    {
      id: 3,
      title: 'Student Success Manager',
      description:
        'Support students throughout their learning journey, providing guidance, answering queries, and ensuring a positive educational experience.',
      applyLink: '#',
    },
  ];

  return (
    <div className={styles.careersPage}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroText}>
          <h1 className={styles.mainHeading}>Join Our Team</h1>
          <p className={styles.heroDescription}>
            Be part of our mission to transform education. Explore exciting career opportunities and make a difference with us!
          </p>
        </div>
      </section>

      {/* Job Listings */}
      <section className={styles.jobsSection}>
        <h2 className={styles.sectionTitle}>Open Positions</h2>
        <div className={styles.jobList}>
          {jobs.map((job) => (
            <div key={job.id} className={styles.jobCard}>
              <h3 className={styles.jobTitle}>{job.title}</h3>
              <p className={styles.jobDescription}>{job.description}</p>
              <a href={job.applyLink} className={styles.applyBtn}>
                Apply Now
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Job Pool Form */}
      <section className={styles.formSection}>
        <h2 className={styles.sectionTitle}>Join Our Talent Pool</h2>
        <p className={styles.formDescription}>
          Not seeing the right role? Submit your details to stay connected for future opportunities.
        </p>
        <form className={styles.jobPoolForm} action="#" method="POST">
          <div className={styles.formGroup}>
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="resume">Upload Resume</label>
            <input
              type="file"
              id="resume"
              name="resume"
              accept=".pdf,.doc,.docx"
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              rows="5"
              placeholder="Tell us about yourself"
            ></textarea>
          </div>
          <button type="submit" className={styles.submitBtn}>
            Submit Application
          </button>
        </form>
      </section>
    </div>
  );
};

export default Careers;
