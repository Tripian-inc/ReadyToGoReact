/* eslint-disable import/no-extraneous-dependencies */
import React, { useMemo, useState } from 'react';
import Model, { helper, Providers } from '@tripian/model';
import moment from 'moment';
import isoLanguages from './isoLanguages';
import RSelect from '../../../../../components/base/RSelect/RSelect';
import TextField from '../../../../../components/base/TextField/TextField';
import Button from '../../../../../components/base/Button/Button';
import classes from './GygTourOption.scss';

interface IGygTourOption {
  tourOption: Providers.Gyg.TourDataOption;
  availabilities: Providers.Gyg.TourDataOptionAvailability[];
  priceTotal: number;
  adultCount: number;
  childrenCount?: number;
  bookingRequestCallback: (bookingRequest: any) => void;
  t: (value: Model.TranslationKey) => string;
}

const GygTourOption: React.FC<IGygTourOption> = ({ tourOption, availabilities, priceTotal, adultCount, childrenCount, bookingRequestCallback, t }) => {
  const [bookingParameters, setBookingParameters] = useState<Array<{ mandatory: boolean; name: string; value_1?: string; value_2?: string }>>(tourOption.booking_parameter);
  const [startingTime, setStartingTime] = useState<string>(availabilities[0].start_time);
  const [languageOption, setLanguageOption] = useState<string>();

  moment.locale(window.twindow.langCode);

  let totalPrice = priceTotal;

  const savingRate = tourOption.price.values.special?.savings;

  if (savingRate) {
    const savingPrice = Number(((totalPrice / 100) * savingRate).toFixed(2));
    totalPrice -= savingPrice;
  }

  const isButtonDisabled = useMemo(() => {
    if (bookingParameters.length > 0) {
      const requiredBookingParameters = bookingParameters.filter((bp) => bp.mandatory === true);
      if (requiredBookingParameters.length > 0) {
        return !requiredBookingParameters.every((bp) => bp.value_1);
      }
      return false;
    }
    return false;
  }, [bookingParameters]);

  const renderParameters = (): JSX.Element | undefined => {
    if (tourOption.booking_parameter.length > 0) {
      const languageOptionArray: { type: string; language: string; label: string }[] = [];

      if (tourOption.cond_language && tourOption.cond_language.language_audio.length > 0) {
        tourOption.cond_language.language_audio.forEach((lo) => {
          languageOptionArray.push({ type: 'language_audio', language: lo, label: `${isoLanguages.find((iso) => iso.code === lo)?.name || ''}(Audio)` });
        });
      }

      if (tourOption.cond_language && tourOption.cond_language.language_booklet.length > 0) {
        tourOption.cond_language.language_booklet.forEach((lo) => {
          languageOptionArray.push({ type: 'language_booklet', language: lo, label: `${isoLanguages.find((iso) => iso.code === lo)?.name || ''}(Booklet)` });
        });
      }

      if (tourOption.cond_language && tourOption.cond_language.language_live.length > 0) {
        tourOption.cond_language.language_live.forEach((lo) => {
          languageOptionArray.push({ type: 'language_live', language: lo, label: `${isoLanguages.find((iso) => iso.code === lo)?.name || ''}(Live)` });
        });
      }

      const bookingParametersIndex = bookingParameters.findIndex((bp) => bp.value_1 || bp.value_2);

      if (bookingParametersIndex < 0 && languageOptionArray.length > 0) {
        const newBookingParameters = helper.deepCopy(bookingParameters);

        newBookingParameters[0] = {
          mandatory: tourOption.booking_parameter[0].mandatory,
          value_1: languageOptionArray[0].type,
          value_2: languageOptionArray[0].language,
          name: 'language',
        };
        setLanguageOption(languageOptionArray[0].language);
        setBookingParameters(newBookingParameters);
      }

      return (
        <div>
          {tourOption.booking_parameter.map((bp, index) => {
            if (bp.name === 'language') {
              return (
                <div key={`tour-option-1-${bp.name}`}>
                  <h4 className={classes.parameters}>
                    {bp.name} {bp.mandatory ? '(*)' : ''}
                  </h4>
                  {languageOptionArray.length > 0 && (
                    <RSelect
                      options={languageOptionArray.map((lg) => ({
                        value: lg.language,
                        label: lg.label,
                      }))}
                      selectedOptionValue={languageOption}
                      onSelectedOptionChange={(selectedOption) => {
                        const newBookingParameters = helper.deepCopy(bookingParameters);

                        newBookingParameters[index] = {
                          mandatory: bp.mandatory,
                          value_1: languageOptionArray[index].type,
                          value_2: selectedOption.value,
                          name: 'language',
                        };
                        setLanguageOption(selectedOption.value);
                        setBookingParameters(newBookingParameters);
                      }}
                    />
                  )}
                </div>
              );
            }

            return (
              <div key={`tour-option-2-${bp.name}`}>
                <h4 className={classes.parameters}>
                  {bp.description || bp.name} {bp.mandatory ? '(*)' : ''}
                </h4>
                <TextField
                  type="text"
                  name={bp.name}
                  value={bookingParameters[index]?.value_1 || ''}
                  onChange={(event) => {
                    const newBookingParameters = helper.deepCopy(bookingParameters);

                    newBookingParameters[index] = {
                      mandatory: bp.mandatory,
                      value_1: event.target.value,
                      name: bp.name,
                    };

                    setBookingParameters(newBookingParameters);
                  }}
                />
              </div>
            );
          })}
        </div>
      );
    }
    return undefined;
  };

  const addToChart = () => {
    const bookingRequest = {
      base_data: {
        cnt_language: 'en',
        currency: 'usd',
      },
      data: {
        booking: {
          bookable: {
            external_reference_id: 'tripian',
            option_id: tourOption.option_id,
            datetime: startingTime,
            price: totalPrice,
            categories: [
              {
                category_id: 1,
                number_of_participants: adultCount,
              },
            ],
            booking_parameters: bookingParameters.filter((bp) => bp.value_1 || bp.value_2),
          },
        },
      },
    };

    const newBookingRequest = { ...bookingRequest };

    if (childrenCount && childrenCount > 0) {
      newBookingRequest.data.booking.bookable.categories.push({
        category_id: 3,
        number_of_participants: childrenCount,
      });
    }

    bookingRequestCallback(newBookingRequest);
  };

  return (
    <div className={classes.mainDiv}>
      <h4 className={classes.optionDiv}>{tourOption.title}</h4>
      <div className={classes.optionDiv}>
        <h4 className={classes.parameters}>{t('trips.myTrips.localExperiences.tourDetails.startingTime')} (*)</h4>
        {/* {moment(startingTime).format("LT")} */}
      </div>
      <RSelect
        selectedOptionValue={startingTime}
        options={availabilities.map((availability) => ({
          value: availability.start_time,
          label: moment(availability.start_time).format('LT'),
        }))}
        onSelectedOptionChange={(selectedOption) => {
          setStartingTime(selectedOption.value);
        }}
      />
      {renderParameters()}
      {/* <div className={classes.optionDiv}>
        Adult x {adultCount} : ${adultPrice.toFixed(2)}
      </div>
      {childrenCount && childrenCount > 0 && childrenPrice > 0 ? (
        <div className={classes.optionDiv}>
          Children x {childrenCount} : ${childrenPrice.toFixed(2)}
        </div>
      ) : null} */}
      <div className={classes.optionDiv}>
        <div className={classes.totalPriceDiv}>
          <div>
            {t('trips.myTrips.localExperiences.tourDetails.totalPrice')} :
            {savingRate ? (
              <>
                <span style={{ textDecoration: 'line-through' }} className="mr1">
                  ${priceTotal.toFixed(2)}
                </span>
                <span className={classes.totalPriceText}>${totalPrice.toFixed(2)}</span>
              </>
            ) : (
              <span className={classes.totalPriceText}>${totalPrice.toFixed(2)}</span>
            )}
          </div>
          {savingRate && (
            <div className={classes.savingRate}>
              {t('trips.myTrips.localExperiences.tourDetails.saveUpTo')} {savingRate}%
            </div>
          )}
        </div>

        <div className={classes.feeText}>({t('trips.myTrips.localExperiences.tourDetails.taxesAndFees')})</div>
      </div>
      <div className="center">
        <Button color="primary" disabled={isButtonDisabled} className={classes.addToChartButton} onClick={addToChart} text={t('trips.myTrips.localExperiences.tourDetails.bookNow')} />
      </div>
    </div>
  );
};

export default GygTourOption;
