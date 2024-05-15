/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import Model, { Providers } from '@tripian/model';
import classes from './BbTourCardText.scss';
import { Clock } from '../../../../../components/base/Svg/Icons';
import { durationFormat } from '../../helper';

interface IBbTourCardText {
  tour: Providers.Bb.Product;
  t: (value: Model.TranslationKey) => string;
}

const BbTourCardText: React.FC<IBbTourCardText> = ({ tour, t }) => {
  let amount: string | undefined = tour.offers[0].priceBreakDowns.find((pb) => pb.touristType === 'ADULT')?.price.amount.toString() ?? undefined;

  if (amount === undefined) {
    amount = `${tour.offers[0].priceBreakDowns[0].price.amount} per tour`;
  } else {
    amount = `${amount} ${t('trips.myTrips.localExperiences.tourDetails.experience.perPerson')}`;
  }

  return (
    <div className={classes.bbTourCardText}>
      <h4 className={classes.bbTourCardTitle}>{tour.info.name}</h4>
      <div className={classes.bbTourCardContent}>
        <h6 className={classes.bbTourCardTextBody}>{tour.themes.join(', ')}</h6>
      </div>
      <div className={classes.bbTourCardFooter}>
        {tour.offers.length > 0 && (
          <>
            <div className={classes.bbTourCardHour}>
              <Clock size="1rem" />
              <span className={classes.numberOfRatings}>{durationFormat(tour.offers[0].duration)}</span>
            </div>
            <div className={classes.bbTourCardPrice}>
              <span>
                <b>${amount}</b>
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BbTourCardText;
