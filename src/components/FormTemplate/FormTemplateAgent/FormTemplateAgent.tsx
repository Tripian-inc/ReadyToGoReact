/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useMemo, useState } from 'react';
import Model, { helper } from '@tripian/model';
import moment from 'moment';
import classes from './FormTemplateAgent.scss';
import RSelect, { RSelectOption } from '../../base/RSelect/RSelect';
import DateRangePicker from '../../DateRangePicker/DateRangePicker';
import Dropdown from '../../base/Dropdown/Dropdown';
import TextField from '../../base/TextField/TextField';

interface IFormTemplateAgent {
  uniqueUserId: string;
  tripProfile: Model.TripProfile;
  cities: Array<Model.City>;
  callbackFormTemplateAgent: (tripProfile: Model.TripProfile) => void;
}

const FormTemplateAgent: React.FC<IFormTemplateAgent> = ({ uniqueUserId, tripProfile, cities, callbackFormTemplateAgent }) => {
  const [tripProfileState, setTripProfileState] = useState(tripProfile);

  const timeOptions = helper.timeRange.map((t) => ({
    key: undefined,
    value: t,
  }));

  const callbackDateRangePicker = (startDate: moment.Moment, endDate: moment.Moment) => {
    moment.locale(window.twindow.langCode);

    const newTripProfile = { ...tripProfileState };
    const notUtcStartDate = startDate.utcOffset(0);
    const notUtcEndDate = endDate.utcOffset(0);
    const newStartDate = { year: +notUtcStartDate.format('YYYY'), month: +notUtcStartDate.format('MM') - 1, day: +notUtcStartDate.format('DD') };
    const newEndDate = { year: +notUtcEndDate.format('YYYY'), month: +notUtcEndDate.format('MM') - 1, day: +notUtcEndDate.format('DD') };

    newTripProfile.arrivalDatetime = moment(newTripProfile.arrivalDatetime)
      .set({
        year: newStartDate.year,
        month: newStartDate.month,
        date: newStartDate.day,
      })
      .utcOffset(0)
      .format('YYYY-MM-DDTHH:mm:ss[Z]');

    newTripProfile.departureDatetime = moment(newTripProfile.departureDatetime)
      .set({
        year: newEndDate.year,
        month: newEndDate.month,
        date: newEndDate.day,
      })
      .utcOffset(0)
      .format('YYYY-MM-DDTHH:mm:ss[Z]');

    setTripProfileState(newTripProfile);
    callbackFormTemplateAgent(newTripProfile);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const callbackArrivalDateTime = (arrivalTime: string | number, _index: number) => {
    const newTripProfile = { ...tripProfileState };
    newTripProfile.arrivalDatetime = moment(newTripProfile.arrivalDatetime)
      .set({ hour: +arrivalTime.toString().slice(0, 2), minute: +arrivalTime.toString().slice(3, 5) })
      .format('YYYY-MM-DDTHH:mm:ss[Z]');
    setTripProfileState(newTripProfile);
    callbackFormTemplateAgent(newTripProfile);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const callbackDepartureDateTime = (departureTime: string | number, _index: number) => {
    const newTripProfile = { ...tripProfileState };
    newTripProfile.departureDatetime = moment(newTripProfile.departureDatetime)
      .set({ hour: +departureTime.toString().slice(0, 2), minute: +departureTime.toString().slice(3, 5) })
      .format('YYYY-MM-DDTHH:mm:ss[Z]');
    setTripProfileState(newTripProfile);
    callbackFormTemplateAgent(newTripProfile);
  };

  const callbackCitySelect = (selectedOption: RSelectOption) => {
    const newTripProfile = helper.deepCopy(tripProfileState);

    if (selectedOption) {
      newTripProfile.cityId = +selectedOption.value;
      newTripProfile.accommodation = null;
      setTripProfileState(newTripProfile);
      callbackFormTemplateAgent(newTripProfile);
    }
  };

  const citiesOptions: RSelectOption[] = useMemo(
    () =>
      cities
        .sort((a, b) => helper.compareStringForSort(a.name, b.name))
        .map((city) => ({
          value: city.id.toString(),
          label: city.name,
        })),
    [cities],
  );

  return (
    <>
      <div className="row">
        <div className="col col12">
          <h4 className="my2">Unique User Id</h4>
          <TextField type="text" name="uniqueUserId" disabled value="" placeholder={uniqueUserId} onChange={() => {}} />
        </div>
        <div className="col col12 col12-m">
          <h4 className="my2">Destination {!tripProfileState.cityId ? <span style={{ color: ' #ff0000' }}> * </span> : null}</h4>
          <RSelect options={citiesOptions} selectedOptionValue={tripProfileState.cityId.toString()} onSelectedOptionChange={callbackCitySelect} />
        </div>
        <div className="col col12 col6-m">
          <h4 className="my2">
            Trip Dates
            {moment(tripProfileState.arrivalDatetime).utcOffset(0) < moment().utcOffset(0) ? <span style={{ color: ' #ff0000' }}> *</span> : null}
          </h4>
          <DateRangePicker
            currentDateRange={
              moment(tripProfileState.arrivalDatetime).utcOffset(0) < moment().utcOffset(0)
                ? { startDate: null as any, endDate: null as any }
                : {
                    startDate: moment(tripProfileState.arrivalDatetime).utcOffset(0),
                    endDate: moment(tripProfileState.departureDatetime).utcOffset(0),
                  }
            }
            onchanged={callbackDateRangePicker}
          />
        </div>
        <div className="col col6 col3-m">
          <h4 className={`my2 ${classes.header}`}>Start Time</h4>
          <Dropdown options={timeOptions} defaultValue={`${moment(tripProfileState.arrivalDatetime).utcOffset(0).format('HH')}:${moment(tripProfileState.arrivalDatetime).utcOffset(0).format('mm')}`} selectChange={callbackArrivalDateTime} />
        </div>
        <div className="col col6 col3-m">
          <h4 className={`my2 ${classes.header}`}>End Time</h4>
          <Dropdown options={timeOptions} defaultValue={`${moment(tripProfileState.departureDatetime).utcOffset(0).format('HH')}:${moment(tripProfileState.departureDatetime).utcOffset(0).format('mm')}`} selectChange={callbackDepartureDateTime} />
        </div>
      </div>
    </>
  );
};

export default FormTemplateAgent;
