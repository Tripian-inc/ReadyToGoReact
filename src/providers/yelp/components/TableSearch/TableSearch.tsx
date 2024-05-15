/* eslint-disable import/no-extraneous-dependencies */
// eslint-disable-next-line import/no-extraneous-dependencies
import React, { useState } from 'react';
import moment from 'moment';
import DatePicker from '../../../../components/DatePicker/DatePicker';
import Dropdown from '../../../../components/base/Dropdown/Dropdown';
import Button from '../../../../components/base/Button/Button';
import { yelpHourRangeOptions, peopleCountOptions } from '../helper';

interface ITableSearch {
  tableSearchCallback: (date: string, time: string, covers: number) => void;
  stepDate: string;
  covers: number;
  defaultHour: string;
}

const TableSearch: React.FC<ITableSearch> = ({ tableSearchCallback, stepDate, covers, defaultHour }) => {
  moment.locale(window.twindow.langCode);

  const [searchState, setSearchState] = useState<{ date: string; time: string; covers: number }>({
    date: moment() > moment(stepDate) ? moment().format('YYYY-MM-DD') : stepDate,
    time: defaultHour,
    covers: covers > 7 ? 7 : covers,
  });

  return (
    <div className="row mb0">
      <div className="col col12 col3-m">
        <DatePicker
          currentDate={moment(searchState.date)}
          onchanged={(date) => {
            if (date) {
              const newSearchState = { ...searchState };
              newSearchState.date = date.toString();
              setSearchState(newSearchState);
            }
          }}
        />
      </div>
      <div className="col col6 col3-m">
        <Dropdown
          options={yelpHourRangeOptions}
          defaultValue={searchState.time}
          selectChange={(value) => {
            const newSearchState = { ...searchState };
            newSearchState.time = value as string;
            setSearchState(newSearchState);
          }}
        />
      </div>
      <div className="col col6 col3-m">
        <Dropdown
          options={peopleCountOptions}
          defaultValue={searchState.covers}
          selectChange={(value) => {
            const newSearchState = { ...searchState };
            newSearchState.covers = +value;
            setSearchState(newSearchState);
          }}
        />
      </div>
      <div className="col col12 col3-m center">
        <Button
          color="primary"
          text="Find a Table"
          onClick={() => {
            tableSearchCallback(searchState.date, searchState.time, searchState.covers);
          }}
        />
      </div>
    </div>
  );
};

export default TableSearch;
