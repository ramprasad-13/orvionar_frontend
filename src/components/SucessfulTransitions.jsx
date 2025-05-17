import React, { useState, useRef } from 'react';
import styles from '../styles/SucessfulTransitions.module.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import img8 from '../assets/testimonials/8.webp';
import img2 from '../assets/testimonials/2.webp';
import img9 from '../assets/testimonials/9.webp';
import img4 from '../assets/testimonials/4.webp';

const SucessfulTransitions = () => {
  const [transitions] = useState([
    { image: img8, quote: "The course gave me the tools to ace my promotion interview.", name: "Sayed", role: "Software Developer" },
    { image: img2, quote: "Thanks to the mentorship, I transitioned to a higher role.", name: "Kavya Maguluri", role: "Associate Software Engineer" },
    { image: img9, quote: "The knowledge helped me earn an appraisal!", name: "Shivam", role: "Software Engineer" },
    { image: img4, quote: "The practical approach helped me switch careers!", name: "Hari Kiran", role: "Data Analyst" },
  ]);

  const sliderRef = useRef(null); // Ref to control slider

  const sliderSettings = {
    transitions: {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      arrows: false, // Disable default arrows
      autoplay: true,
      autoplaySpeed: 3000,
      responsive: [
        { breakpoint: 1024, settings: { slidesToShow: 2 } },
        { breakpoint: 640, settings: { slidesToShow: 1 } },
      ],
    },
    partners: {
      dots: false,
      infinite: true,
      speed: 3000,
      slidesToShow: 4,
      slidesToScroll: 1,
      arrows: false,
      autoplay: true,
      autoplaySpeed: 0,
      cssEase: 'linear',
      responsive: [
        { breakpoint: 1024, settings: { slidesToShow: 3 } },
        { breakpoint: 768, settings: { slidesToShow: 2 } },
        { breakpoint: 480, settings: { slidesToShow: 1 } },
      ],
    },
  };

  // Functions to control slider navigation
  const goToPrev = () => {
    sliderRef.current.slickPrev();
  };

  const goToNext = () => {
    sliderRef.current.slickNext();
  };

  return (
    <section className={styles['successful-transitions']} data-aos="fade-up">
      <h2 className={styles['main-text-2']}>
        Alumni Successful <strong>Hub</strong>
      </h2>
      <div className={styles['slider-container']}>
        <button
          className={`${styles['custom-arrow']} ${styles['custom-prev']}`}
          onClick={goToPrev}
          aria-label="Previous slide"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="#000000"
            width="20px"
            height="20px"
          >
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
          </svg>
        </button>
        <Slider
          {...sliderSettings.transitions}
          className={styles['transition-slider']}
          ref={sliderRef}
        >
          {transitions.map((transition, index) => (
            <div
              key={`${transition.name}-${index}`}
              className={styles['transition-slide']}
              data-aos="zoom-in"
            >
              <article className={styles['transition-card']}>
                <img
                  src={transition.image}
                  alt={transition.name}
                  className={styles['card-img']}
                />
                <blockquote>
                  <span className={styles['quote-marks']}>“</span>
                  {transition.quote}
                  <span className={styles['quote-marks']}>”</span>
                </blockquote>
                <div className={styles['card-info']}>
                  <h3 className={styles['name']}>{transition.name}</h3>
                  <p className={styles['role']}>{transition.role}</p>
                </div>
              </article>
            </div>
          ))}
        </Slider>
        <button
          className={`${styles['custom-arrow']} ${styles['custom-next']}`}
          onClick={goToNext}
          aria-label="Next slide"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="#000000"
            width="20px"
            height="20px"
          >
            <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z" />
          </svg>
        </button>
      </div>
    </section>
  );
};

export default SucessfulTransitions;
