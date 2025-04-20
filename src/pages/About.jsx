import React from 'react';
import styles from '../styles/About.module.css';
import WhyUs from '../components/WhyUs';

const About = () => {
  return (
    <div className={styles.aboutPage}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroText}>
          <h1 className={styles.mainText1}>
            Welcome to <span className={styles.highlighted}>Orvionar Tech</span>
          </h1>
          <p className={styles.heroDescription}>
            Empowering individuals with cutting-edge skills and knowledge to thrive in today's competitive world.
          </p>
        </div>
      </section>

      {/* Vision and Mission */}
      <section className={styles.visionMission}>
        <div className={styles.vision}>
          <h2 className={styles.sectionTitle}>Our Vision</h2>
          <p>
            To be a global leader in education and training, fostering innovation, excellence, and lifelong learning for all.
          </p>
        </div>
        <div className={styles.mission}>
          <h2 className={styles.sectionTitle}>Our Mission</h2>
          <p>
            To provide accessible, high-quality education that equips learners with practical skills and prepares them for real-world challenges.
          </p>
        </div>
      </section>
      <WhyUs/>

      {/* Key Features */}
      {/* <section className={styles.keyFeatures}>
        <h2 className={styles.sectionTitle}>Why Choose Orvionar Tech?</h2>
        <div className={styles.featureList}>
          <div className={styles.featureCard}>
            <h3>Expert Mentors</h3>
            <p>Learn from industry experts with years of experience in their respective fields.</p>
          </div>
          <div className={styles.featureCard}>
            <h3>Hands-On Training</h3>
            <p>Gain practical experience through real-world projects and case studies.</p>
          </div>
          <div className={styles.featureCard}>
            <h3>Career Support</h3>
            <p>Access career guidance, resume building, and placement assistance.</p>
          </div>
          <div className={styles.featureCard}>
            <h3>Flexible Learning</h3>
            <p>Learn at your own pace with flexible schedules and online resources.</p>
          </div>
        </div>
      </section> */}

      {/* Faculty Section */}
      {/* <section className={styles.faculty}>
        <h2 className={styles.sectionTitle}>Meet Our Faculty</h2>
        <div className={styles.facultyList}>
          <div className={styles.facultyCard}>
            <img src="https://via.placeholder.com/150" alt="Faculty Member" />
            <h3>Mr. Ramprasad</h3>
            <p>Senior Instructor - Software Development</p>
          </div>
          <div className={styles.facultyCard}>
            <img src="https://via.placeholder.com/150" alt="Faculty Member" />
            <h3>Mr. J</h3>
            <p>Lead Trainer - Data Science</p>
          </div>
          <div className={styles.facultyCard}>
            <img src="https://via.placeholder.com/150" alt="Faculty Member" />
            <h3>Ms. Smitha</h3>
            <p>Head of Department - Cybersecurity</p>
          </div>
        </div>
      </section> */}
    </div>
  );
};

export default About;
