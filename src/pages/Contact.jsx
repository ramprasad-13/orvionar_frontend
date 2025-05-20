import React from 'react';
import styles from '../styles/Contact.module.css';
import useTitle from '../components/useTitle';

const Contact = () => {
  useTitle("Contact")
  return (
    <div className={styles.contactPage}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroText}>
          <h1 className={styles.mainText1}>Get in Touch</h1>
          <p className={styles.heroDescription}>
            We’d love to hear from you! Whether you have questions, feedback, or just want to say hello, feel free to reach out.
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className={styles.contactInfoSection}>
        <div className={styles.contactInfo}>
          <p>
            <strong>Address:</strong> Orvionar Tech, BTM Layout, near Lake View Condiments, Bengaluru - 560068 | 
            <strong>Email:</strong> info@orvionar.in | 
            <strong>Phone:</strong> +91 7483905485
          </p>
        </div>
      </section>

      {/* Form and Map Section */}
      <section className={styles.formMapSection}>
        {/* Contact Form */}
        <div className={styles.contactFormContainer}>
          <h2 className={styles.sectionTitle}>Contact Us</h2>
          <form className={styles.contactForm} action="#" method="POST">
            <div className={styles.formGroup}>
              <label htmlFor="name">Full Name</label>
              <input type="text" id="name" name="name" placeholder="Enter your name" required />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="email">Email Address</label>
              <input type="email" id="email" name="email" placeholder="Enter your email" required />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="subject">Subject</label>
              <input type="text" id="subject" name="subject" placeholder="Enter the subject" required />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" rows="5" placeholder="Write your message here" required></textarea>
            </div>
            <button type="submit" className={styles.submitBtn}>Send Message</button>
          </form>
        </div>

        {/* Map */}
        <div className={styles.mapContainer}>
          <h2 className={styles.sectionTitle}>Our Location</h2>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.927724051174!2d77.6392893743576!3d13.017823312736232!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae16c7a44b5c8f%3A0x4c671f4f5a8f4b8e!2sOrvionar%20Tech!5e0!3m2!1sen!2sin!4v1695305701234!5m2!1sen!2sin"
            className={styles.mapIframe}
            allowFullScreen=""
            loading="lazy"
            title="Orvionar Tech Location"
          ></iframe>
        </div>
      </section>
    </div>
  );
};

export default Contact;
