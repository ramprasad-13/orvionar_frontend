import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import img1 from '../assets/whyus/1.webp';
import img2 from '../assets/whyus/2.webp';
import img3 from '../assets/whyus/3.webp';
import img4 from '../assets/whyus/4.webp';
import img5 from '../assets/whyus/5.webp';
import img6 from '../assets/whyus/6.webp';
import img7 from '../assets/whyus/7.webp';
import img8 from '../assets/whyus/8.webp';

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
    heading: 'Learning Activities',
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
    heading: 'AI-Enhanced LMS',
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
    <section className="bg-orange-50 py-16 px-4" data-aos="fade-up">
      <h2 className="text-4xl font-bold text-orange-500 text-center mb-10">Why Choose Us?</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {cardData.map((card, index) => (
          <div
            key={index}
            className="group perspective h-[300px]"
            data-aos="fade-up"
            data-aos-delay={100 + index * 100}
          >
            <div className="relative w-full h-full duration-700 transform-style-3d group-hover:rotate-y-180">
              {/* Front Side */}
              <div className="absolute w-full h-full backface-hidden flex flex-col justify-center items-center rounded-xl shadow-md bg-gradient-to-br from-white to-orange-100 p-4">
                <img
                  src={card.image}
                  alt={card.heading}
                  loading="lazy"
                  className="w-[220px] h-[140px] object-cover rounded-lg mb-4"
                />
                <h3 className="text-center text-base font-bold text-gray-800">{card.heading}</h3>
              </div>

              {/* Back Side */}
              <div className="absolute w-full h-full rotate-y-180 backface-hidden flex items-center justify-center bg-orange-500 text-white rounded-xl p-4">
                <p className="text-center text-sm">{card.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyUs;
