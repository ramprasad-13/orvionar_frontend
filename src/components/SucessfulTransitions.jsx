import React, { useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import img8 from '../assets/testimonials/8.webp';
import img2 from '../assets/testimonials/2.webp';
import img9 from '../assets/testimonials/9.webp';
import img4 from '../assets/testimonials/4.webp';

const SucessfulTransitions = () => {
  const transitions = [
    { image: img8, quote: "The course gave me the tools to ace my promotion interview.", name: "Sayed", role: "Software Developer" },
    { image: img2, quote: "Thanks to the mentorship, I transitioned to a higher role.", name: "Kavya Maguluri", role: "Associate Software Engineer" },
    { image: img9, quote: "The knowledge helped me earn an appraisal!", name: "Shivam", role: "Software Engineer" },
    { image: img4, quote: "The practical approach helped me switch careers!", name: "Hari Kiran", role: "Data Analyst" },
  ];

  const sliderRef = useRef(null);

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <section className="bg-orange-50 py-16 px-4" data-aos="fade-up">
      <h2 className="text-3xl md:text-4xl font-bold text-orange-500 text-center mb-10">
        Alumni Successful <strong className="text-black">Hub</strong>
      </h2>

      <div className="relative max-w-7xl mx-auto">
        <button
          className="absolute top-1/2 -translate-y-1/2 left-0 z-10 w-10 h-10 bg-orange-500 hover:bg-orange-600 rounded-full flex items-center justify-center"
          onClick={() => sliderRef.current.slickPrev()}
          aria-label="Previous slide"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" width="20" height="20">
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
          </svg>
        </button>

        <Slider ref={sliderRef} {...sliderSettings}>
          {transitions.map((t, index) => (
            <div key={index} className="px-4" data-aos="zoom-in">
              <article className="bg-white rounded-xl shadow-lg text-center p-6 min-h-[320px] flex flex-col justify-between">
                <img src={t.image} alt={t.name} loading='lazy' className="w-20 h-20 rounded-full mx-auto mb-4" />
                <blockquote className="italic text-gray-600 mb-4">
                  <span className="text-orange-500 font-bold text-xl">“</span>{t.quote}<span className="text-orange-500 font-bold text-xl">”</span>
                </blockquote>
                <div className="bg-orange-500 text-white rounded-md py-2 px-3">
                  <h3 className="font-semibold text-lg">{t.name}</h3>
                  <p className="text-sm">{t.role}</p>
                </div>
              </article>
            </div>
          ))}
        </Slider>

        <button
          className="absolute top-1/2 -translate-y-1/2 right-0 z-10 w-10 h-10 bg-orange-500 hover:bg-orange-600 rounded-full flex items-center justify-center"
          onClick={() => sliderRef.current.slickNext()}
          aria-label="Next slide"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" width="20" height="20">
            <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z" />
          </svg>
        </button>
      </div>
    </section>
  );
};

export default SucessfulTransitions;
