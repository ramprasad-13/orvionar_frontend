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

import styles from '../styles/Testimonials.module.css';

const Testimonials = () => {

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
        testimonials: { dots: false, infinite: true, speed: 5000, slidesToShow: 4, slidesToScroll: 1, autoplay: true, autoplaySpeed: 0, cssEase: 'linear', arrows: false, responsive: [
          { breakpoint: 1024, settings: { slidesToShow: 2 } },
          { breakpoint: 640, settings: { slidesToShow: 1 } },
        ]},
      };


        useEffect(() => {
          AOS.init({ duration: 1000 });
        }, []);

  return (
    <div>
      <section className={styles['testimonials']} data-aos="fade-up">
        <h2 className={styles['main-text-2']}>Student Testimonials</h2>
        <Slider {...sliderSettings.testimonials} className={styles['testimonial-slider']}>
          {testimonials.map((testimonial, index) => (
            <div key={`${testimonial.name}-${index}`} className={styles['testimonial-slide']} data-aos="slide-up">
              <article className={styles['testimonial-card']}>
                <div className={styles['profile-pic']}>
                  <img src={testimonial.image} alt={testimonial.name} loading="lazy" />
                </div>
                <blockquote>"{testimonial.text}"</blockquote>
                <p>- {testimonial.name}</p>
              </article>
            </div>
          ))}
        </Slider>
      </section>

    </div>
  )
}

export default Testimonials;
