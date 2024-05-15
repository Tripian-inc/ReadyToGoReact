/* eslint-disable no-restricted-globals */
/* eslint-disable react/no-array-index-key */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useState } from 'react';
import Model from '@tripian/model';
import moment from 'moment';
import PoiInfoImage from './PoiInfoImage/PoiInfoImage';
import PoiInfoText from './PoiInfoText/PoiInfoText';
import TourRefCardProduct from '../TourRefCardProduct/TourRefCardProduct';
import Button from '../base/Button/Button';
import OfferCard from '../OfferCard/OfferCard';
import Feedback from '../FeedBack/FeedBack';
import BUTTON_TYPES from '../base/Button/ButtonTypes';
import classes from './PoiInfo.scss';
import Modal from '../base/Modal/Modal';

const scoreDetailHeaders: string[] = ['Distance', 'Keywords', 'Rating', 'Popularity', 'Crowd'];

interface IPoiInfo {
  score?: number | null;
  scoreDetails?: number[];
  poi: Model.Poi;
  favorite: boolean;
  toggleFavorite: (poi: Model.Poi, willFavorite: boolean) => void;
  addRemoveReplacePoi: (poi: Model.Poi, removeReplaceAdd: number, from?: string, to?: string) => void;
  close: (poi: Model.Poi) => void;
  // Step attributes
  dayNumbers?: number[];
  stepOrder?: number;
  // Alternative
  replace?: boolean;
  hideActionButtons?: boolean;
  hideFavoriteIcon?: boolean;
  planDate?: string;
  bookingButtonClick?: (productId: string, poi: Model.Poi) => void;
  favoriteLoading: boolean;
  reservationUrl?: string;
  hideBookingButton: boolean;
  square?: boolean;
  hideTours: boolean;
  getTourInfo?: (productId: string) => void;
  TOUR_PROVIDER_IDS: Model.PROVIDER_ID[];
  TICKET_PROVIDER_IDS: Model.PROVIDER_ID[];
  RESTAURANT_RESERVATION_PROVIDER_IDS: Model.PROVIDER_ID[];
  myOffers: Model.Poi[];
  isLoadingOffer: (offerId: number) => boolean;
  offerButtonClick: (optIn: boolean, offer: Model.Offer, optInDate: string) => void;
  offerCardClicked?: () => void;
  hideOffers: boolean;
  // offerClicked?: boolean;
  loadingFeedback: boolean;
  feedbackSubjects: Model.FeedbackSubjects[];
  sendFeedback: (value: Model.FeedbackRequest) => Promise<void>;
  placeInfoCallBack?: () => void;
  redeemClicked?: () => void;
  t: (value: Model.TranslationKey) => string;
}

