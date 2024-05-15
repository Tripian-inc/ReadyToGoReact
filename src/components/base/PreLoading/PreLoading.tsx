/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import classes from './PreLoading.scss';

interface IPreLoading {
  bgColor?: string;
  color?: string;
  size?: 'small' | 'large' | 'default';
  customClass?: string;
}

const PreLoading: React.FC<IPreLoading> = ({ bgColor, color, size = 'default', customClass = '' }) => {
  let sizeClass = classes.default;
  if (size === 'small') {
    sizeClass = classes.small;
  } else if (size === 'large') {
    sizeClass = classes.large;
  }

  return (
    <div className={`${classes.preloaderBackground} ${customClass}`} style={bgColor ? { backgroundColor: bgColor } : {}}>
      <div className={`${classes.preloaderWrapper} ${classes.active} ${sizeClass}`}>
        <div className={`${classes.spinnerLayer} ${classes.spinnerTripianOnly}`} style={color ? { borderColor: color } : {}}>
          <div className={`${classes.circleClipper} ${classes.left}`}>
            <div className={classes.circle} />
          </div>
          <div className={classes.gapPatch}>
            <div className={classes.circle} />
          </div>
          <div className={`${classes.circleClipper} ${classes.right}`}>
            <div className={classes.circle} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreLoading;
