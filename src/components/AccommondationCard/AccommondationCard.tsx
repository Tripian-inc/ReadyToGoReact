import React from 'react';
import Model from '@tripian/model';
import classes from './AccommondationCard.scss';

interface IAccommondationCard {
  accommodation: Model.Accommodation;
  clicked: (accommodation: Model.Accommodation) => void;
}

const AccommondationCard: React.FC<IAccommondationCard> = ({ accommodation, clicked }) => (
  <div
    className={classes.main}
    onKeyDown={() => {}}
    role="button"
    tabIndex={0}
    onClick={() => {
      clicked(accommodation);
    }}
  >
    <figure className={classes.content}>
      {accommodation.imageUrl && accommodation.imageUrl !== '' ? <img className={classes.providerImg} alt={accommodation.provider ?? ''} src={accommodation.imageUrl} referrerPolicy="no-referrer" /> : <div className={classes.contentImg} />}
    </figure>
    <div className={classes.information}>
      <h4 className={classes.accommodationName}>{accommodation.name}</h4>
      <div className={classes.accommodationAdress}>
        <span>{accommodation.address}</span>
      </div>
    </div>
  </div>
);

export default AccommondationCard;
