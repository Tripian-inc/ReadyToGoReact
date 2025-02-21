/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import moment from 'moment';
import Model from '@tripian/model';
import MapPinIcon from '../base/Svg/Icons/MapPin';
import classes from './EventCard.scss';

type Props = {
  title: string;
  image: string | null;
  date: {
    startDate: string;
    when: string;
  };
  venue: Model.CityEventVenue;
};

const EventCard: React.FC<Props> = ({ title, image, date, venue }) => (
  <div className={classes.eventCard}>
    <div className={classes.eventCardInner}>
      {image ? <img src={image} alt={title} className={classes.eventCardImage} /> : <div className={classes.eventCardPlaceholder}>{/* Optional Placeholder Icon */}</div>}
      <div className={classes.eventCardOverlay}>
        <div className={classes.eventCardDate}>
          <span className={classes.eventCardDateText}>{moment(date.startDate).format('MMM Do')}</span>
        </div>
        <h3 className={classes.eventCardTitle}>{title}</h3>
        <div className={classes.eventCardDetails}>
          <div className={classes.eventCardVenue}>
            <div className={classes.eventCardVenueIcon}>
              <MapPinIcon className={classes.eventCardVenueSvg} />
            </div>
            <span className={classes.eventCardVenueText}>{venue.name}</span>
          </div>
          <div className={classes.eventCardRating}>
            <span role="img" aria-label="Star" className={classes.eventCardRatingIcon}>
              ⭐
            </span>
            <span className={classes.eventCardRatingText}>{venue.rating}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default EventCard;
