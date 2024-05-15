/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import Model, { helper } from '@tripian/model';
import moment from 'moment';
import classes from './TripSavedCard.scss';
import ImgLazy from '../base/ImgLazy/ImgLazy';

interface ITripSavedCard {
  tripReference: Model.TripReference;
  clicked: (tripReference: Model.TripReference) => void;
}

const TripSavedCard: React.FC<ITripSavedCard> = ({ tripReference, clicked }) => {
  const cityImg = helper.cityImgUrl(`${tripReference.city.image.url}`, 800, 500);

  moment.locale(window.twindow.langCode);

  const arrivalDate = moment(tripReference.tripProfile.arrivalDatetime).utcOffset(0);
  const departureDate = moment(tripReference.tripProfile.departureDatetime).utcOffset(0);
  const lastTripDatetime = moment(tripReference.tripProfile.departureDatetime).format('X');
  const datetimeNow = moment(new Date()).format('X');

  const start = moment(arrivalDate.format('YYYY-MM-DD'));
  const end = moment(departureDate.format('YYYY-MM-DD'));
  const duration = moment.duration(end.diff(start)).asDays();
  const howManyDays = Math.ceil(duration) + 1;

  const cardImageClasses = [classes.cardImage];
  if (lastTripDatetime <= datetimeNow) {
    cardImageClasses.push(classes.cardImageBlackWhite);
  }

  return (
    <div
      className={classes.tripSavedCard}
      role="button"
      tabIndex={0}
      onKeyPress={() => {}}
      onClick={() => {
        clicked(tripReference);
      }}
    >
      <div className={cardImageClasses.join(' ')}>
        <ImgLazy src={cityImg} alt={tripReference.city.name} x={800} y={500} />
        <h2 className={classes.cardTitle}>{tripReference.city.name} </h2>
        <h6 className={classes.howManyDays}>{`(${howManyDays} days)`}</h6>
      </div>
      <div className={classes.cardContent}>
        <p>{`${arrivalDate.format('MMM Do YY')} — ${departureDate.format('MMM Do YY')}`}</p>
      </div>
    </div>
  );
};

export default TripSavedCard;
