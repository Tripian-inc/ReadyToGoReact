/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import Model, { Providers } from '@tripian/model';
import GygTourInfoText from './GygTourInfoText/GygTourInfoText';
import GygTourInfoImage from './GygTourInfoImage/GygTourInfoImage';
import GygTourInfoForm from './GygTourInfoForm/GygTourInfoForm';
import classes from './GygTourInfo.scss';
import CloseIconButton from '../../../../components/base/Button/Icons/CloseIconButton/CloseIconButton';
import GygTourOption from './GygTourInfoForm/GygTourOption/GygTourOption';
import GygTourShoppingForm from './GygTourInfoForm/GygTourShoppingForm/GygTourShoppingForm';
import PreLoading from '../../../../components/base/PreLoading/PreLoading';
import Accordion from '../../../../components/base/Accordion/Accordion';

interface IGygTourInfo {
  initialDate: string;
  adultCount: number;
  startDate: string;
  endDate: string;
  childrenCount?: number;
  tour: Providers.Gyg.Tour;
  showCloseButton?: boolean;
  tourOptionDetails?: Providers.Gyg.TourOptionDetails[];
  bookingInfo?: Providers.Gyg.TourBooking;
  loading?: boolean;
  user?: Model.User;
  close: () => void;
  tourInfoFormCallback: (date: string, adultCount: number, tourId: number, childrenCount?: number) => void;
  bookingClick: (bookingRequest: Providers.Gyg.TourBookingRequest) => void;
  paymentClick: (data: Providers.Gyg.TourShoppingFormData) => void;
  t: (value: Model.TranslationKey) => string;
}

const GygTourInfo: React.FC<IGygTourInfo> = ({ initialDate, adultCount, startDate, endDate, tour, childrenCount, tourOptionDetails, showCloseButton = true, bookingInfo, loading, user, close, tourInfoFormCallback, bookingClick, paymentClick, t }) => {
  const [selectedOptionId, setSelectedOptionId] = useState<number>();

  const myRef = React.createRef<HTMLDivElement>();

  const renderTourOptionDetails = (): JSX.Element | undefined => {
    if (tourOptionDetails && tourOptionDetails.length > 0) {
      return (
        <>
          <hr className="mb6" style={{ opacity: 0.2 }} />
          {/* <h3 className="center">Available Options</h3> */}
          <div className="row m0 p4">
            {tourOptionDetails.map((td, index) => (
              <Accordion
                id={index.toString()}
                key={`${td.option.option_id}-tour-option}`}
                title={td.option.title}
                onClick={() => {
                  setSelectedOptionId(td.option.option_id);
                }}
                content={
                  <GygTourOption
                    key={td.option.option_id.toString()}
                    tourOption={td.option}
                    availabilities={td.availabilities}
                    pricings={td.pricings}
                    adultCount={adultCount}
                    childrenCount={childrenCount}
                    isSelected={td.option.option_id === selectedOptionId}
                    bookingRequestCallback={bookingClick}
                  />
                }
              />
            ))}
          </div>
        </>
      );
    }
    return undefined;
  };

  const renderShoppingForm = (): JSX.Element | undefined => {
    if (bookingInfo) {
      return (
        <div className="p4">
          <GygTourShoppingForm
            clicked={(data: Providers.Gyg.TourShoppingFormData) => {
              paymentClick(data);
              myRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
            }}
            user={user}
          />
        </div>
      );
    }
    return undefined;
  };

  return (
    <div className={classes.gygTourInfoMain}>
      <div className="row pt4 mb0">
        <h1 className={classes.gygTourInfoTitle}>{tour.title}</h1>
        {showCloseButton && (
          <div className={`${classes.gygTourInfoImgClose}`}>
            <CloseIconButton
              fill="#fff"
              clicked={() => {
                close();
              }}
            />
          </div>
        )}
        <div className={`col col12 col7-m ${classes.GygTourInfoImageMatch}`}>
          <GygTourInfoImage tourImage={tour.pictures} />
        </div>
        <div className="col col12 col5-m">
          <GygTourInfoForm
            tour={tour}
            initialDate={initialDate}
            adultCount={adultCount}
            childrenCount={childrenCount}
            tourOptionDetails={tourOptionDetails}
            bookingInfo={bookingInfo}
            tourInfoFormCallback={(date: string, adultC: number, tourId: number, childrenC?: number | undefined) => {
              tourInfoFormCallback(date, adultC, tourId, childrenC);
              setSelectedOptionId(undefined);
            }}
            loading={loading}
            startDate={startDate}
            endDate={endDate}
            savingRate={tour.price?.values.special?.savings}
            t={t}
          />
        </div>
        <div ref={myRef} className="col col12 mb0">
          <div>{renderTourOptionDetails()}</div>

          <div className="mt5">{renderShoppingForm()}</div>
        </div>
        <div className="col col12 mb0">
          <GygTourInfoText tour={tour} />
        </div>
      </div>
      {loading && (
        <div className={classes.bookingLoading}>
          <PreLoading bgColor="rgba(238, 238, 238, 0.8)" customClass={classes.formMainDivLoading} />
        </div>
      )}
    </div>
  );
};
export default GygTourInfo;
