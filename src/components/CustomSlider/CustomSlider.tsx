/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';
import classes from './CustomSlider.scss';
import { NextArrow, PreviousArrow } from '../base/Svg/Icons';

interface ICustomSlider {
  children: React.ReactNode;
  scrollSize?: number;
}

const CustomSlider: React.FC<ICustomSlider> = ({ scrollSize = 50, children }) => {
  const scrl = useRef<HTMLDivElement | null>(null);
  const [scrollX, setscrollX] = useState(0);
  const [scrolEnd, setscrolEnd] = useState(false);

  const slide = (shift: number) => {
    if (scrl.current) {
      scrl.current.scrollTo({ left: (scrl.current.scrollLeft += shift), behavior: 'smooth' });
      setscrollX(scrollX + shift);

      if (Math.floor(scrl.current.scrollWidth - scrl.current.scrollLeft) <= scrl.current.offsetWidth) {
        setscrolEnd(true);
      } else {
        setscrolEnd(false);
      }
    }
  };

  const scrollCheck = () => {
    if (scrl.current) {
      setscrollX(scrl.current.scrollLeft);
      if (Math.floor(scrl.current.scrollWidth - scrl.current.scrollLeft) <= scrl.current.offsetWidth) {
        setscrolEnd(true);
      } else {
        setscrolEnd(false);
      }
    }
  };

  useEffect(() => {
    if (scrl.current && scrl?.current?.scrollWidth === scrl?.current?.offsetWidth) {
      setscrolEnd(true);
    } else {
      setscrolEnd(false);
    }
  }, [scrl?.current?.scrollWidth, scrl?.current?.offsetWidth]);

  return (
    <div className={classes.customSlider}>
      {scrollX !== 0 && (
        <div className={classes.customSliderPrevArrow} role="button" onKeyDown={() => {}} tabIndex={0} onClick={() => slide(-scrollSize)}>
          <PreviousArrow size="2rem" />
        </div>
      )}
      <div ref={scrl} onScroll={scrollCheck} className={classes.customSliderItems}>
        {children}
      </div>
      {!scrolEnd && (
        <div className={classes.customSliderNextArrow} role="button" onKeyDown={() => {}} tabIndex={0} onClick={() => slide(+scrollSize)}>
          <NextArrow size="2rem" />
        </div>
      )}
    </div>
  );
};

export default CustomSlider;
