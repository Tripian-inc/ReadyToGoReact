/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/no-extraneous-dependencies */
import React, { ReactElement } from 'react';
import Swiper from 'react-id-swiper';
import 'swiper/css/swiper.css';
import classes from './ItineraryCardSlider.scss';
import { PreviousArrow, NextArrow } from '../base/Svg/Icons';

interface IItineraryCardSlider {
  slidesPerView?: number;
  activeSlideKey?: number;
  centeredSlides?: boolean;
  children: React.ReactNode;
}

const ItineraryCardSlider: React.FC<IItineraryCardSlider> = ({ slidesPerView = 4, activeSlideKey, centeredSlides = false, children }) => {
  const params = {
    slidesPerView,
    activeSlideKey: activeSlideKey?.toString(),
    spaceBetween: 10,
    centeredSlides,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      320: {
        slidesPerView: 2,
      },
      640: {
        slidesPerView: 3,
      },
      1024: {
        slidesPerView: 4,
      },
      2048: {
        slidesPerView: 6,
      },
    },
    renderPrevButton: () => (
      <div className="swiper-button-prev">
        <PreviousArrow size="2rem" />
      </div>
    ),
    renderNextButton: () => (
      <div className="swiper-button-next">
        <NextArrow size="2rem" />
      </div>
    ),
  };

  return (
    <div className={classes.cardSlider}>
      <Swiper {...params} containerClass={classes.swiperContainer} speed={600} shouldSwiperUpdate touchStartForcePreventDefault={false}>
        {children as ReactElement<unknown>}
      </Swiper>
    </div>
  );
};

export default ItineraryCardSlider;
