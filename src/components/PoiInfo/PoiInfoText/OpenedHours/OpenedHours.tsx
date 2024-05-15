/* eslint-disable react/no-array-index-key */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import moment from 'moment';
import Model, { helper } from '@tripian/model';
import classes from './OpenedHours.scss';

interface IOPenedHours {
  hourStr: string;
  planDate?: string;
  t: (value: Model.TranslationKey) => string;
}

interface IHourItem {
  hour: { day: string; clock: string[] };
  lineHeight?: string;
}

export const HourItem: React.FC<IHourItem> = ({ hour, lineHeight }) => (
  <div className={classes.hourItem} key={`${hour.day}${hour.clock.join('-')}${Math.floor(Math.random() * 100 + 1)}`}>
    <span className={classes.day}>{hour.day}</span>
    <span className={classes.clock} style={{ lineHeight }}>
      {hour.clock[0]} <br />
      {hour.clock[1]}
    </span>
  </div>
);

const OpenedHours: React.FC<IOPenedHours> = ({ hourStr, planDate, t }) => {
  const [showHours, setShowHours] = useState<boolean>(false);

  moment.locale(window.twindow.langCode);

  const daysArray = [t('sunday'), t('monday'), t('tuesday'), t('wednesday'), t('thursday'), t('friday'), t('saturday')];

  const hours = helper.hoursFormat(hourStr, daysArray, t('closed'));
  const date = planDate ? moment(planDate).format('ddd') : moment().format('ddd');
  const findToday = hours?.find((hour) => hour.day === date);

  return (
    <div className={classes.openedHours}>
      <div className={classes.hourContent}>{showHours ? hours.map((h, i) => <HourItem key={`${h.day}-${i}`} hour={h} lineHeight="35px" />) : <HourItem hour={findToday || hours[0]} />}</div>
      <div className={classes.exploreButton} role="button" tabIndex={0} onKeyPress={() => {}} onClick={() => setShowHours(!showHours)}>
        {showHours ? t('trips.myTrips.itinerary.step.poi.hours.close') : t('trips.myTrips.itinerary.step.poi.hours.explore')}
      </div>
    </div>
  );
};

export default OpenedHours;
