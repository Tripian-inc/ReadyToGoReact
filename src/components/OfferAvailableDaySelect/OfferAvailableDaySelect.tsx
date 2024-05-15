/* eslint-disable import/no-extraneous-dependencies */
import React, { useCallback, useMemo, useState } from 'react';
import Model from '@tripian/model';
import moment from 'moment';
import { DayPickerSingleDateController } from 'react-dates';
import Button from '../base/Button/Button';
import classes from './OfferAvailableDaySelect.scss';

interface IOfferDaySelect {
  timeframe: Model.TimeFrame;
  selectedDay: (value: string) => void;
  close: () => void;
}

const OfferAvailableDaySelect: React.FC<IOfferDaySelect> = ({ timeframe, selectedDay, close }) => {
  const [date, setDate] = useState<moment.Moment | null>();
  const [focus, setFocus] = useState<boolean>(false);

  moment.locale(window.twindow.langCode);

  const offerAvailableDays = useMemo(() => {
    if (moment(timeframe.end).isBefore(moment(timeframe.start))) {
      return [];
    }
    const newAvailableDays: string[] = [];

    const cursorDate = moment(timeframe.start).isSameOrAfter(moment()) ? moment(timeframe.start).clone() : moment();

    while (cursorDate.isSameOrBefore(timeframe.end)) {
      if (timeframe.recurrent.includes(cursorDate.day())) {
        const cursorDateString = cursorDate.format('YYYY-MM-DD');
        if (!timeframe.blackouts.includes(cursorDateString)) {
          newAvailableDays.push(cursorDateString);
        }
      }
      cursorDate.add(1, 'days');
    }
    return newAvailableDays;
  }, [timeframe]);

  const isBlocked = useCallback((day: moment.Moment) => !offerAvailableDays.some((availableDay) => day.isSame(moment(availableDay, 'YYYY-MM-DD'), 'day')), [offerAvailableDays]);

  return (
    <div className="row m0">
      <div className={classes.offerDaySelectModal}>
        <DayPickerSingleDateController
          daySize={30}
          date={date || moment(offerAvailableDays[0])}
          focused={focus}
          onFocusChange={({ focused }) => {
            if (focused) setFocus(focused);
          }}
          onDateChange={(selected) => {
            setDate(selected);
          }}
          numberOfMonths={1}
          isDayBlocked={isBlocked}
          renderCalendarInfo={() => (
            <div className="row m0 center">
              <div className="col col6 my2">
                <Button
                  color="primary"
                  text="Cancel"
                  onClick={(e) => {
                    e.stopPropagation();
                    close();
                  }}
                />
              </div>
              <div className="col col6 my2">
                <Button
                  color="primary"
                  text="Claim"
                  disabled={date === undefined || date === null}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (date) {
                      selectedDay(date?.format('YYYY-MM-DD'));
                    }
                  }}
                />
              </div>
            </div>
          )}
        />
      </div>
    </div>
  );
};

export default OfferAvailableDaySelect;
