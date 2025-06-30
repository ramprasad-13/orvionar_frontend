import React, { useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

import img1 from '../assets/testimonials/1.webp';
import img2 from '../assets/testimonials/2.webp';
import img3 from '../assets/testimonials/3.webp';
import img4 from '../assets/testimonials/4.webp';
import img5 from '../assets/testimonials/5.webp';
import img6 from '../assets/testimonials/6.webp';
import img7 from '../assets/testimonials/7.webp';
import img8 from '../assets/testimonials/8.webp';
import img9 from '../assets/testimonials/9.webp';
import img10 from '../assets/testimonials/10.webp';

const testimonials = [
  { image: img1, text: "This course transformed my career!", name: "Sunil" },
  { image: img2, text: "The mentors were exceptional.", name: "Kavya Maguluri" },
  { image: img3, text: "I landed my dream job thanks to this!", name: "Venkata Ramprasad" },
  { image: img4, text: "Best learning experience ever.", name: "Hari Kiran" },
  { image: img5, text: "Practical skills that employers love.", name: "Jathin Dumpala" },
  { image: img6, text: "I gained confidence and expertise.", name: "Rakesh BommiReddy" },
  { image: img7, text: "Top-notch content and support.", name: "Meghana Pade" },
  { image: img8, text: "Helped me switch industries smoothly.", name: "Sayed" },
  { image: img9, text: "Exceeded all my expectations!", name: "Shivam" },
  { image: img10, text: "A game-changer for my professional life.", name: "Suresh Reddy" },
];

const sliderSettings = {
  dots: false,
  infinite: true,
  speed: 600,
  slidesToShow: 4,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 4000,
  arrows: true,
  cssEase: 'ease-in-out',
  responsive: [
    { breakpoint: 1024, settings: { slidesToShow: 2, arrows: false } },
    { breakpoint: 640, settings: { slidesToShow: 1, arrows: false } },
  ],
};

const Testimonials = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <section className="bg-gradient-to-b from-orange-100 via-white to-white py-10 px-4" data-aos="fade-up">
      <h2 className="text-4xl md:text-5xl font-extrabold text-center text-orange-700 mb-14 tracking-tight" data-aos="zoom-in">
        ❤️ What Our Students Say
      </h2>

      <div className="max-w-7xl mx-auto">
        <Slider {...sliderSettings}>
          {testimonials.map((testimonial, index) => (
            <div
              key={`${testimonial.name}-${index}`}
              className="p-4"
              data-aos="fade-up"
              data-aos-delay={100 + index * 100}
            >
              <div className="group bg-white/60 backdrop-blur-lg rounded-2xl border border-orange-100 shadow-xl p-8 min-h-[340px] flex flex-col items-center justify-center transition-all duration-300 hover:shadow-2xl hover:scale-[1.03] hover:border-orange-400">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  loading='lazy'
                  className="w-24 h-24 rounded-full mb-5 border-4 border-orange-200 shadow-md object-cover"
                />
                <blockquote className="text-gray-800 text-lg font-medium italic mb-4 text-center transition-colors group-hover:text-orange-800">
                  “{testimonial.text}”
                </blockquote>
                <p className="text-orange-600 font-bold text-lg">– {testimonial.name}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Testimonials;
