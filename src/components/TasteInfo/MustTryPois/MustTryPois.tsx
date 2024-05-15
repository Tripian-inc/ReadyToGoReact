/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import Model from '@tripian/model';
import PoiRefCard from '../../PoiRefCard/PoiRefCard';
import classes from './MustTryPois.scss';

interface IMustTryPois {
  pois: Model.Poi[];
  poiClicked: (poi: Model.Poi) => void;
  TOUR_PROVIDER_IDS: Model.PROVIDER_ID[];
  TICKET_PROVIDER_IDS: Model.PROVIDER_ID[];
  RESTAURANT_RESERVATION_PROVIDER_IDS: Model.PROVIDER_ID[];
  hideReservationIcon: boolean;
  hideTourTicketIcons: boolean;
  hideOfferIcon: boolean;
  t: (value: Model.TranslationKey) => string;
}

const MustTryPois: React.FC<IMustTryPois> = ({ pois, poiClicked, TOUR_PROVIDER_IDS, TICKET_PROVIDER_IDS, RESTAURANT_RESERVATION_PROVIDER_IDS, hideTourTicketIcons, hideReservationIcon, hideOfferIcon, t }) => (
  <div className={classes.mustTryPois}>
    <ul className={classes.mustTryPoisList}>
      {pois.slice(0, 10).map((poi) => (
        <li key={poi.id}>
          <PoiRefCard
            poiCardClicked={poiClicked}
            addRemoveAlternativePoi={() => {}}
            poi={poi}
            TOUR_PROVIDER_IDS={TOUR_PROVIDER_IDS}
            TICKET_PROVIDER_IDS={TICKET_PROVIDER_IDS}
            RESTAURANT_RESERVATION_PROVIDER_IDS={RESTAURANT_RESERVATION_PROVIDER_IDS}
            hideReservationIcon={hideReservationIcon}
            hideTourTicketIcons={hideTourTicketIcons}
            hideOfferIcon={hideOfferIcon}
            t={t}
          />
        </li>
      ))}
    </ul>
  </div>
);

export default MustTryPois;
