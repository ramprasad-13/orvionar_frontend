import React from 'react';
import styles from '../styles/Terms.module.css';

const Terms = () => {
  return (
    <div className={styles.termsPage}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroText}>
          <h1 className={styles.mainHeading}>Terms and <strong className={styles.strong}>Conditions</strong></h1>
          <p className={styles.heroDescription}>
            Welcome to our platform! Please read these Terms and Conditions carefully before using our services.
          </p>
        </div>
      </section>

      {/* Terms Content */}
      <section className={styles.contentSection}>
        <div className={styles.content}>
          <h2 className={styles.subHeading}>1. Acceptance of <strong className={styles.strong}>Terms</strong></h2>
          <p className={styles.text}>
            By accessing or using our website and services, you agree to be bound by these Terms and Conditions. If you do not agree, please do not use our services.
          </p>

          <h2 className={styles.subHeading}>2. Use of <strong className={styles.strong}>Services</strong></h2>
          <p className={styles.text}>
            Our platform provides educational content and services. You agree to use our services only for lawful purposes and in accordance with these terms. You must not use our services to engage in any activity that violates local, state, or international laws.
          </p>

          <h2 className={styles.subHeading}>3. User <strong className={styles.strong}>Accounts</strong></h2>
          <p className={styles.text}>
            To access certain features, you may need to create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account.
          </p>

          <h2 className={styles.subHeading}>4. Payment and <strong className={styles.strong}>Refunds</strong></h2>
          <p className={styles.text}>
            Some services may require payment. All payments are processed securely. Refunds, if applicable, will be processed according to our refund policy, available upon request.
          </p>

          <h2 className={styles.subHeading}>5. Intellectual <strong className={styles.strong}>Property</strong></h2>
          <p className={styles.text}>
            All content on our platform, including courses, videos, and materials, is our property or licensed to us. You may not reproduce, distribute, or create derivative works without our permission.
          </p>

          <h2 className={styles.subHeading}>6. Limitation of <strong className={styles.strong}>Liability</strong></h2>
          <p className={styles.text}>
            We strive to provide accurate and reliable services, but we are not liable for any damages arising from your use of our platform, including interruptions, errors, or inaccuracies in content.
          </p>

          <h2 className={styles.subHeading}>7. Changes to <strong className={styles.strong}>Terms</strong></h2>
          <p className={styles.text}>
            We may update these Terms and Conditions from time to time. We will notify you of significant changes via email or through our platform. Your continued use constitutes acceptance of the updated terms.
          </p>

          <h2 className={styles.subHeading}>8. Contact <strong className={styles.strong}>Us</strong></h2>
          <p className={styles.text}>
            If you have any questions about these Terms and Conditions, please contact us at info@orvionar.com or +91 12345 67890.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Terms;