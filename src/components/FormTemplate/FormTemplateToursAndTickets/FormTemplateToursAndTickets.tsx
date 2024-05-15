/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import Model, { helper } from '@tripian/model';
import moment from 'moment';
import React, { useMemo } from 'react';
import DestinationSelect, { RSelectOption } from '../../DestinationSelect/DestinationSelect';
import Required from '../../base/Required/Required';
import NumberCounter from '../../base/NumberCounterNew/NumberCounter';
import DateRangePicker from '../../DateRangePicker/DateRangePicker';
import Button from '../../base/Button/Button';
import classes from './FormTemplateToursAndTickets.scss';

interface IFormTemplateToursAndTickets {
  destinations: { destinationId: number; destinationName: string; parentName: string }[];
  toursAndTicketsProfile: Model.TourAndTickets;
  setToursAndTicketsProfile: (toursAndTicketsProfile: Model.TourAndTickets) => void;
  onSubmit: () => void;
  onCancel: () => void;
  t: (value: Model.TranslationKey) => string;
}

const FormTemplateToursAndTickets: React.FC<IFormTemplateToursAndTickets> = ({ toursAndTicketsProfile, destinations, setToursAndTicketsProfile, onSubmit, onCancel, t }) => {
  moment.locale(window.twindow.langCode);

  const destinationOptions: RSelectOption[] = useMemo(
    () =>
      destinations
        .sort((a, b) => helper.compareStringForSort(a.destinationName, b.destinationName))
        .map((d) => ({
          id: d.destinationId,
          label: `${d.destinationName} - ${d.parentName}`,
          payload: d,
          isSelected: d.destinationId === toursAndTicketsProfile.cityId,
        })),
    [destinations, toursAndTicketsProfile.cityId],
  );

  const callbackCitySelect = (selectedOption: RSelectOption) => {
    const newToursAndTicketsProfile = helper.deepCopy(toursAndTicketsProfile);
    newToursAndTicketsProfile.cityId = +selectedOption.id;
    newToursAndTicketsProfile.cityName = selectedOption.payload.destinationName;
    setToursAndTicketsProfile(newToursAndTicketsProfile);
  };

  const callbackDateRangePicker = (startDate: moment.Moment, endDate: moment.Moment) => {
    const newToursAndTicketsProfile = helper.deepCopy(toursAndTicketsProfile);
    newToursAndTicketsProfile.arrivalDatetime = startDate.format('YYYY-MM-DD');
    newToursAndTicketsProfile.departureDatetime = endDate.format('YYYY-MM-DD');
    setToursAndTicketsProfile(newToursAndTicketsProfile);
  };

  const callbackAdultsNumber = (num: number) => {
    const newToursAndTicketsProfile = { ...toursAndTicketsProfile };
    newToursAndTicketsProfile.adult = num;
    setToursAndTicketsProfile(newToursAndTicketsProfile);
  };

  const callbackChildrenNumber = (num: number) => {
    const newToursAndTicketsProfile = { ...toursAndTicketsProfile };
    newToursAndTicketsProfile.children = num;
    setToursAndTicketsProfile(newToursAndTicketsProfile);
  };

  return (
    <div>
      <div className="row">
        <div className="col col12 mb10">
          <div className="row m0 center">
            <div className="col col12 col5-m">
              <div className={`col col12 px0 mb4 ${classes.content}`}>
                <h4 className="m0">{t('trips.toursAndTickets.destination.label')}</h4>
                {!toursAndTicketsProfile.cityId ? <Required customClassName="mb0" /> : null}
              </div>
              <div className={classes.alignStart}>
                <DestinationSelect options={destinationOptions} selectedOptionId={toursAndTicketsProfile.cityId} onSelectedOptionChange={callbackCitySelect} placeHolder="Select destination from list" />
              </div>
            </div>
            <div className="col col12 col5-m">
              <div className={`col col12 px0 mb4 ${classes.content}`}>
                <h4 className="m0">{t('trips.toursAndTickets.dates')}</h4>
                {moment(toursAndTicketsProfile.arrivalDatetime).utcOffset(0) < moment().utcOffset(0) ? <Required customClassName="mb0" /> : null}
              </div>
              <DateRangePicker
                currentDateRange={{
                  startDate: moment(toursAndTicketsProfile.arrivalDatetime),
                  endDate: moment(toursAndTicketsProfile.departureDatetime),
                }}
                onchanged={callbackDateRangePicker}
              />
            </div>
          </div>
        </div>
        <div className="col col12 mb10">
          <div className="row m0 center">
            <div className="col col12 col5-m">
              <div className={`col col12 px0 mb4 ${classes.content}`}>
                <h4 className="m0">{t('trips.toursAndTickets.adults.title')}</h4>
              </div>
              <NumberCounter header={t('trips.toursAndTickets.adults.label')} defaultValue={toursAndTicketsProfile.adult || 1} minValue={1} maxValue={20} onChange={callbackAdultsNumber} />
            </div>

            <div className="col col12 col5-m">
              <div className={`col col12 px0 mb4 ${classes.content}`}>
                <h4 className="m0">{t('trips.toursAndTickets.children.title')}</h4>
              </div>
              <NumberCounter header={t('trips.toursAndTickets.children.label')} defaultValue={toursAndTicketsProfile.children || 0} minValue={0} maxValue={20} onChange={callbackChildrenNumber} />
            </div>
          </div>
        </div>

        <div className="col col12 mb0">
          <div className="row center m0">
            <div className="col col6 p0">
              <Button text={t('trips.toursAndTickets.cancel')} color="primary" onClick={onCancel} />
            </div>
            <div className="col col6 p0">
              <Button disabled={toursAndTicketsProfile.cityId === 0} text={t('trips.toursAndTickets.submit')} color="primary" onClick={onSubmit} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormTemplateToursAndTickets;
