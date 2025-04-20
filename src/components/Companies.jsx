import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css'; // Required for slider styling
import 'slick-carousel/slick/slick-theme.css'; // Required for slider theme
import styles from '../styles/Companies.module.css'; // Assumes a CSS module exists for styling

import { partnerLogos1, partnerLogos2 } from '../components/CompanyLogos';

const Companies = () => {

    // Slider settings for both sliders
    const sliderSettings = {
        firstSlider: {
            dots: false,
            infinite: true,
            speed: 3000,
            slidesToShow: 8,
            slidesToScroll: 1,
            arrows: false,
            autoplay: true,
            autoplaySpeed: 0,
            cssEase: 'linear',
            rtl: true, // Makes first slider move right-to-left
            responsive: [
                { breakpoint: 1024, settings: { slidesToShow: 5 } },
                { breakpoint: 768, settings: { slidesToShow: 3 } },
                { breakpoint: 480, settings: { slidesToShow: 2 } }
            ]
        },
        secondSlider: {
            dots: false,
            infinite: true,
            speed: 3000,
            slidesToShow: 8,
            slidesToScroll: 1,
            arrows: false,
            autoplay: true,
            autoplaySpeed: 0,
            cssEase: 'linear',
            responsive: [
                { breakpoint: 1024, settings: { slidesToShow: 5 } },
                { breakpoint: 768, settings: { slidesToShow: 3 } },
                { breakpoint: 480, settings: { slidesToShow: 2 } }
            ]
        }
    };

    return (
        <section className={styles['partner-companies']}>
            <h2 className={styles['main-text-2']}>Secure Placements At Top Brands</h2>
            <Slider {...sliderSettings.firstSlider} className={styles['partner-slider']}>
                {partnerLogos1.map((logo, index) => (
                    <div key={index} className={styles['partner-slide']}>
                        <img 
                            src={logo} 
                            alt={`Partner Company ${index + 1}`} 
                            className={styles['company-logo']} 
                            loading="lazy" 
                        />
                    </div>
                ))}
            </Slider>
            <Slider {...sliderSettings.secondSlider} className={styles['partner-slider']}>
                {partnerLogos2.map((logo, index) => (
                    <div key={index} className={styles['partner-slide']}>
                        <img 
                            src={logo} 
                            alt={`Partner Company ${index + 1}`} 
                            className={styles['company-logo']} 
                            loading="lazy" 
                        />
                    </div>
                ))}
            </Slider>
        </section>
    );
};

export default Companies;