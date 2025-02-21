/* eslint-disable import/no-extraneous-dependencies */
// eslint-disable-next-line import/no-extraneous-dependencies
import React, { useState, useEffect } from 'react';
import Model, { Providers } from '@tripian/model';
import Button from '../../../../components/base/Button/Button';
import classes from './OpeningsSelection.scss';

interface IOpeningsSelection {
  openingTimes: Providers.Yelp.OpeningTime[];
  clicked: (time: string) => void;
  bookingHour: string;
  t: (value: Model.TranslationKey) => string;
}

const OpeningsSelection: React.FC<IOpeningsSelection> = ({ openingTimes, clicked, bookingHour, t }) => {
  const [limit, setLimit] = useState<number>(6);
  const [selectedHour, setSelectedHour] = useState<string>('');

  useEffect(() => {
    setLimit(6);
    setSelectedHour('');
  }, [openingTimes]);

  const getCurrentDayIndex = () => {
    const bookingHourNumber = +bookingHour.replace(/:/g, '');
    const reservationDateRange: Array<number> = [];
    openingTimes.every((o) => reservationDateRange.push(+o.time.replace(/:/g, '')));

    if (reservationDateRange.length > 0) {
      const closedHour = reservationDateRange.reduce((prev: number, curr: number) => (Math.abs(curr - bookingHourNumber) < Math.abs(prev - bookingHourNumber) ? curr : prev));

      let currentIndex = reservationDateRange.findIndex((hours) => hours === closedHour);
      if (currentIndex > 2) {
        currentIndex -= 3;
      } else if (currentIndex === -1) {
        currentIndex = 0;
      }

      return currentIndex;
    }

    return 0;
  };

  if (openingTimes && openingTimes.length > 0) {
    return (
      <div className="row">
        {openingTimes.slice(getCurrentDayIndex(), getCurrentDayIndex() + limit).map((t) => (
          <div key={t.time} className="col col4 col2-m">
            <Button
              color={selectedHour === t.time ? 'disabled' : 'primary'}
              text={t.time}
              className={classes.openingSelectionButton}
              disabled={selectedHour === t.time}
              onClick={() => {
                clicked(t.time);
                setSelectedHour(t.time);
              }}
            />
          </div>
        ))}
        <div className="col col12 center my2">
          <Button color="danger" size="small" text={t('reservation.loadMore')} onClick={() => setLimit(limit + 6)} />
        </div>
      </div>
    );
  }

  return null;
};

export default OpeningsSelection;
