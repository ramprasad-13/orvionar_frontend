import React from 'react';
import styles from '../styles/Privacy.module.css';

const Privacy = () => {
  return (
    <div className={styles.privacyPage}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroText}>
          <h1 className={styles.mainHeading}>Privacy <strong className={styles.strong}>Policy</strong></h1>
          <p className={styles.heroDescription}>
            Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your information.
          </p>
        </div>
      </section>

      {/* Privacy Content */}
      <section className={styles.contentSection}>
        <div className={styles.content}>
          <h2 className={styles.subHeading}>1. Information We <strong className={styles.strong}>Collect</strong></h2>
          <p className={styles.text}>
            We collect personal information you provide, such as your name, email, and payment details, when you register, enroll in courses, or contact us. We also collect usage data, like browsing activity, to improve our services.
          </p>

          <h2 className={styles.subHeading}>2. How We Use Your <strong className={styles.strong}>Information</strong></h2>
          <p className={styles.text}>
            Your information is used to deliver educational services, process payments, send updates, and personalize your experience. We may also use data for analytics to enhance our platform’s performance.
          </p>

          <h2 className={styles.subHeading}>3. Sharing Your <strong className={styles.strong}>Information</strong></h2>
          <p className={styles.text}>
            We do not sell your personal information. We may share it with trusted third parties, such as payment processors or analytics providers, to operate our services. All partners are bound by strict confidentiality agreements.
          </p>

          <h2 className={styles.subHeading}>4. Data <strong className={styles.strong}>Security</strong></h2>
          <p className={styles.text}>
            We implement industry-standard security measures, including encryption and secure servers, to protect your data. However, no system is completely secure, and we cannot guarantee absolute security.
          </p>

          <h2 className={styles.subHeading}>5. Your <strong className={styles.strong}>Rights</strong></h2>
          <p className={styles.text}>
            You have the right to access, update, or delete your personal information. You may also opt out of marketing communications. Contact us to exercise these rights.
          </p>

          <h2 className={styles.subHeading}>6. Cookies and <strong className={styles.strong}>Tracking</strong></h2>
          <p className={styles.text}>
            We use cookies to enhance your experience, such as remembering your preferences. You can manage cookie settings in your browser, but disabling cookies may affect functionality.
          </p>

          <h2 className={styles.subHeading}>7. Third-Party <strong className={styles.strong}>Links</strong></h2>
          <p className={styles.text}>
            Our platform may contain links to third-party websites. We are not responsible for their privacy practices, and we encourage you to review their policies.
          </p>

          <h2 className={styles.subHeading}>8. Changes to <strong className={styles.strong}>This Policy</strong></h2>
          <p className={styles.text}>
            We may update this Privacy Policy periodically. Changes will be posted on this page, and significant updates will be communicated via email or our platform.
          </p>

          <h2 className={styles.subHeading}>9. Contact <strong className={styles.strong}>Us</strong></h2>
          <p className={styles.text}>
            For questions about this Privacy Policy, reach out to us at info@orvionar.com or +91 12345 67890.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Privacy;