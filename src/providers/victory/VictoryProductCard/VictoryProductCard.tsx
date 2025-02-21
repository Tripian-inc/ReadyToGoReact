/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React from 'react';
import Model, { Providers } from '@tripian/model';
import moment from 'moment';
import classes from './VictoryProductCard.scss';
import { Calendar, MapPin } from '../../../components/base/Svg/Icons';
import Ticket from '../../../components/base/Svg/Icons/Ticket';

interface IVictoryProductCard {
  product: Providers.Victory.Event;
  bodyClicked: (product: Providers.Victory.Event) => void;
  t?: (value: Model.TranslationKey) => string;
}

const VictoryProductCard: React.FC<IVictoryProductCard> = ({ product, bodyClicked, t }) => {
  const formatDate = (dateStr: string) => moment(dateStr).format('ddd, MMM D, h:mm A');

  return (
    <div
      className={classes.eventCard}
      onKeyDown={() => {}}
      role="button"
      tabIndex={0}
      onClick={() => {
        bodyClicked(product);
      }}
    >
      <div className={classes.eventCardContent}>
        <div className={classes.eventCardHeader}>
          <h3 className={classes.eventTitle}>{product.name}</h3>
          <span className={classes.eventCategory}>
            {product.category.parent && product.category.parent.name ? `${product.category.parent.name} - ` : ''}
            {product.category.name}
          </span>
        </div>

        <div className={classes.eventDetails}>
          <div className={classes.eventDetail}>
            <Calendar className={classes.eventIcon} />
            <span>{formatDate(product.occurs_at_local)}</span>
          </div>

          <div className={classes.eventDetail}>
            <MapPin className={classes.eventIcon} />
            <span className={classes.eventLocation}>
              {product.venue.name}, {product.venue.location}
            </span>
          </div>

          <div className={classes.eventDetail}>
            <Ticket className={classes.eventIcon} />
            <span>{product.available_count} tickets available</span>
          </div>
        </div>

        <div className={classes.providerName}>
          <div className={classes.favicon} />
          <div className={classes.companyName}>Victory Live</div>
        </div>
      </div>
    </div>
  );
};

export default VictoryProductCard;
