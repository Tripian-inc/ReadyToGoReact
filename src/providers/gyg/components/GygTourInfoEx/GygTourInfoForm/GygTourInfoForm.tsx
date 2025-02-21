/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import Model, { Providers } from '@tripian/model';
import moment from 'moment';
import DatePicker from '../../../../../components/DatePicker/DatePicker';
import NumberCounter from '../../../../../components/base/NumberCounter/NumberCounter';
import Button from '../../../../../components/base/Button/Button';
import RatingStars from '../../../../../components/RatingStars/RatingStars';
import classes from './GygTourInfoForm.scss';

interface IGygTourInfoForm {
  initialDate: string;
  adultCount: number;
  startDate: string;
  endDate: string;
  childrenCount?: number;
  tour: Providers.Gyg.Tour;
  tourOptionDetails?: Providers.Gyg.TourOptionDetails[];
  bookingInfo?: Providers.Gyg.TourBooking;
  loading?: boolean;
  savingRate?: number;
  tourInfoFormCallback: (date: string, adultCount: number, tourId: number, childrenCount?: number) => void;
  t: (value: Model.TranslationKey) => string;
}

const GygTourInfoForm: React.FC<IGygTourInfoForm> = ({ tour, initialDate, startDate, endDate, adultCount, childrenCount, tourOptionDetails, savingRate, tourInfoFormCallback, t }) => {
  moment.locale(window.twindow.langCode);

  const [tourInfoForm, setTourInfoForm] = useState<{ date: string; adultCount: number; childrenCount?: number; optionId?: number }>({
    date: moment() > moment(initialDate) ? moment().format('YYYY-MM-DDTHH:mm:ss') : moment(initialDate).format('YYYY-MM-DDTHH:mm:ss'),
    adultCount,
    childrenCount,
  });

  return (
    <div className={classes.gygTourInfoForm}>
      <ul>
        <li>
          {savingRate ? <span className={classes.gygTourInfoDiscountText}>Save up to {savingRate}%</span> : null}
          <div className={classes.gygTourInfoPriceContent}>
            <span className={classes.gygTourInfoPrice}>
              <span>
                <b>${tour.price ? tour.price.values.amount : 0}</b> {t('trips.myTrips.localExperiences.tourDetails.experience.perPerson')}
              </span>
              <br />
            </span>
          </div>
          <div className={classes.gygTourInfoRatingStars}>
            <RatingStars rating={(tour.overall_rating * 20).toString()} />
            <span className={classes.gygTourInfoReviews}>({tour.number_of_ratings})</span>
          </div>
        </li>
        <li>
          <div className={classes.gygTourInfoDatePicker}>
            <DatePicker
              currentDate={moment(tourInfoForm.date)}
              startDate={moment(startDate).subtract(1, 'days')}
              endDate={moment(endDate)}
              onchanged={(date) => {
                if (date) {
                  const newTourInfoForm = { ...tourInfoForm };
                  newTourInfoForm.date = moment(date).format('YYYY-MM-DDTHH:mm:ss');
                  newTourInfoForm.optionId = undefined;
                  setTourInfoForm(newTourInfoForm);

                  tourInfoFormCallback(newTourInfoForm.date, newTourInfoForm.adultCount, tour.tour_id, newTourInfoForm.childrenCount);
                }
              }}
            />
          </div>
        </li>
        <li>
          <div className={classes.gygTourInfoPersonCount}>
            <span className={classes.gygTourInfoPersonCountText}>Adults:</span>
            <NumberCounter
              defaultValue={tourInfoForm.adultCount}
              minValue={1}
              maxValue={10}
              onchange={(value) => {
                setTourInfoForm({ ...tourInfoForm, adultCount: value, optionId: undefined });
                tourInfoFormCallback(tourInfoForm.date, value, tour.tour_id, tourInfoForm.childrenCount);
              }}
            />
          </div>
        </li>
        <li>
          <div className={classes.gygTourInfoPersonCount}>
            <span className={classes.gygTourInfoPersonCountText}>Children:</span>
            <NumberCounter
              defaultValue={tourInfoForm.childrenCount}
              minValue={0}
              maxValue={10}
              onchange={(value) => {
                setTourInfoForm({ ...tourInfoForm, childrenCount: value, optionId: undefined });
                tourInfoFormCallback(tourInfoForm.date, tourInfoForm.adultCount, tour.tour_id, value);
              }}
            />
          </div>
        </li>
        <li>
          <div className={classes.gygTourInfoButton}>
            <Button
              text="SEARCH"
              color="danger"
              onClick={() => {
                tourInfoFormCallback(tourInfoForm.date, tourInfoForm.adultCount, tour.tour_id, tourInfoForm.childrenCount);
                setTourInfoForm({ ...tourInfoForm, optionId: undefined });
              }}
              style={{ width: '100%' }}
            />
          </div>
        </li>
        <li>{tourOptionDetails && tourOptionDetails.length === 0 && <span className="center">Tour not available</span>}</li>
      </ul>
    </div>
  );
};

export default GygTourInfoForm;