const PoiInfo: React.FC<IPoiInfo> = ({
  score,
  scoreDetails,
  poi,
  favorite,
  toggleFavorite,
  close,
  addRemoveReplacePoi,
  dayNumbers,
  stepOrder = -1,
  replace = false,
  hideActionButtons = false,
  bookingButtonClick,
  planDate,
  favoriteLoading,
  reservationUrl,
  hideBookingButton,
  square = true,
  hideTours,
  getTourInfo,
  TOUR_PROVIDER_IDS,
  TICKET_PROVIDER_IDS,
  RESTAURANT_RESERVATION_PROVIDER_IDS,
  myOffers,
  isLoadingOffer,
  offerButtonClick,
  offerCardClicked,
  hideOffers,
  // offerClicked,
  loadingFeedback,
  feedbackSubjects,
  sendFeedback,
  placeInfoCallBack,
  redeemClicked,
  t,
}) => {
  const [openTours, setOpenTours] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState<boolean>(false);
  const [optInModalWarningMessage, setOptInModalWarningMessage] = useState<string[]>([]);

  const offerRef = React.createRef<HTMLDivElement>();
  const myRef = React.createRef<HTMLDivElement>();

  moment.locale(window.twindow.langCode);

  useEffect(() => {
    let unmonted = false;
    // if (offerClicked) {
    //   offerRef.current?.scrollIntoView({ behavior: 'smooth' });
    // }
    if (!unmonted && openTours) {
      myRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
    }
    return () => {
      unmonted = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openTours]);

  const ticketProviderBooking: Model.Booking | undefined = poi.bookings.find((booking: Model.Booking) => TICKET_PROVIDER_IDS.includes(booking.providerId));
  const ticketProducts: Model.BookingProduct[] = ticketProviderBooking?.products.filter((product) => product.info.includes(Model.BOOKING_PRODUCT_INFO.TICKET)).reverse() ?? [];

  const tourProviderBooking = poi.bookings.find((booking: Model.Booking) => TOUR_PROVIDER_IDS.includes(booking.providerId));
  const tourProducts: Model.BookingProduct[] = tourProviderBooking?.products.filter((product) => !product.info.includes(Model.BOOKING_PRODUCT_INFO.TICKET)) ?? [];

  return (
    <div
      className={classes.poi}
      tabIndex={0}
      role="button"
      onKeyDown={(event) => {
        if (placeInfoCallBack && (event.metaKey || event.ctrlKey) && event.shiftKey && event.code === 'KeyP') placeInfoCallBack();
      }}
    >
      <div className={classes.poiImage}>
        {score ? <div className={classes.stepMatch}>{`${score.toFixed(0)}% ${t('trips.myTrips.itinerary.step.poi.match')}`}</div> : null}
        <PoiInfoImage
          poi={poi}
          close={() => {
            close(poi);
          }}
          square={square}
          hideButtons={false}
          t={t}
        />
        {!isNaN(parseFloat(poi.id)) && (
          <div className={classes.feedback}>
            <Button className={classes.feedbackButton} type={BUTTON_TYPES.TEXT} color="primary" text={t('trips.myTrips.itinerary.step.poi.reportAProblem')} onClick={() => setShowFeedbackModal(true)} />
          </div>
        )}
      </div>
      {scoreDetails && scoreDetails.length > 0 && (
        <div className={classes.scoreDetails}>
          {scoreDetails
            .map((scored, i) => ({ header: scoreDetailHeaders[i], scored }))
            .sort((a, b) => b.scored - a.scored)
            .map((scoreDetail, i) => (
              <li key={`${i}-${scoreDetail.header}`}>
                <b>{scoreDetail.header}</b>: <span>{Math.round(scoreDetail.scored)}</span> <div className={classes.bar} style={{ width: `${Math.round(scoreDetail.scored)}%` }} />
              </li>
            ))}
        </div>
      )}
      <PoiInfoText
        poi={poi}
        hideButtons={false}
        favorite={favorite}
        favoriteLoading={favoriteLoading}
        favoriteClick={(fav: boolean) => {
          toggleFavorite(poi, fav);
        }}
        stepOrder={stepOrder}
        replace={replace}
        addRemoveReplacePoi={addRemoveReplacePoi}
        hideActionButtons={hideActionButtons}
        dayNumbers={dayNumbers}
        planDate={planDate}
        reservationUrl={reservationUrl}
        hideBookingButton={hideBookingButton}
        bookingButtonClick={bookingButtonClick}
        RESTAURANT_RESERVATION_PROVIDER_IDS={RESTAURANT_RESERVATION_PROVIDER_IDS}
        t={t}
      />

      {!hideOffers && poi.offers && poi.offers.length > 0 && (
        <div className="col col12 px5 pb5">
          {/* <h2 className="mb1 mt3">Offers</h2> */}
          {poi.offers.map((offer, i) => {
            const offerStartDate = moment(moment(offer.timeframe?.start).format('YYYY-MM-DD'));
            const offerEndDate = moment(moment(offer.timeframe?.end).format('YYYY-MM-DD'));
            const planDateTimeNow = moment(planDate);

            const canOptIn = planDateTimeNow.isBetween(offerStartDate, offerEndDate, undefined, '[]');
            const planDateTime: string = planDateTimeNow.format('YYYY-MM-DD');

            return (
              <div key={`offer-${i}`} ref={offerRef} className="py2">
                <OfferCard
                  offer={offer}
                  optedIn={myOffers.some((p) => p.offers.some((x) => x.id === offer.id))}
                  isLoadingOffer={isLoadingOffer}
                  optClicked={(optIn: boolean, id: number, optInDate?: string) => {
                    if (canOptIn) offerButtonClick(optIn, offer, optInDate || planDateTime);
                    else setOptInModalWarningMessage([planDateTime, moment(offer.timeframe?.start).format('YYYY-MM-DD'), moment(offer.timeframe?.end).format('YYYY-MM-DD')]);
                  }}
                  cardClicked={offerCardClicked}
                  planDate={planDate}
                  redeemClicked={redeemClicked}
                />
              </div>
            );

            return null;
          })}
          <Modal show={optInModalWarningMessage.length > 0} backdropClick={() => setOptInModalWarningMessage([])}>
            <div className="center py5">
              <h2 className="folt-bold">{t('trips.myTrips.itinerary.step.poi.warning.title')}</h2>
              <div className="m2">
                {t('trips.myTrips.itinerary.step.poi.warning.message1')} {optInModalWarningMessage[0]}.
              </div>
              <div className="m2">
                {t('trips.myTrips.itinerary.step.poi.warning.message2')} {optInModalWarningMessage[1]} {t('trips.myTrips.itinerary.step.poi.warning.and')} {optInModalWarningMessage[2]}.
              </div>
              <div className="mt2 mb3">{t('trips.myTrips.itinerary.step.poi.warning.message3')}</div>
              <Button size="small" type={BUTTON_TYPES.OUTLINED} text="Ok" onClick={() => setOptInModalWarningMessage([])} />
            </div>
          </Modal>
        </div>
      )}

      {!hideTours && (ticketProducts.length > 0 || tourProducts.length > 0) ? (
        <div ref={myRef} className={classes.openTours}>
          <Button
            text={t('trips.myTrips.itinerary.step.poi.tourTicket.buttonText')}
            color="primary"
            onClick={() => {
              setOpenTours(true);
              myRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
            }}
          />
        </div>
      ) : null}

      {openTours && !hideTours && ticketProducts.length > 0 ? (
        <div className="col col12 p5">
          <h2 className="mb1 mt3">{t('trips.myTrips.itinerary.step.poi.tourTicket.ticket.title')}</h2>
          {ticketProducts.map((bookingProduct) => (
            <div key={bookingProduct.id} className="pt4">
              <TourRefCardProduct bookingProduct={bookingProduct} clicked={() => (getTourInfo ? getTourInfo(bookingProduct.id.toString()) : null)} t={t} />
            </div>
          ))}
        </div>
      ) : null}

      {openTours && !hideTours && tourProducts.length > 0 ? (
        <div className="col col12 p5">
          <h2 className="mb1 mt3">{t('trips.myTrips.itinerary.step.poi.tourTicket.tour.title')}</h2>
          <span className={classes.poiInfotourCardHeader}>
            {t('trips.myTrips.itinerary.step.poi.tourTicket.tour.covering')} {poi.name || ''}
          </span>
          {tourProducts.map((bookingProduct) => (
            <div key={bookingProduct.id} className="pt4">
              <TourRefCardProduct bookingProduct={bookingProduct} clicked={() => (getTourInfo ? getTourInfo(bookingProduct.id.toString()) : null)} t={t} />
            </div>
          ))}
        </div>
      ) : null}

      {!loadingFeedback && <Feedback feedbackSubjects={feedbackSubjects} sendFeedback={sendFeedback} showModal={showFeedbackModal} setShowModal={() => setShowFeedbackModal(!showFeedbackModal)} t={t} />}
    </div>
  );
};

export default PoiInfo;
