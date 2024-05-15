import React from 'react';
import classes from './IconImage.scss';

interface IIconImage {
  type: 'FAVORITES' | 'BOOKINGS' | 'TOUR' | 'SEARCH' | 'OFFER';
}

const IconImage: React.FC<IIconImage> = ({ type }) => <div className={`${classes.iconImage} ${classes[type]}`} />;

export default IconImage;
