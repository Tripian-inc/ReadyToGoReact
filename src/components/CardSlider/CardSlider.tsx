/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/no-extraneous-dependencies */
import React, { ReactElement } from 'react';
import Swiper from 'react-id-swiper';
import 'swiper/css/swiper.css';
import classes from './CardSlider.scss';
import { PreviousArrow, NextArrow } from '../base/Svg/Icons';

interface ICardSlider {
  children: React.ReactNode;
}

const CardSlider: React.FC<ICardSlider> = ({ children }) => {
  // const [swiper, updateSwiper] = useState<SwiperInstance>();
  /* const [beginning, setBeginning] = useState<boolean>(true);
  const [end, setEnd] = useState<boolean>(true); */

  // const getSwiper = (swiperInstance?: SwiperInstance) => {
  //   if (swiperInstance) {
  //     updateSwiper(swiperInstance);
  //     /* setBeginning(swiperInstance.isBeginning);
  //     setEnd(swiperInstance.isEnd);
  //     swiperInstance.on('slideChange', () => {
  //       console.log('slideChange');
  //       if (swiper) {
  //         setBeginning(swiper.isBeginning);
  //         setEnd(swiper.isEnd);
  //       }
  //     }); */
  //   }
  // };

  // const goNext = () => {
  //   if (swiper) {
  //     swiper.slideNext();
  //   }
  // };
  // const goPrev = () => {
  //   if (swiper) {
  //     swiper.slidePrev();
  //   }
  // };

  const params = {
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    renderPrevButton: () => (
      <div
        role="button"
        tabIndex={0}
        onKeyDown={() => {}}
        // onClick={goPrev}
        className="swiper-button-prev"
        // style={{ display: beginning ? 'none' : 'block' }}
      >
        <PreviousArrow size="2.5rem" />
      </div>
    ),
    renderNextButton: () => (
      <div
        role="button"
        tabIndex={0}
        onKeyDown={() => {}}
        // onClick={goNext}
        className="swiper-button-next"
        // style={{ display: end ? 'none' : 'block' }}
      >
        <NextArrow size="2.5rem" />
      </div>
    ),
  };

  return (
    <div className={classes.cardSlider}>
      <Swiper slidesPerView="auto" {...params} speed={600} shouldSwiperUpdate touchStartForcePreventDefault={false}>
        {children as ReactElement<any>}
      </Swiper>
    </div>
  );
};

export default CardSlider;
