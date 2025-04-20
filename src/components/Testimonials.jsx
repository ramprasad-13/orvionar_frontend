import React, { useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import studentImageBoy from '../assets/boy.avif';
import studentImageGirl from '../assets/girl.avif';
import styles from '../styles/Testimonials.module.css';

const Testimonials = () => {

      const testimonials = [
        { image: studentImageBoy, text: "This course transformed my career!", name: "John Doe" },
        { image: studentImageGirl, text: "The mentors were exceptional.", name: "Jane Smith" },
        { image: studentImageBoy, text: "I landed my dream job thanks to this!", name: "Mike Johnson" },
        { image: studentImageGirl, text: "Best learning experience ever.", name: "Emily Davis" },
        { image: studentImageBoy, text: "Practical skills that employers love.", name: "Chris Brown" },
        { image: studentImageGirl, text: "I gained confidence and expertise.", name: "Sarah Wilson" },
        { image: studentImageBoy, text: "Top-notch content and support.", name: "David Lee" },
        { image: studentImageGirl, text: "Helped me switch industries smoothly.", name: "Laura Martinez" },
        { image: studentImageBoy, text: "Exceeded all my expectations!", name: "Tom Taylor" },
        { image: studentImageGirl, text: "A game-changer for my professional life.", name: "Anna Clark" },
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
