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
  hideRemoveStepButton?: boolean;
  planDate?: string;
  bookingButtonClick?: (productId: string, poi: Model.Poi) => void;
  favoriteLoading: boolean;
  reservationUrl?: string;
  hideTours: boolean;
  hideBookingButton: boolean;
  getTourInfo?: (productId: string) => void;
  TOUR_PROVIDER_IDS: Model.PROVIDER_ID[];
  TICKET_PROVIDER_IDS: Model.PROVIDER_ID[];
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
  hideRemoveStepButton,
  bookingButtonClick,
  planDate,
  favoriteLoading,
  reservationUrl,
  hideBookingButton,
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
    hideActionButtons={hideRemoveStepButton}
    bookingButtonClick={bookingButtonClick}
    planDate={planDate}
    favoriteLoading={favoriteLoading}
    reservationUrl={reservationUrl}
    hideBookingButton={hideBookingButton}
    square={false}
    hideTours={hideTours}
    getTourInfo={getTourInfo}
    TOUR_PROVIDER_IDS={TOUR_PROVIDER_IDS}
    TICKET_PROVIDER_IDS={TICKET_PROVIDER_IDS}
    RESTAURANT_RESERVATION_PROVIDER_IDS={RESTAURANT_RESERVATION_PROVIDER_IDS}
    myOffers={myOffers}
    isLoadingOffer={isLoadingOffer}
    offerButtonClick={offerButtonClick}
    offerCardClicked={offerCardClicked}
    hideOffers={hideOffers}
    hideFavoriteIcon={false}
    loadingFeedback={loadingFeedback}
    feedbackSubjects={feedbackSubjects}
    sendFeedback={sendFeedback}
    placeInfoCallBack={placeInfoCallBack}
    t={t}
  />
);

export default StepInfo;
