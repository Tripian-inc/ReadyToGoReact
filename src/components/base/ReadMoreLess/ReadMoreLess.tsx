/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import Model from '@tripian/model';
import classes from './ReadMoreLess.scss';

interface IReadMoreLess {
  desc?: string;
  defaultCharLenght?: number;
  t: (value: Model.TranslationKey) => string;
}

const ReadMoreLess: React.FC<IReadMoreLess> = ({ desc, defaultCharLenght = 180, t }) => {
  const [showMoreDesc, setShowMoreDesc] = useState(false);
  return (
    <div className={classes.readMoreLessContent}>
      {desc && <span className={classes.readMoreLessDesc}>{showMoreDesc ? desc : `${desc.substring(0, defaultCharLenght)}`}</span>}
      {desc && desc.length > defaultCharLenght && (
        <button className={classes.readMoreLessButton} type="button" onClick={() => setShowMoreDesc(!showMoreDesc)}>
          {showMoreDesc ? t('trips.myTrips.itinerary.step.poi.readLess') : t('trips.myTrips.itinerary.step.poi.readMore')}
        </button>
      )}
    </div>
  );
};

export default ReadMoreLess;
