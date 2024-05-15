import React from 'react';
import styles from './RatingStars.scss';

interface IRatingStars {
  rating: string;
  height?: number;
  extraStyle?: any;
}

const RatingStars: React.FC<IRatingStars> = ({ rating, height, extraStyle = {} }) => {
  // ratingCount, fontSize
  const starHeight: number = !height || height === 0 ? 1 : height;
  const starStyle = {
    height: `${starHeight}rem`,
    backgroundSize: `${starHeight}rem`,
  };
  const emptyStyle = {
    ...starStyle,
    width: `${starHeight * 5}rem`,
  };
  const fillStyle = {
    ...starStyle,
    width: `${rating}%`,
  };
  return (
    <span className={styles.empty} style={{ ...emptyStyle, ...extraStyle }}>
      <span className={styles.fill} style={fillStyle} />
    </span>
  );
};

export default RatingStars;
