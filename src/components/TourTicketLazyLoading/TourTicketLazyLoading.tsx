import React from 'react';
import Tour from '../base/Svg/Icons/Tour';
import Ticket from '../base/Svg/Icons/Ticket';
import classes from './TourTicketLazyLoading.scss';

const TourTicketLazyLoading = () => (
  <div className={classes.spinnerContainer}>
    <Tour fill="#000" className={classes.iconBlur1} />
    <Ticket fill="#000" className={classes.iconBlur2} />
  </div>
);

export default TourTicketLazyLoading;
