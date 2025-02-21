/* eslint-disable react/no-array-index-key */
// eslint-disable-next-line import/no-extraneous-dependencies
import React, { useState } from 'react';
import { SingleDatePicker as ReactDatePicker } from 'react-dates';
import 'react-dates/initialize';
import moment from 'moment';
import './DatePicker.scss';

interface IDatePickerTemplate {
  currentDate: moment.Moment | null;
  onchanged: (date: moment.Moment | null) => void;
  startDate?: moment.Moment;
  endDate?: moment.Moment;
  openDirection?: 'down' | 'up';
  showMonthSelection?: boolean;
  isDayBlocked?: ((date: moment.Moment | null) => boolean) | undefined;
}

const DatePicker: React.FC<IDatePickerTemplate> = ({ currentDate, onchanged, startDate, endDate, openDirection = 'down', showMonthSelection = false, isDayBlocked }) => {
  moment.locale(window.twindow.langCode);

  const [date, setDate] = useState<moment.Moment | null>(currentDate);
  const [focus, setFocus] = useState<boolean | null>(false);

  const smallDevice = window.matchMedia('(max-width: 768px)').matches;

  const renderMonthElement = ({ month, onMonthSelect, onYearSelect }: { month: moment.Moment; onMonthSelect: (currentMonth: moment.Moment, newMonthVal: string) => void; onYearSelect: (currentMonth: moment.Moment, newYearVal: string) => void }) => {
    let i;
    const years = [];
    for (i = moment().year(); i >= moment().year() - 100; i -= 1) {
      years.push(
        <option value={i} key={`year-${i}`}>
          {i}
        </option>,
      );
    }

    return (
      <div className="date-picker-extra">
        <div className="date-picker-month">
          <select className="date-picker-select" value={month.month()} onChange={(e) => onMonthSelect(month, e.target.value)}>
            {moment.months().map((label, value) => (
              <option key={`${label}-${value}`} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
        <div className="date-picker-year">
          <select className="date-picker-select" value={month.year()} onChange={(e) => onYearSelect(month, e.target.value)}>
            {years}
          </select>
        </div>
      </div>
    );
  };

  return (
    <ReactDatePicker
      id="datepicker"
      date={date}
      displayFormat="YYYY-MM-DD"
      hideKeyboardShortcutsPanel
      focused={focus}
      // orientation={smallDevice ? 'vertical' : 'horizontal'}
      withFullScreenPortal={smallDevice}
      onDateChange={(selectedDate) => {
        setDate(selectedDate);
        onchanged(selectedDate);
      }}
      renderMonthElement={showMonthSelection ? renderMonthElement : undefined}
      openDirection={openDirection}
      block
      numberOfMonths={1}
      onFocusChange={({ focused }) => setFocus(focused)}
      isOutsideRange={(day: moment.Moment) => {
        if (startDate && endDate) {
          if (day.isBefore(startDate) || day.isAfter(endDate)) return true;
        }
        return false;
      }}
      isDayBlocked={isDayBlocked}
      placeholder="Select a date"
    />
  );
};

export default DatePicker;
