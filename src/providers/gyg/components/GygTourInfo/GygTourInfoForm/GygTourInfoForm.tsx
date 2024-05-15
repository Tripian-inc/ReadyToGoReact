/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import moment from 'moment';
import Model, { Providers } from '@tripian/model';
import NumberCounter from '../../../../../components/base/NumberCounter/NumberCounter';
import DatePicker from '../../../../../components/DatePicker/DatePicker';
import classes from './GygTourInfoForm.scss';

interface IGygTourInfoForm {
  formPersonsCategories: Providers.Gyg.TourDataFormPersonsCategory[];
  personsCategories: (Providers.Gyg.TourDataFormPersonsCategory & { count: number })[];
  setPersonsCategories: (personsCategories: (Providers.Gyg.TourDataFormPersonsCategory & { count: number })[]) => void;
  availableDates: string[];
  availableDate?: string;
  setAvailableDate: (availableDate: string) => void;
  t: (value: Model.TranslationKey) => string;
}

const GygTourInfoForm: React.FC<IGygTourInfoForm> = ({ formPersonsCategories, personsCategories, setPersonsCategories, availableDates, availableDate, setAvailableDate, t }) => {
  moment.locale(window.twindow.langCode);
  return (
    <div className={classes.gygTourInfoForm}>
      {availableDates.length === 0 ? (
        <span className={classes.warningMessage}>{t('trips.myTrips.localExperiences.tourDetails.noAvailableDays')}</span>
      ) : (
        <>
          <h3 className={classes.gygTourInfoFormHeader}>{t('trips.myTrips.localExperiences.tourDetails.selectParticipantsAndDate')}</h3>
          <ul className={classes.gygTourInfoFormList}>
            <li className={classes.gygTourInfoFormListItem}>
              <div className={classes.gygTourInfoDatePicker}>
                {availableDate && (
                  <DatePicker
                    currentDate={moment(availableDate)}
                    startDate={moment(availableDates[0])}
                    endDate={moment(availableDates[availableDates.length - 1]).add('day', 1)}
                    onchanged={(date) => {
                      if (date) setAvailableDate(date.format('YYYY-MM-DD'));
                    }}
                  />
                )}
              </div>
            </li>
            {formPersonsCategories
              .filter((x) => x.addon === false)
              .map((formPersonsCategory) => {
                const count: number = personsCategories.find((x) => x.id === formPersonsCategory.id)?.count ?? 0;
                return (
                  <li key={formPersonsCategory.id} className={classes.gygTourInfoFormListItem}>
                    <div className={classes.gygTourInfoPersonAge}>
                      {t('trips.myTrips.localExperiences.tourDetails.age')}: {formPersonsCategory.min_age} - {formPersonsCategory.max_age}
                    </div>
                    <div className={classes.gygTourInfoPersonCount}>
                      <h4 className={classes.gygTourInfoPersonCountText}>
                        <div>{formPersonsCategory.name}</div>
                      </h4>
                      {personsCategories.length > 0 && (
                        <NumberCounter
                          defaultValue={count}
                          minValue={0}
                          maxValue={100}
                          onchange={(newCount) => {
                            const newPersonsCategories = [...personsCategories];
                            const findX = newPersonsCategories.findIndex((x) => x.id === formPersonsCategory.id);
                            if (findX > -1) {
                              newPersonsCategories[findX].count = newCount;
                              setPersonsCategories(newPersonsCategories);
                            }
                          }}
                        />
                      )}
                    </div>
                  </li>
                );
              })}
          </ul>
        </>
      )}
    </div>
  );
};

export default GygTourInfoForm;
