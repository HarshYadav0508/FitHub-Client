import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/effect-creative';
import {EffectCreative} from 'swiper';
import Hero from './Hero';
import Hero2 from './Hero2';
import 'swiper/css';

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
        modules={[EffectCreative]}
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
  )
}

export default HeroContainer;
