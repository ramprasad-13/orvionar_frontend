import React,{useEffect} from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import styles from '../styles/WhyUs.module.css';
import img1 from '../assets/whyus/1.webp';
import img2 from '../assets/whyus/2.webp';
import img3 from '../assets/whyus/3.webp';
import img4 from '../assets/whyus/4.webp';
import img5 from '../assets/whyus/5.webp';
import img6 from '../assets/whyus/6.webp';
import img7 from '../assets/whyus/7.webp';
import img8 from '../assets/whyus/8.webp';

// Define card data with headings, descriptions, and images
const cardData = [
  {
    heading: 'Live Interactive Session',
    description: 'Learn concepts, practice questions & get your doubts cleared instantly in the LIVE classes.',
    image: img1,
  },
  {
    heading: 'Career-Defining Projects',
    description: 'Gain practical skills through real job scenarios.',
    image: img2,
  },
  {
    heading: 'Learning Activites',
    description: 'Practice chapter-wise Quizzes & solve Assignments to learn and revise concepts.',
    image: img3,
  },
  {
    heading: 'Doubt Buster Session',
    description: 'Get access to 24/7 Live Discussion group with batchmates & Faculties.',
    image: img4,
  },
  {
    heading: 'Community Access',
    description: 'Join a network of learners and professionals.',
    image: img5,
  },
  {
    heading: 'AI-Enchanced LMS',
    description: 'Personalized learning experience with AI-driven insights.',
    image: img6,
  },
  {
    heading: 'Industry-Recognized Certification',
    description: 'Earn a certificate that showcases your skills and knowledge.',
    image: img7,
  },
  {
    heading: 'Dedicated Career Support',
    description: 'Get personalized career guidance and job placement assistance.',
    image: img8,
  }
];

const WhyUs = () => {
    useEffect(() => {
      AOS.init({ duration: 1000 });
    }, []);

  return (
    <section className={styles['why-choose-us']} data-aos="fade-up">
      <h2 className={styles['main-text-2']}>Why Choose Us?</h2>
      <div className={styles['why-list']}>
        {cardData.map((card, index) => (
          <div
            key={index}
            className={styles['why-item']}
            data-aos="fade-up"
            data-aos-delay={100 + index * 100}
          >
            <div className={styles['card-inner']}>
              {/* Front Side */}
              <div className={styles['card-front']}>
                <img
                  src={card.image}
                  alt={card.heading}
                  className={styles['card-image']}
                  loading="lazy"
                />
                <h3>{card.heading}</h3>
              </div>
              {/* Back Side */}
              <div className={styles['card-back']}>
                <p>{card.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyUs;