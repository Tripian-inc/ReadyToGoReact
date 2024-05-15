/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import Model, { Providers } from '@tripian/model';
import BbTourCardText from './BbTourCardText/BbTourCardText';
import classes from './BbTourCard.scss';
import BbTourCardImage from './BbTourCardImage/BbTourCardImage';

interface IBbTourCard {
  tour: Providers.Bb.Product;
  bodyClicked: (tour: Providers.Bb.Product) => void;
  t: (value: Model.TranslationKey) => string;
}

const BbTourCard: React.FC<IBbTourCard> = ({ tour, bodyClicked, t }) => (
  <div
    className={classes.bbTourCard}
    onKeyDown={() => {}}
    role="button"
    tabIndex={0}
    onClick={() => {
      bodyClicked(tour);
    }}
  >
    <BbTourCardImage tourImage={tour.mainImage} />
    <BbTourCardText tour={tour} t={t} />
    <div className={classes.providerName}>
      <div className={classes.favicon} />
      <div className={classes.companyName}>Bookbarbados</div>
    </div>
  </div>
);

export default BbTourCard;
