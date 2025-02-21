/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import Model, { Providers } from '@tripian/model';
import moment from 'moment';
import TableSearch from '../TableSearch/TableSearch';
import OpeningsSelection from '../OpeningsSelection/OpeningsSelection';
import OpeningsForm from '../OpeningsForm/OpeningsForm';
import PreLoading from '../../../../components/base/PreLoading/PreLoading';
import classes from './Booking.scss';

interface IBooking {
  businessId: string;
  poi: Model.Poi;
  stepDate: string;
  stepHour?: string | null;
  userProfileBooking: { firstName: string; lastName: string; email: string; coversCount: number };
  reservationEditData?: Providers.Yelp.ReservationRequest;
  getBusinessInfo: (id: string) => Promise<Providers.Yelp.Business>;
  openingsRequest: (openings: Providers.Yelp.OpeningsRequest) => Promise<Providers.Yelp.Openings>;
  getHoldIt: (hold: Providers.Yelp.HoldRequest) => Promise<Providers.Yelp.Hold>;
  reservationRequest: (reservation: Providers.Yelp.ReservationRequest) => Promise<Providers.Yelp.Reservation>;
  bookingCallback: (provider: string, poi: Model.Poi, bookingDetails: Providers.Yelp.ReservationRequest, response?: Providers.Yelp.Reservation) => void;
  t: (value: Model.TranslationKey) => string;
}

const Booking: React.FC<IBooking> = ({ businessId, poi, stepDate, stepHour, userProfileBooking, reservationEditData, getBusinessInfo, openingsRequest, getHoldIt, reservationRequest, bookingCallback, t }) => {
  moment.locale(window.twindow.langCode);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [businessInfo, setBusinessInfo] = useState<Providers.Yelp.Business>();
  const [openingList, setOpeningList] = useState<Providers.Yelp.Openings>({ reservation_times: [] });
  const [loading, setLoading] = useState<boolean>(true);
  const [responseErrorMessage, setResponseErrorMessage] = useState<string>('');
  const [responseSuccessMessage, setResponseSucessMessage] = useState<string>('');

  const defaultReservationState: Providers.Yelp.ReservationRequest = {
    businessId,
    date: '',
    time: '',
    covers: userProfileBooking.coversCount,
    uniqueId: 'tripian_unique_unknown',
    holdId: '',
    firstName: userProfileBooking.firstName,
    lastName: userProfileBooking.lastName,
    email: userProfileBooking.email,
    phone: '',
  };

  const [reservation, setReservation] = useState<Providers.Yelp.ReservationRequest>(reservationEditData || defaultReservationState);

  useEffect(() => {
    let unmonted = false;
    if (!unmonted) {
      getBusinessInfo(businessId)
        .then((business) => {
          setBusinessInfo(business);
        })
        .catch((err) => {
          setResponseErrorMessage(err.error);
        })
        .finally(() => {
          setLoading(false);
        });

      // if (reservationEditData) {
      //   getHoldIt({
      //     businessId: reservationEditData.businessId,
      //     date: reservationEditData.date,
      //     time: reservationEditData.time,
      //     covers: reservationEditData.covers,
      //     uniqueId: reservationEditData.uniqueId,
      //   })
      //     .then((hold) => {
      //       setReservation((prevState) => ({
      //         ...prevState,
      //         holdId: hold.hold_id,
      //       }));
      //     })
      //     .catch(() => {
      //       setReservation((prevState) => ({
      //         ...prevState,
      //         holdId: '',
      //       }));
      //     })
      //     .then(() => {
      //       setLoading(false);
      //     });
    }

    return () => {
      unmonted = true;
    };
  }, [businessId, getBusinessInfo]);

  const tableSearchCallback = (date: string, time: string, covers: number) => {
    const formattedDate = moment(date).format('YYYY-MM-DD');
    const newReservation = { ...defaultReservationState };
    setResponseErrorMessage('');
    setLoading(true);

    openingsRequest({ businessId, date: formattedDate, time, covers })
      .then((openings) => {
        newReservation.date = formattedDate;
        newReservation.time = time;
        newReservation.covers = covers;
        setReservation(newReservation);
        setOpeningList(openings);
      })
      .catch((err) => {
        setReservation(newReservation);
        setResponseErrorMessage(err.error);
      })
      .then(() => {
        setLoading(false);
      });
  };

  const openingsSelectionCallback = (time: string) => {
    const newReservation = { ...reservation };
    newReservation.time = time;

    setResponseErrorMessage('');
    setLoading(true);
    getHoldIt({ businessId, date: reservation.date, time, covers: reservation.covers, uniqueId: reservation.uniqueId })
      .then((hold) => {
        newReservation.holdId = hold.hold_id;
        setReservation(newReservation);
      })
      .catch((err) => {
        newReservation.holdId = '';
        setResponseErrorMessage(err.error);
        setReservation(newReservation);
      })
      .then(() => {
        setLoading(false);
      });
  };

  const openingsFormCallback = (firstName: string, lastName: string, email: string, phone: string) => {
    const newReservation = { ...reservation };
    newReservation.firstName = firstName;
    newReservation.lastName = lastName;
    newReservation.email = email;
    newReservation.phone = phone;
    setReservation(newReservation);
    setResponseErrorMessage('');
    setLoading(true);

    reservationRequest(newReservation)
      .then((response) => {
        setResponseSucessMessage('Reservation successfully created.');
        bookingCallback(Model.PROVIDER_NAME.YELP, poi, newReservation, response);
      })
      .catch((err) => {
        console.log('err', err);
        setResponseErrorMessage(err.error.description);
        bookingCallback(Model.PROVIDER_NAME.YELP, poi, newReservation);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      {loading ? (
        <div className={classes.loading}>
          <PreLoading bgColor="rgba(238, 238, 238, 0.8)" />
        </div>
      ) : null}
      <div className="row center">
        {!responseSuccessMessage ? (
          <>
            <h3 className="col col12 mb0">{poi.name}</h3>
            <div className="col col12 my5">
              <TableSearch tableSearchCallback={tableSearchCallback} stepDate={stepDate} defaultHour={reservation.time.length > 0 ? reservation.time : stepHour || '14:00'} covers={reservation.covers} t={t} />
            </div>
            {openingList.reservation_times.length > 0 ? (
              <div className="col col12 mb0">
                <OpeningsSelection openingTimes={openingList.reservation_times.find((reservationtime) => reservationtime.date === reservation.date)?.times || []} clicked={openingsSelectionCallback} bookingHour={reservation.time} t={t} />
              </div>
            ) : null}
            {reservation.holdId ? (
              <div className="col col12">
                <OpeningsForm
                  defaultUserInfo={{
                    email: reservation.email,
                    firstName: reservation.firstName,
                    lastName: reservation.lastName,
                    phone: reservation.phone,
                  }}
                  openingsFormCallback={openingsFormCallback}
                  t={t}
                />
              </div>
            ) : null}
            {responseErrorMessage ? (
              <div className="col center">
                <span className={classes.errorMessage}>{responseErrorMessage}</span>
              </div>
            ) : null}
          </>
        ) : (
          <span className={classes.message}>{responseSuccessMessage}</span>
        )}
      </div>
    </>
  );
};

export default Booking;
