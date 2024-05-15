/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import moment from 'moment';
import Dropdown from '../base/Dropdown/Dropdown';
import classes from './PlanChangeDay.scss';

interface IPlanChangeDay {
  options: Array<{ id: number; date: string }>;
  defaultIndex: number;
  onDayChange: (newDayIndex: number) => void;
}

const PlanChangeDay: React.FC<IPlanChangeDay> = ({ options, defaultIndex, onDayChange }) => {
  moment.locale(window.twindow.langCode);

  return (
    <>
      <div className={classes.dropdown}>
        <Dropdown
          id="planChangeDayDropdown"
          options={options?.map((planRef) => ({
            key: planRef.id,
            value: `Day ${options.findIndex((o) => o.id === planRef.id) + 1}, ${moment(planRef.date).format('MMM DD')}`,
          }))}
          defaultValue={`Day ${defaultIndex + 1}, ${moment(options[defaultIndex].date).format('MMM DD')}`}
          selectChange={(value, index) => {
            onDayChange(index);
          }}
        />
      </div>
    </>
  );
};

export default PlanChangeDay;
