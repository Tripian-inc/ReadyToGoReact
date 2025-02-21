/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import Model from '@tripian/model';
import PoiInfo from '../PoiInfo/PoiInfo';

interface IStepInfo {
  step: Model.Step;
  favorite: boolean;
  toggleFavorite: (poi: Model.Poi, willFavorite: boolean) => void;
  removeStep: (stepId: number) => void;
  close: (poi: Model.Poi) => void;
  dayNumbers: number[];
  hideActionButtons?: boolean;
  hideFavoriteIcon?: boolean;
  hideScore?: boolean;
  hidePartOfDay?: boolean;
  hideFeatures?: boolean;
  hideCuisine?: boolean;
  planDate?: string;
  bookingButtonClick?: (productId: string, poi: Model.Poi) => void;
  favoriteLoading: boolean;
  reservationUrl?: string;
  hideTours: boolean;
  hideBookingButton: boolean;
  getTourInfo?: (productId: string, poi: Model.Poi) => void;
  tourProducts: Model.BookingProduct[];
  ticketProducts: Model.BookingProduct[];
  tourTicketProductsLoading: boolean;
  // TOUR_PROVIDER_IDS: Model.PROVIDER_ID[];
  // TICKET_PROVIDER_IDS: Model.PROVIDER_ID[];
  RESTAURANT_RESERVATION_PROVIDER_IDS: Model.PROVIDER_ID[];
  myOffers: Model.Poi[];
  isLoadingOffer: (offerId: number) => boolean;
  offerButtonClick: (optIn: boolean, offer: Model.Offer, optInDate: string) => void;
  offerCardClicked?: () => void;
  hideOffers: boolean;
  loadingFeedback: boolean;
  feedbackSubjects: Model.FeedbackSubjects[];
  sendFeedback: (value: Model.FeedbackRequest) => Promise<void>;
  placeInfoCallBack?: () => void;
  showStepScoreDetails: boolean;
  t: (value: Model.TranslationKey) => string;
}

const StepInfo: React.FC<IStepInfo> = ({
  step,
  favorite,
  toggleFavorite,
  removeStep,
  close,
  dayNumbers,
  hideActionButtons,
  hideFavoriteIcon = false,
  hideScore,
  hidePartOfDay,
  hideFeatures,
  hideCuisine,
  bookingButtonClick,
  planDate,
  favoriteLoading,
  reservationUrl,
  hideBookingButton,
  hideTours,
  getTourInfo,
  tourProducts,
  ticketProducts,
  tourTicketProductsLoading,
  // TOUR_PROVIDER_IDS,
  // TICKET_PROVIDER_IDS,
  RESTAURANT_RESERVATION_PROVIDER_IDS,
  myOffers,
  isLoadingOffer,
  offerButtonClick,
  offerCardClicked,
  hideOffers,
  loadingFeedback,
  feedbackSubjects,
  sendFeedback,
  placeInfoCallBack,
  showStepScoreDetails,
  t,
}) => (
  <PoiInfo
    score={step.score}
    scoreDetails={showStepScoreDetails ? step.scoreDetails : undefined}
    dayNumbers={dayNumbers}
    poi={step.poi}
    favorite={favorite}
    toggleFavorite={toggleFavorite}
    close={close}
    addRemoveReplacePoi={() => {
      removeStep(step.id);
    }}
    stepOrder={step.order}
    hideActionButtons={hideActionButtons}
    hideFavoriteIcon={hideFavoriteIcon}
    hideScore={hideScore}
    hidePartOfDay={hidePartOfDay}
    hideFeatures={hideFeatures}
    hideCuisine={hideCuisine}
    bookingButtonClick={bookingButtonClick}
    planDate={planDate}
    favoriteLoading={favoriteLoading}
    reservationUrl={reservationUrl}
    hideBookingButton={hideBookingButton}
    square={false}
    hideTours={hideTours}
    getTourInfo={getTourInfo}
    tourProducts={tourProducts}
    ticketProducts={ticketProducts}
    tourTicketProductsLoading={tourTicketProductsLoading}
    // TOUR_PROVIDER_IDS={TOUR_PROVIDER_IDS}
    // TICKET_PROVIDER_IDS={TICKET_PROVIDER_IDS}
    RESTAURANT_RESERVATION_PROVIDER_IDS={RESTAURANT_RESERVATION_PROVIDER_IDS}
    myOffers={myOffers}
    isLoadingOffer={isLoadingOffer}
    offerButtonClick={offerButtonClick}
    offerCardClicked={offerCardClicked}
    hideOffers={hideOffers}
    loadingFeedback={loadingFeedback}
    feedbackSubjects={feedbackSubjects}
    sendFeedback={sendFeedback}
    placeInfoCallBack={placeInfoCallBack}
    t={t}
  />
);

export default StepInfo;
