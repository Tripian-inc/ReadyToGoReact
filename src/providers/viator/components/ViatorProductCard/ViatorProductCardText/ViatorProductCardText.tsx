/* eslint-disable react/no-array-index-key */
/* eslint-disable no-nested-ternary */
import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import Model, { helper, Providers } from '@tripian/model';
// import { Clock } from '../../../../../components/base/Svg/Icons';
import RatingStars from '../../../../../components/RatingStars/RatingStars';
import classes from './ViatorProductCardText.scss';

interface IViatorProductCardText {
  product: Providers.Viator.Product;
  t: (value: Model.TranslationKey) => string;
}

enum FLAG {
  FREE_CANCELLATION = 'Free Cancellation',
  LIKELY_TO_SELL_OUT = 'Likely To Sell Out',
  NEW_ON_VIATOR = 'New On Viator',
  VIATOR_EXCLUSIVE = 'Viator Exclusive',
  SKIP_THE_LINE = 'Skip The Line',
  PRIVATE_TOUR = 'Private Tour',
  SPECIAL_OFFER = 'Special Offer',
}

const ViatorProductCardText: React.FC<IViatorProductCardText> = ({ product, t }) => {
  const amount: string = product.pricing.summary.fromPrice.toString();

  const flags = product.flags.map((pr) =>
    pr
      .toLowerCase()
      .split('_')
      .map((p) => p && p[0].toUpperCase() + p.slice(1))
      .join(' '),
  );

  const translateFlag = (flag: string) => {
    switch (flag) {
      case FLAG.FREE_CANCELLATION:
        return t('trips.myTrips.localExperiences.tourDetails.freeCancellation');
      case FLAG.LIKELY_TO_SELL_OUT:
        return t('trips.myTrips.localExperiences.tourDetails.likelyToSellOut');
      case FLAG.NEW_ON_VIATOR:
        return t('trips.myTrips.localExperiences.tourDetails.newOnViator');
      case FLAG.VIATOR_EXCLUSIVE:
        return t('trips.myTrips.localExperiences.tourDetails.viatorExclusive');
      case FLAG.SKIP_THE_LINE:
        return t('trips.myTrips.localExperiences.tourDetails.skipTheLine');
      case FLAG.PRIVATE_TOUR:
        return t('trips.myTrips.localExperiences.tourDetails.privateTour');
      case FLAG.SPECIAL_OFFER:
        return t('trips.myTrips.localExperiences.tourDetails.specialOffer');
      default:
        return '';
    }
  };

  // const duration = useMemo(() => {
  //   if (product.duration.fixedDurationInMinutes) {
  //     return (
  //       <span className={classes.numberOfRatings}>
  //         {product.duration.fixedDurationInMinutes} {t('trips.myTrips.localExperiences.tourDetails.mins')}
  //       </span>
  //     );
  //   }
  //   if (product.duration.variableDurationFromMinutes && product.duration.variableDurationToMinutes) {
  //     return (
  //       <span className={classes.numberOfRatings}>
  //         {product.duration.variableDurationFromMinutes} - {product.duration.variableDurationToMinutes} {t('trips.myTrips.localExperiences.tourDetails.mins')}
  //       </span>
  //     );
  //   }
  //   return null;
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [product.duration]);

  return (
    <div className={classes.viatorProductCardText}>
      <h4 className={classes.viatorProductCardTitle}>{product.title}</h4>
      <div className={classes.viatorProductCardContent}>
        <h6 className={classes.viatorProductCardTextBody}>
          {flags.map((flag, i) => (
            <span key={i}>
              <span style={{ color: flag === FLAG.FREE_CANCELLATION ? 'green' : flag === FLAG.LIKELY_TO_SELL_OUT ? 'red' : 'gray' }}>{translateFlag(flag)}</span>
              &nbsp;
            </span>
          ))}
        </h6>
      </div>
      <div className={classes.viatorProductCardFooter}>
        {product.reviews.totalReviews > 0 && (
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
        )}

        {/* <div className={classes.viatorProductCardHour}>
          <Clock size="1rem" />
          {duration}
        </div> */}
        <div className={classes.viatorProductCardPrice}>
          <span>
            <b>${amount}</b>
          </span>
        </div>
      </div>
    </div>
  );
};

export default ViatorProductCardText;
