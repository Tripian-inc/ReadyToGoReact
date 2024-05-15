/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import Model, { Providers } from '@tripian/model';
import GygTourCardImage from './GygTourCardImage/GygTourCardImage';
import GygTourCardText from './GygTourCardText/GygTourCardText';
import classes from './GygTourCard.scss';

interface IGygTourCard {
  tour: Providers.Gyg.Tour;
  bodyClicked: (tour: Providers.Gyg.Tour) => void;
  t: (value: Model.TranslationKey) => string;
}

const GygTourCard: React.FC<IGygTourCard> = ({ tour, bodyClicked, t }) => (
  <div
    className={classes.gygTourCard}
    onKeyDown={() => {}}
    role="button"
    tabIndex={0}
    onClick={() => {
      bodyClicked(tour);
    }}
  >
    <GygTourCardImage tourImage={tour.pictures} />
    <GygTourCardText tour={tour} t={t} />
    <div className={classes.providerName}>
      <div className={classes.favicon} />
      <div className={classes.companyName}>Getyourguide</div>
    </div>
  </div>
);

export default GygTourCard;
