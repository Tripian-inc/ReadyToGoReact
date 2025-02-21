/* eslint-disable react/no-array-index-key */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import Model, { /* helper, */ Providers } from '@tripian/model';
// import RatingStars from '../../../../components/RatingStars/RatingStars';
import classes from './ToristyProductCardText.scss';

interface IToristyProductCardText {
  product: Providers.Toristy.Product & { categories: { categoryname: string }[] };
  t: (value: Model.TranslationKey) => string;
}

const ToristyProductCardText: React.FC<IToristyProductCardText> = ({ product, t }) => {
  const flags = product.categories.map((pr: { categoryname: string }) => pr.categoryname);

  return (
    <div className={classes.viatorProductCardText}>
      <h4 className={classes.viatorProductCardTitle}>{product.name}</h4>
      <div className={classes.viatorProductCardContent}>
        <h6 className={classes.viatorProductCardTextBody}>
          {flags.map((flag, i) => (
            <span key={i}>
              {flag}
              &nbsp;
            </span>
          ))}
        </h6>
      </div>
      <div className={classes.viatorProductCardFooter}>
        {/* {product.reviews.totalReviews > 0 && (
          <div className={classes.viatorTourCardRating}>
            <RatingStars rating={(product.reviews.combinedAverageRating * 20).toString()} />
            <span className={classes.numberOfRatings}>
              (
              {product.reviews.sources.map((source, i) => (
                <span key={i}>
                  {helper.capitalizeFirstLetter(source.provider)}: {source.totalCount} {i !== product.reviews.sources.length - 1 ? ', ' : ''}
                </span>
              ))}
              )
            </span>
          </div>
        )} */}

        <div className={classes.viatorProductCardPrice}>
          <span>
            <b>
              {product.starting_price.currencySymbol}
              {product.starting_price.price}
            </b>
            &nbsp;{t('trips.myTrips.localExperiences.tourDetails.experience.perPerson')}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ToristyProductCardText;
