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
    <div className={classes.showMoreLess}>
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
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 mr-1">
                <path d="M5 12h14" />
                <path d="M12 5v14" />
              </svg>
              {items.length - itemsCount} {t('trips.myTrips.itinerary.step.poi.tags.more')}
            </button>
          ) : (
            <button className={classes.showMoreButton} type="button" onClick={showLessItem}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 mr-1">
                <path d="M5 12h14" />
              </svg>
              <span className={classes.lessButtonText}>{t('trips.myTrips.itinerary.step.poi.tags.less')}</span>
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default ShowMoreLess;
