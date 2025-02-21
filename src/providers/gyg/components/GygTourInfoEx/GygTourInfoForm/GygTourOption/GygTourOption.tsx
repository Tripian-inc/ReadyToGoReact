/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import { helper, Providers } from '@tripian/model';
import moment from 'moment';
import Button from '../../../../../../components/base/Button/Button';
import TextField from '../../../../../../components/base/TextField/TextField';
import RSelect from '../../../../../../components/base/RSelect/RSelect';
import isoLanguages from './isoLanguages';
import classes from './GygTourOption.scss';

interface IGygTourOption {
  tourOption: Providers.Gyg.TourOption;
  availabilities: Providers.Gyg.TourAvailabilityEx[];
  pricings?: Providers.Gyg.TourOptionPricing;
  adultCount: number;
  childrenCount?: number;
  isSelected?: boolean;
  bookingRequestCallback: (bookingRequest: any) => void;
}

const GygTourOption: React.FC<IGygTourOption> = ({ tourOption, availabilities, pricings, adultCount, childrenCount, isSelected, bookingRequestCallback }) => {
  const adultPrice = (pricings?.categories.find((ct) => ct.name === 'Adults')?.scale[0].retail_price || 0) * adultCount;
  const childrenPrice = childrenCount ? (pricings?.categories.find((ct) => ct.name === 'Children')?.scale[0].retail_price || 0) * childrenCount : 0;
  const orginalPrice = adultPrice + childrenPrice;

  moment.locale(window.twindow.langCode);

  let totalPrice = adultPrice + childrenPrice;

  const savingRate = tourOption.price.values.special?.savings;

  if (savingRate) {
    const savingPrice = Number(((totalPrice / 100) * savingRate).toFixed(2));
    totalPrice -= savingPrice;
  }

  const [bookingParameters, setBookingParameters] = useState<Array<{ mandatory: boolean; name: string; value_1?: string; value_2?: string }>>(tourOption.booking_parameter);

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
            datetime: availabilities[0].start_time,
            price: totalPrice,
            categories: [
              {
                category_id: pricings?.categories.find((ct) => ct.name === 'Adults')?.id || 0,
                number_of_participants: adultCount,
              },
            ],
            booking_parameters: bookingParameters,
          },
        },
      },
    };

    const newBookingRequest = { ...bookingRequest };

    if (childrenCount && childrenCount > 0 && childrenPrice > 0) {
      newBookingRequest.data.booking.bookable.categories.push({ category_id: pricings?.categories.find((ct) => ct.name === 'Children')?.id || 0, number_of_participants: childrenCount });
    }

    bookingRequestCallback(newBookingRequest);
  };

  const renderParameters = (): JSX.Element | undefined => {
    if (isSelected) {
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

        return (
          <div className="row mt2 mb0">
            {tourOption.booking_parameter.map((bp, index) => {
              if (bp.name === 'language') {
                return (
                  <div className="col col6-m col12">
                    <h4 className={classes.parameters}>
                      {bp.name} {bp.mandatory ? '(*)' : ''}
                    </h4>
                    <RSelect
                      options={languageOptionArray.map((lg) => ({
                        value: lg.language,
                        label: lg.label,
                      }))}
                      onSelectedOptionChange={(selectedOption) => {
                        const newBookingParameters = helper.deepCopy(bookingParameters);

                        newBookingParameters[index] = {
                          mandatory: bp.mandatory,
                          value_1: languageOptionArray[index].type,
                          value_2: selectedOption.value,
                          name: 'language',
                        };

                        setBookingParameters(newBookingParameters);
                      }}
                    />
                  </div>
                );
              }

              return (
                <div className="col col6-m col12">
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
            <div className="col col12 center mb0">
              <Button className={classes.addToChartButton} onClick={addToChart} text="BOOK NOW" />
            </div>
          </div>
        );
      }
    }
    return undefined;
  };

  return (
    <div
      className={classes.mainDiv}
      onClick={() => {
        if (tourOption.booking_parameter.length === 0) {
          addToChart();
        }
      }}
      role="button"
      tabIndex={0}
      onKeyPress={() => {}}
    >
      <h4 className={classes.optionDiv}>{tourOption.title}</h4>
      <div className={classes.optionDiv}>Starting Time : {moment(availabilities[0].start_time).format('LT')}</div>
      <div className={classes.optionDiv}>
        Adult x {adultCount} : ${adultPrice.toFixed(2)}
      </div>
      {childrenCount && childrenCount > 0 && childrenPrice > 0 ? (
        <div className={classes.optionDiv}>
          Children x {childrenCount} : ${childrenPrice.toFixed(2)}
        </div>
      ) : null}
      <div className={classes.optionDiv}>
        <hr className="mb2" style={{ opacity: 0.2 }} />
        <div className={classes.totalPriceDiv}>
          <div>
            Total Price :
            {savingRate ? (
              <>
                <span style={{ textDecoration: 'line-through' }} className="mr1">
                  ${orginalPrice.toFixed(2)}
                </span>
                <span className={classes.totalPriceText}>${totalPrice.toFixed(2)}</span>
              </>
            ) : (
              <span className={classes.totalPriceText}>${totalPrice.toFixed(2)}</span>
            )}
          </div>
          {savingRate && <div className={classes.savingRate}>Save up to {savingRate}%</div>}
        </div>

        <div className={classes.feeText}>(All taxes and fees included)</div>
      </div>
      {renderParameters()}
    </div>
  );
};

export default GygTourOption;
