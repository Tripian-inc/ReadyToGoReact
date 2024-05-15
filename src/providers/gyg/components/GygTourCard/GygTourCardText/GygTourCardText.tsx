/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import Model, { Providers } from '@tripian/model';
import classes from './GygTourCardText.scss';
import RatingStars from '../../../../../components/RatingStars/RatingStars';

interface IGygTourCardText {
  tour: Providers.Gyg.Tour;
  t: (value: Model.TranslationKey) => string;
}

const GygTourCardText: React.FC<IGygTourCardText> = ({ tour, t }) => (
  <div className={classes.gygTourCardText}>
    <h4 className={classes.gygTourCardTitle}>{tour.title}</h4>
    <div className={classes.gygTourCardContent}>
      {/* ??? */}
      <h6 className={classes.gygTourCardTextBody}>
        {tour.categories
          .filter((category) => !category.parent_id)
          .map((c) => c.name)
          .join(', ')}
      </h6>
    </div>
    <div className={classes.gygTourCardFooter}>
      {/* {tour.overall_rating > 3.6 && tour.number_of_ratings > 9 ? ( */}
      <div className={classes.gygTourCardRating}>
        <RatingStars rating={(tour?.overall_rating * 20).toString()} />
        <span className={classes.numberOfRatings}>({tour.number_of_ratings})</span>
      </div>
      {/* ) : null} */}
      <div className={classes.gygTourCardPrice}>
        <span>
          <b>${tour.price ? tour.price.values.amount : 0}</b> {t('trips.myTrips.localExperiences.tourDetails.experience.perPerson')}
        </span>
      </div>
    </div>
  </div>
);

export default GygTourCardText;
