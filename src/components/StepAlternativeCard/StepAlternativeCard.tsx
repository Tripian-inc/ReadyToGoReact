import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import Model from '@tripian/model';
import PoiRefCard from '../PoiRefCard/PoiRefCard';

interface IStepAlternativeCard {
  alternativePoiCardClicked: (alternativePoi: Model.Poi) => void;
  alternativeReplace: (alternativePoi: Model.Poi) => void;
  poi: Model.Poi;
  dayNumbers?: number[];
  TOUR_PROVIDER_IDS: Model.PROVIDER_ID[];
  TICKET_PROVIDER_IDS: Model.PROVIDER_ID[];
  RESTAURANT_RESERVATION_PROVIDER_IDS: Model.PROVIDER_ID[];
  hideReservationIcon: boolean;
  hideTourTicketIcons: boolean;
  hideOfferIcon: boolean;
  gygTourIds: number[];
  bbTourIds: number[];
  viatorTourIds: string[];
  toristyTourIds: string[];
  t: (value: Model.TranslationKey) => string;
}

const StepAlternativeCard: React.FC<IStepAlternativeCard> = ({
  poi,
  dayNumbers,
  alternativePoiCardClicked,
  alternativeReplace,
  TOUR_PROVIDER_IDS,
  TICKET_PROVIDER_IDS,
  RESTAURANT_RESERVATION_PROVIDER_IDS,
  hideReservationIcon,
  hideTourTicketIcons,
  hideOfferIcon,
  gygTourIds,
  bbTourIds,
  viatorTourIds,
  toristyTourIds,
  t,
}) => (
  <PoiRefCard
    dayNumbers={dayNumbers}
    addRemoveAlternativePoi={alternativeReplace}
    buttonType={0}
    poiCardClicked={alternativePoiCardClicked}
    poi={poi}
    TOUR_PROVIDER_IDS={TOUR_PROVIDER_IDS}
    TICKET_PROVIDER_IDS={TICKET_PROVIDER_IDS}
    RESTAURANT_RESERVATION_PROVIDER_IDS={RESTAURANT_RESERVATION_PROVIDER_IDS}
    hideReservationIcon={hideReservationIcon}
    hideTourTicketIcons={hideTourTicketIcons}
    hideOfferIcon={hideOfferIcon}
    gygTourIds={gygTourIds}
    bbTourIds={bbTourIds}
    viatorTourIds={viatorTourIds}
    toristyTourIds={toristyTourIds}
    t={t}
  />
);
export default StepAlternativeCard;
