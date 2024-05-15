/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
// import Model from '@tripian/model';
import moment from 'moment';
import DatePicker from '../../../../../components/DatePicker/DatePicker';
import NumberCounter from '../../../../../components/base/NumberCounter/NumberCounter';
import classes from './BbTourInfoForm.scss';

interface IBbTourInfoForm {
  arrivalDatetime: string;
  departureDatetime: string;
  date: moment.Moment;
  showNotFoundMessage?: boolean;
  onChangeDate: (date: moment.Moment) => void;
  onChangeNumberOfAdults: (adult: number) => void;
  onChangeNumberOfChildren: (children: number) => void;
  numberOfAdults: number;
  numberOfChildren: number;
}

const BbTourInfoForm: React.FC<IBbTourInfoForm> = ({ arrivalDatetime, departureDatetime, date, showNotFoundMessage, onChangeDate, onChangeNumberOfAdults, onChangeNumberOfChildren, numberOfAdults, numberOfChildren }) => {
  moment.locale(window.twindow.langCode);

  return (
    <div className={classes.bbTourInfoForm}>
      <div>
        <h3 className={classes.bbTourInfoFormHeader}>Select participants and date</h3>
        <ul className={classes.bbTourInfoFormList}>
          <li className={classes.bbTourInfoFormListItem}>
            <div className={classes.bbTourInfoDatePicker}>
              <DatePicker
                currentDate={date}
                startDate={moment(arrivalDatetime).subtract(1, 'days')}
                endDate={moment(departureDatetime)}
                onchanged={(cdate: moment.Moment | null) => {
                  if (cdate) onChangeDate(cdate);
                }}
              />
            </div>
          </li>

          <li className={classes.bbTourInfoFormListItem}>
            <div className={classes.bbTourInfoPersonAge}>Age: 18 - 120</div>
            <div className={classes.bbTourInfoPersonCount}>
              <h4 className={classes.bbTourInfoPersonCountText}>
                <div>Adult</div>
              </h4>
              <NumberCounter defaultValue={numberOfAdults} minValue={1} maxValue={10} onchange={(num: number) => onChangeNumberOfAdults(num)} />
            </div>
          </li>

          <li className={classes.bbTourInfoFormListItem}>
            <div className={classes.bbTourInfoPersonAge}>Age: 5 - 17</div>
            <div className={classes.bbTourInfoPersonCount}>
              <h4 className={classes.bbTourInfoPersonCountText}>
                <div>Children</div>
              </h4>
              <NumberCounter defaultValue={numberOfChildren} minValue={1} maxValue={10} onchange={(num: number) => onChangeNumberOfChildren(num)} />
            </div>
          </li>
        </ul>
      </div>
      {showNotFoundMessage ? (
        <li>
          <div className={`${classes.offersNotFoundMessage} center mt5`}>Tour not found for selected date.</div>
        </li>
      ) : null}
    </div>
  );
};

export default BbTourInfoForm;
