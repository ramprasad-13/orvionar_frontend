import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Helmet } from 'react-helmet-async';
import rocketGif from '../assets/gif/rocket.gif';
import youngManImage from '../assets/young-man.webp'; // Import image directly
import styles from '../styles/Home.module.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

import { lazy, Suspense } from 'react';

const Companies = lazy(() => import('../components/Companies'));
const Testimonials = lazy(() => import('../components/Testimonials'));
const FAQ = lazy(() => import('../components/FAQ'));
const WhyUs = lazy(() => import('../components/WhyUs'));
const Contact = lazy(() => import('../pages/Contact'));
const SucessfulTransitions = lazy(() => import('../components/SucessfulTransitions'));


const Home = () => {
  const navigate = useNavigate();

  const openDomains = (e)=>{
      e.preventDefault()
      navigate('/domains')
  }
  
  useEffect(() => {
    AOS.init({ duration: 300 });
    return () => AOS.refresh();
  }, []);

  return (
    <>
      <Helmet>
        <title>Orvionar Tech - Advance Your Skills to the Elite 1%</title>
        <meta
          name="description"
          content="Orvionar Tech offers expert-guided programs to help you advance your skills and succeed in today's dynamic job market."
        />
        <meta
          name="keywords"
          content="online courses, skill development, career growth, expert training, Orvionar Tech"
        />
        <meta property="og:title" content="Orvionar Tech - Advance Your Skills to the Elite 1%" />
        <meta
          property="og:description"
          content="Orvionar Tech offers expert-guided programs to help you advance your skills and succeed in today's dynamic job market."
        />
        <meta property="og:url" content="https://www.orvionartech.com" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          rel="preload"
          as="image"
          href={youngManImage} // Use imported image to ensure consistency
          fetchpriority="high"
          type="image/webp"
        />
      </Helmet>

      <section className={styles['hero-section']}>
        <img
          width='500px'
          height='500px',
          loading='eager'
          src={youngManImage}
          alt="Background"
          className={styles['hero-bg']}
          fetchpriority="high"
        />
        <div className={styles['hero-text']}>
          <h1 className={styles['main-text-1']}>
            Unlock Your Potential with AI-Enhanced Learning
          </h1>
          <p className={styles['hero-description']}>
            "In an era where technology evolves at lightning speed, AI-enhanced learning empowers
            individuals to master complex skills with precision and adaptability, bridging the gap
            between human potential and machine intelligence for a future-ready workforce."
          </p>
          <button className={styles['explore-btn']} onClick={openDomains}>Discover Programs</button>
        </div>
        <div className={styles['ball-1']} />
        <div className={styles['ball-2']} />
      </section>


      <Suspense fallback={<div>Loading...</div>}>
        <SucessfulTransitions />
      <Companies />

      <section className={styles.testimonials} data-aos="fade-up">
        <Testimonials />
        <div className={styles['motivational-quote']} data-aos="zoom-in">
          <div className={styles.quote}>
            <p>"You don’t have to be great to start, but you have to start to be great."</p>
            <small>– Zig Ziglar</small>
          </div>
          <div className={styles['rocket-gif']}>
            <img src={rocketGif} alt="Rocket gif" loading="lazy" />
          </div>
        </div>
      </section>

      <WhyUs />
      <FAQ />
      <Contact />

      </Suspense>

    </>
  );
};

export default Home;
