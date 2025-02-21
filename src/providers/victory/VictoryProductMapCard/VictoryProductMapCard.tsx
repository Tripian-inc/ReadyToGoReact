/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import moment from 'moment';
import { Providers } from '@tripian/model';
import { Calendar2, MapPin, Ticket2 } from '../../../components/base/Svg/Icons';
import Button from '../../../components/base/Button/Button';
import classes from './VictoryProductMapCard.scss';

interface IVictoryProductCard {
  event: Providers.Victory.Event;
  bodyClicked: (event: Providers.Victory.Event) => void;
}

const VictoryProductMapCard: React.FC<IVictoryProductCard> = ({ event, bodyClicked }) => (
  <div className={classes.container}>
    <div className={classes.content}>
      <div className={classes.header}>
        <h3 className={classes.title}>{event.name}</h3>
        <span className={classes.category}>
          {event.category.parent?.name} - {event.category.name}
        </span>
      </div>

      <div className={classes.details}>
        <div className={classes.detailItem}>
          <span className={classes.icon}>
            <Calendar2 width="16" height="16" />
          </span>
          <span>{moment(event.occurs_at_local).format('ddd, MMM D, h:mm A')}</span>
        </div>

        <div className={classes.detailItem}>
          <span className={classes.icon}>
            <MapPin width="16" height="16" />
          </span>
          <span>
            {event.venue.name}, {event.venue.location}
          </span>
        </div>

        <div className={classes.detailItem}>
          <span className={classes.icon}>
            <Ticket2 width="16" height="16" />
          </span>
          <span>{event.available_count} tickets available</span>
        </div>
      </div>

      <Button color="primary" onClick={() => bodyClicked(event)} className={classes.button} text="View Details" />
    </div>
  </div>
);

export default VictoryProductMapCard;
