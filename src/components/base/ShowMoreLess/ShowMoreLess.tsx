/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import Model from '@tripian/model';
import ArrowUp from '../Svg/Icons/ArrowUp';
import classes from './ShowMoreLess.scss';

interface IShowMoreLess {
  items: string[];
  defaultItemCount: number;
  t: (value: Model.TranslationKey) => string;
}

const ShowMoreLess: React.FC<IShowMoreLess> = ({ items, defaultItemCount, t }) => {
  const [itemsCount, setItemsCount] = useState<number>(defaultItemCount);

  const showMoreItem = () => {
    setItemsCount(items.length);
  };

  const showLessItem = () => {
    setItemsCount(defaultItemCount);
  };

  return (
    <div>
      {items.length > 0 &&
        items.slice(0, itemsCount).map((item, i) => (
          <span key={`${item}-${i}`} className={classes.tag}>
            #{item}
          </span>
        ))}
      {items.length > defaultItemCount && (
        <>
          {itemsCount === defaultItemCount ? (
            <button className={classes.showMoreButton} type="button" onClick={showMoreItem}>
              +{items.length - itemsCount} {t('trips.myTrips.itinerary.step.poi.tags.more')}
            </button>
          ) : (
            <button className={classes.showLessButton} type="button" onClick={showLessItem}>
              <ArrowUp className={classes.lessArrowIcon} />
              <span className={classes.lessButtonText}>{t('trips.myTrips.itinerary.step.poi.tags.less')}</span>
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default ShowMoreLess;
