import React from 'react';
import styles from '../styles/FAQ.module.css';

const FAQ = () => {
  return (
    <>
    <section className={styles['faq-section']} data-aos="fade-up">
        <h2 className={styles['main-text-2']}>Frequently Asked Questions</h2>
        <div className={styles['faq-list']}>
          <details data-aos="fade-up" data-aos-delay="0">
            <summary>Why should I choose Orvionar?</summary>
            <p>We combine expert-led content, lifetime access, doubt-clearing sessions,
              and practical learning activities to give you real-world skills, not just
              theory. Plus, our student-first approach ensures you get the support, flexibility,
              and value you deserve - all in one place.
            </p>
          </details>
          <details data-aos="fade-up" data-aos-delay="100">
            <summary>Will I have lifetime access to the course content on the LMS?</summary>
            <p>Yes! Once you enroll, you'll have lifetime access to all the course materials on our LMS.
               You can revisit the content anytime, anywhere at your own pace - no deadlines, no pressure.
            </p>
          </details>
          <details data-aos="fade-up" data-aos-delay="300">
            <summary>Is there any Placement support?</summary>
            <p>Yes, We offer career support including resume reviews, interview
              prep, and job assistance through our hiring partners.</p>
          </details>
          <details data-aos="fade-up" data-aos-delay="400">
            <summary>Will I receive a certificate?</summary>
            <p>Yes!, Upon completing the course, you'll earn a professionally recognized certificate to showcase
              your skills and boost your career profile.</p>
          </details>
          <details data-aos="fade-up" data-aos-delay="500">
            <summary>Are the courses beginner-friendly?</summary>
            <p>Absolutely! Our courses are crafted with begineers in mind - featuring 
              easy-to-follow lessons, step-by-step guidance, and plenty of support along the way
            </p>
          </details>
          <details data-aos="fade-up" data-aos-delay="600">
            <summary>How do I enroll in the program?</summary>
            <p>Enrolling is easy! Just head to the course page, click "Enroll Now",
              and complete the checkout process. We offer multiple payment options,
              plus scholarships and discounts may be available - check the course details
              or reach out to our team for eligibility.
            </p>
          </details>
        </div>
      </section>
    </>
  )
}

export default FAQ
