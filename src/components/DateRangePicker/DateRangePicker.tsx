/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// eslint-disable-next-line import/no-extraneous-dependencies
import React, { useState } from 'react';
import { DateRangePicker as ReactDateRangePicker } from 'react-dates';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import './DateRangePicker.scss';
import moment from 'moment';

interface IDateRangePickerTemplate {
  currentDateRange: { startDate: moment.Moment; endDate: moment.Moment };
  onchanged: (startDate: moment.Moment, endDate: moment.Moment) => void;
  onFocus?: (start: boolean) => void;
  onBlur?: () => void;
  // maxDays?: number;
}

const DateRangePicker: React.FC<IDateRangePickerTemplate> = ({ currentDateRange, onchanged, onFocus, onBlur /* , maxDays */ }) => {
  moment.locale(window.twindow.langCode);

  const [calendarFocused, setCalendarFocused] = useState<'startDate' | 'endDate' | null>(null);
  const [dateRange, setDateRange] = useState(currentDateRange);

  const handleDateChange = ({ startDate, endDate }: any) => {
    if (startDate < dateRange.startDate) {
      setDateRange({ startDate, endDate: null as any });
    } else {
      setDateRange({ startDate, endDate });
    }

    if (dateRange.endDate && endDate) {
      setCalendarFocused('startDate');
    }

    if (startDate && endDate) {
      onchanged(startDate, endDate);
    }
  };

  const handleFocusChange = (focused: 'startDate' | 'endDate' | null) => {
    setCalendarFocused(focused);
    if (focused) {
      if (onFocus) onFocus(focused === 'startDate');
      return;
    }
    if (onBlur) onBlur();
  };

  const isOutsideRange = (day: moment.Moment) => {
    if (calendarFocused === 'endDate') {
      const endDateIsBeforeNow: boolean = day.isBefore(moment());
      if (endDateIsBeforeNow) return true;

      const startDateAddMaxDay = moment(dateRange.startDate, 'DD.MM.YYYY').add('days', 13);
      const endDateIsAfterMaxDay: boolean = day.isAfter(startDateAddMaxDay);
      if (endDateIsAfterMaxDay) return true;
    }

    const startDateIsBeforeNow: boolean = day.isBefore(moment());
    if (startDateIsBeforeNow) return true;

    return false;
  };

  const smallDevice = window.matchMedia('(max-width: 768px)').matches;

  return (
    <ReactDateRangePicker
      startDate={dateRange.startDate}
      startDateId="startDate"
      endDate={dateRange.endDate}
      endDateId="endDate"
      onDatesChange={({ startDate, endDate }) => handleDateChange({ startDate, endDate })}
      displayFormat="MMM Do YYYY"
      block
      minimumNights={0}
      focusedInput={calendarFocused}
      onFocusChange={handleFocusChange}
      hideKeyboardShortcutsPanel
      isOutsideRange={isOutsideRange}
      orientation={smallDevice ? 'vertical' : 'horizontal'}
      withPortal={smallDevice}
      onClose={({ startDate, endDate }) => {
        if (startDate && !endDate) {
          const newDateRange = { ...dateRange };
          newDateRange.startDate = startDate;
          newDateRange.endDate = moment(dateRange.startDate, 'DD.MM.YYYY').add(3, 'days');
          setDateRange(newDateRange);
          onchanged(newDateRange.startDate, newDateRange.endDate);
        } else if (!startDate && !endDate) {
          setDateRange(currentDateRange);
          onchanged(currentDateRange.startDate, currentDateRange.endDate);
        }
      }}
    />
  );
};

export default DateRangePicker;
