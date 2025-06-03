import React from 'react';
import styles from '../styles/Footer.module.css';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa'; // Using react-icons for social icons

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Quick Links Section */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Quick Links</h3>
          <ul className={styles.linkList}>
            <li><a href="/" className={styles.link}>Home</a></li>
            <li><a href="/domains" className={styles.link}>Courses</a></li>
            <li><a href="/contact" className={styles.link}>Contact</a></li>
            <li><a href="/careers" className={styles.link}>Careers</a></li>
            <li><a href="/about-us" className={styles.link}>About Us</a></li>
          </ul>
        </div>

        {/* Contact Us Section */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Contact Us</h3>
          <p className={styles.contactInfo}>Email: support@orvionar.in</p>
          <p className={styles.contactInfo}>Phone: +91 7483905485</p>
          <p className={styles.contactInfo}>Address: Orvionar Tech, BTM Layout, near Lake View Condiments, Bengaluru - 560068</p>
        </div>

        {/* Social Media Section */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Follow Us</h3>
          <div className={styles.socialIcons}>
            <a href="https://facebook.com/orvionar" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
              <FaFacebook size={24} />
            </a>
            <a href="https://twitter.com/orvionar" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
              <FaTwitter size={24} />
            </a>
            <a href="https://instagram.com/orvionar" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
              <FaInstagram size={24} />
            </a>
            <a href="https://www.linkedin.com/company/orvionar-tech-private-limited/" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
              <FaLinkedin size={24} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar with Copyright and Terms */}
      <div className={styles.bottomBar}>
        <p className={styles.copyright}>
          &copy; {new Date().getFullYear()} Orvionar. All rights reserved.
        </p>
        <div className={styles.legalLinks}>
          <a href="/terms" className={styles.legalLink}>Terms & Conditions</a>
          <a href="/privacy" className={styles.legalLink}>Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
