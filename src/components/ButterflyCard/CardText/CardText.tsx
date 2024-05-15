/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import Model, { helper } from '@tripian/model';
import classes from './CardText.scss';
import RatingStars from '../../RatingStars/RatingStars';

interface ICardText {
  poi: Model.Poi;
  dayNumber?: number;
}

const CardText: React.FC<ICardText> = ({ poi, dayNumber }) => {
  const cuisinesArray = poi.cuisines?.split(', ') || [];
  const uniqueCuisines = helper.removeDuplicateValues(cuisinesArray, (s1, s2) => s1 === s2);

  let info;
  if (!poi.status) {
    if (poi.name.includes('Permanently Closed')) info = <p className={`${classes.attraction} ${classes.statusWarning}`}>This place is no longer available.</p>;
    else info = <p className={`${classes.attraction} ${classes.statusWarning}`}>Temporarily closed.</p>;
  } else {
    info = (
      <>
        {poi.description ? (
          <p className={classes.attraction}>{poi.description}</p>
        ) : (
          <>
            <p className={classes.nonAttraction}>
              {uniqueCuisines.length > 0 ? (
                <>
                  <b>Cuisine: </b>
                  {uniqueCuisines.join(', ')}
                  <br />
                </>
              ) : null}
              {poi.tags ? poi.tags.join(', ') : null} {/* 'empty'} */}
            </p>
            {/* <p className={classes.nonAttraction}>
          <b>Tags: </b>
          {poi.tags.slice(0, 3).join(', ')}
        </p> */}
          </>
        )}
      </>
    );
  }

  return (
    <div className={classes.cardText}>
      <h4>{poi.name}</h4>
      <h6>{`${helper.plural(poi.category[0].name, true)} ${dayNumber ? `/ Day ${dayNumber}` : ''}`}</h6>
      <div className={classes.rate}>
        <span>
          <RatingStars rating={`${poi.rating ? poi.rating * 20 : null}`} extraStyle={{ marginLeft: '-2px' }} />
        </span>
        <span className={classes.count}>({poi.ratingCount})</span>
      </div>
      {info}
    </div>
  );
};

export default CardText;
