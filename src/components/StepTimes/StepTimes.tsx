/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import Model from '@tripian/model';
import Button from '../base/Button/Button';
import Info from '../base/Svg/Icons/Info';
import classes from './StepTimes.scss';

export const hourRange = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'];
export const minuteRange = ['00', '05', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55'];
export const timeRange: Array<string> = [];

hourRange.forEach((h) => minuteRange.forEach((m) => timeRange.push(`${h}:${m}`)));

export const startTimeRange = (all = true) => (all ? timeRange : timeRange.filter((_, i) => i !== timeRange.length - 1));

export const endTimeRange = (startHour?: string) => {
  if (startHour === undefined) return timeRange;

  const filteredEndHours: string[] = [];
  let getAll = false;
  for (let i = 0; i < timeRange.length; i += 1) {
    const hr = timeRange[i];
    if (getAll) {
      filteredEndHours.push(hr);
    } else if (hr === startHour) getAll = true;
  }

  return filteredEndHours;
};

export const oneHourForward = (hour: string) => {
  const split = hour.split(':');
  const add1Hour = (Number(split[0]) + 1).toString();
  const newHour = `${Number(add1Hour) < 10 ? `0${add1Hour}` : add1Hour}:${split[1]}`;
  return newHour;
};

const fromBiggerOrEqualThanTo = (from: string, to: string) => {
  const fromSplittedArr = from.split(':');
  const fromNumber = Number(`${fromSplittedArr[0]}${fromSplittedArr[1]}`);
  const toSplittedArr = to.split(':');
  const toNumber = Number(`${toSplittedArr[0]}${toSplittedArr[1]}`);

  if (fromNumber >= toNumber) {
    return true;
  }
  return false;
};

interface IStepTimes {
  times: { from?: string; to?: string };
  timesClicked: (from?: string, to?: string) => void;
  buttonText: string;
  duration?: string;
  t: (value: Model.TranslationKey) => string;
}

const StepTimes: React.FC<IStepTimes> = ({ times, timesClicked, buttonText, duration, t }) => {
  const [timeFrame, setTimeFrame] = useState<{ from?: string; to?: string }>({ from: times.from, to: times.to });

  const fromOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const fromTimeBiggerOrEqualThanToTime = timeFrame.to ? fromBiggerOrEqualThanTo(e.target.value, timeFrame.to) : false;

    if (timeFrame.to === undefined || timeFrame.to === '' || fromTimeBiggerOrEqualThanToTime) {
      const newHour = oneHourForward(e.target.value);
      setTimeFrame({ from: e.target.value, to: newHour });
    } else {
      setTimeFrame({ ...timeFrame, from: e.target.value });
    }
  };

  const toOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (timeFrame.from === e.target.value) {
      const newHour = oneHourForward(e.target.value);
      setTimeFrame({ from: e.target.value, to: newHour });
    } else {
      setTimeFrame({ ...timeFrame, to: e.target.value });
    }
  };

  return (
    <div className={classes.stepTimesContent} role="button" tabIndex={0} onKeyPress={() => {}} onClick={(e) => e.stopPropagation()}>
      <div className={classes.title}>{t('trips.myTrips.itinerary.step.addToItinerary.title')}</div>
      <div className={classes.timeContent}>
        <div className={classes.timeWrapper}>
          <div className={classes.timeTitle}>{t('trips.myTrips.itinerary.step.addToItinerary.from')}</div>

          <select id="startTime" className={classes.select} value={timeFrame.from} onChange={fromOnChange}>
            {timeFrame.from === undefined && <option value={undefined}>-- --</option>}
            {startTimeRange().map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className={classes.timeWrapper}>
          <div className={classes.timeTitle}>{t('trips.myTrips.itinerary.step.addToItinerary.to')}</div>

          <select id="endTime" className={classes.select} value={timeFrame.to} onChange={toOnChange}>
            {timeFrame.to === undefined && <option value={undefined}>-- --</option>}
            {endTimeRange(timeFrame.from).map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>
      <Button
        color="primary"
        className={classes.stepTimesButton}
        text={buttonText}
        disabled={!!timeFrame.from && !!timeFrame.to && times.from === timeFrame.from && times.to === timeFrame.to}
        onClick={(e) => {
          e.stopPropagation();
          timesClicked(timeFrame.from, timeFrame.to);
        }}
      />
      {duration && (
        <div className={classes.footer}>
          <Info fill="#5F6980" />
          <span className={classes.footerText}>
            {t('trips.myTrips.itinerary.step.addToItinerary.estimatedDuration')}: {duration}
          </span>
        </div>
      )}
    </div>
  );
};

export default StepTimes;
