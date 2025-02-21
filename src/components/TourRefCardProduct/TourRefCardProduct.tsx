/* eslint-disable import/no-extraneous-dependencies */
import React, { useMemo } from 'react';
import Model from '@tripian/model';
import RefCard from '../RefCard/RefCard';
import RatingStars from '../RatingStars/RatingStars';
import classes from './TourRefCardProduct.scss';

interface ITourRefCardProduct {
  bookingProduct: Model.BookingProduct;
  clicked: (bookingProduct: Model.BookingProduct) => void;
  t: (value: Model.TranslationKey) => string;
}

const TourRefCardProduct: React.FC<ITourRefCardProduct> = ({ bookingProduct, clicked, t }) => {
  const priceSymbol = useMemo(() => {
    if (bookingProduct.currency === 'USD') {
      return '$';
    }

    if (bookingProduct.currency === 'EUR') {
      return '€';
    }

    return `${bookingProduct.currency || ''} `;
  }, [bookingProduct.currency]);

  return (
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    <RefCard image={bookingProduct.image || ''} title={bookingProduct.title} butonText={t('trips.myTrips.localExperiences.tourDetails.bookNow')} imageText={bookingProduct.provider} clicked={() => clicked(bookingProduct)}>
      {bookingProduct.rating && bookingProduct.rating > 3.6 && bookingProduct.ratingCount && bookingProduct.ratingCount > 9 ? (
        <div className={classes.tourRefCardRating}>
          <RatingStars rating={(bookingProduct?.rating * 20).toString()} />
          <span className={classes.tourRefCardNumberOfRating}>({bookingProduct.ratingCount})</span>
        </div>
      ) : null}
      <b>{`${priceSymbol}${bookingProduct.price ?? 0}`}</b> {t('trips.myTrips.localExperiences.tourDetails.experience.perPerson')}
    </RefCard>
  );
};

export default TourRefCardProduct;
