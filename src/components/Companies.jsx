import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { partnerLogos1, partnerLogos2 } from '../components/CompanyLogos';

const Companies = () => {
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
      rtl: true,
      responsive: [
        { breakpoint: 1024, settings: { slidesToShow: 5 } },
        { breakpoint: 768, settings: { slidesToShow: 3 } },
        { breakpoint: 480, settings: { slidesToShow: 2 } },
      ],
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
        { breakpoint: 480, settings: { slidesToShow: 2 } },
      ],
    },
  };

  return (
    <section className="bg-orange-50 py-16">
      <h2 className="text-3xl md:text-4xl font-bold text-orange-500 text-center mb-10">
        Secure Placements At Top Brands
      </h2>

      <div className="bg-orange-50 py-6">
        <Slider {...sliderSettings.firstSlider}>
          {partnerLogos1.map((logo, index) => (
            <div key={index} className="px-4 flex justify-center items-center">
              <img
                src={logo}
                alt={`Partner Company ${index + 1}`}
                loading="lazy"
                className="w-[150px] h-[90px] md:h-[90px] sm:h-[90px] object-fill bg-white p-4 rounded-lg"
              />
            </div>
          ))}
        </Slider>
      </div>

      <div className="bg-orange-50 py-6 mt-4">
        <Slider {...sliderSettings.secondSlider}>
          {partnerLogos2.map((logo, index) => (
            <div key={index} className="px-4 flex justify-center items-center">
              <img
                src={logo}
                alt={`Partner Company ${index + 1}`}
                loading="lazy"
                className="w-[150px] h-[90px] md:h-[90px] sm:h-[90px] object-fill bg-white p-4 rounded-lg"
              />
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Companies;
