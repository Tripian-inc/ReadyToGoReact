/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import Model from '@tripian/model';
import moment from 'moment';
import RefCard from '../RefCard/RefCard';
import classes from './OfferRefCard.scss';

interface IOfferRefCard {
  offer: Model.Offer;
  opt: boolean;
  clicked: (offer: Model.Offer) => void;
}

const OfferRefCard: React.FC<IOfferRefCard> = ({ offer, opt, clicked }) => {
  moment.locale(window.twindow.langCode);

  return (
    <RefCard image={offer.imageUrl} title={offer.title} butonText={opt ? 'OPT-OUT' : 'OPT-IN'} subContext={offer.caption} clicked={() => clicked(offer)}>
      <div className={classes.offerRefCardContent}>
        <div>From: {moment(offer.timeframe?.start).format('DD MMMM h:mm A')}</div>
        <div>To: {moment(offer.timeframe?.end).format('DD MMMM h:mm A')}</div>
      </div>
    </RefCard>
  );
};

export default OfferRefCard;
