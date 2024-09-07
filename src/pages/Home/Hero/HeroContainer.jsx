import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-creative';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import { EffectCreative, Navigation, Autoplay } from 'swiper';
import Hero from './Hero';
import Hero2 from './Hero2';

const HeroContainer = () => {
  return (
    <section>
      <Swiper
        grabCursor={true}
        loop={true}
        spaceBetween={50}
        slidesPerView={1}
        effect={'creative'}
        creativeEffect={{
          prev: {
            shadow: true,
            translate: ['-110%', 0, -300],
          },
          next: {
            shadow: true,
            translate: ['110%', 0, -300],
          },
        }}
        modules={[EffectCreative, Navigation, Autoplay]}
        navigation={{ clickable: true }} // Enable navigation arrows
        autoplay={{
          delay: 5000, // Change slide every 5 seconds
          disableOnInteraction: false, // Allow autoplay to continue after user interaction
        }}
        className="mySwiper"
      >
        <SwiperSlide>
          <Hero />
        </SwiperSlide>
        <SwiperSlide>
          <Hero2 />
        </SwiperSlide>
      </Swiper>
    </section>
  );
};

export default HeroContainer;
