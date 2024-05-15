/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import Model from '@tripian/model';
import TasteInfoImage from './TasteInfoImage/TasteInfoImage';
import TasteInfoText from './TasteInfoText/TasteInfoText';
import MustTryPois from './MustTryPois/MustTryPois';
import PreLoading from '../base/PreLoading/PreLoading';
import classes from './TasteInfo.scss';
import CloseIconButton from '../base/Button/Icons/CloseIconButton/CloseIconButton';

interface ITasteInfo {
  pois: Model.Poi[];
  taste: Model.TasteItem;
  close: () => void;
  loading: boolean;
  poiClicked: (poi: Model.Poi) => void;
  TOUR_PROVIDER_IDS: Model.PROVIDER_ID[];
  TICKET_PROVIDER_IDS: Model.PROVIDER_ID[];
  RESTAURANT_RESERVATION_PROVIDER_IDS: Model.PROVIDER_ID[];
  hideReservationIcon: boolean;
  hideTourTicketIcons: boolean;
  hideOfferIcon: boolean;
  t: (value: Model.TranslationKey) => string;
}

const TasteInfo: React.FC<ITasteInfo> = ({ taste, close, pois, loading, poiClicked, TOUR_PROVIDER_IDS, TICKET_PROVIDER_IDS, RESTAURANT_RESERVATION_PROVIDER_IDS, hideTourTicketIcons, hideReservationIcon, hideOfferIcon, t }) => (
  <>
    <div className="row">
      <div className="col col12 col6-m">
        <TasteInfoImage taste={taste} />
      </div>
      <div className="col col12 col6-m">
        <TasteInfoText taste={taste} />
      </div>
    </div>
    <div className="row">
      <div className="col col12">
        <h3 className="p2">Best places to try</h3>
        {loading ? (
          <PreLoading />
        ) : (
          <MustTryPois
            pois={pois}
            poiClicked={poiClicked}
            TOUR_PROVIDER_IDS={TOUR_PROVIDER_IDS}
            TICKET_PROVIDER_IDS={TICKET_PROVIDER_IDS}
            RESTAURANT_RESERVATION_PROVIDER_IDS={RESTAURANT_RESERVATION_PROVIDER_IDS}
            hideReservationIcon={hideReservationIcon}
            hideTourTicketIcons={hideTourTicketIcons}
            hideOfferIcon={hideOfferIcon}
            t={t}
          />
        )}
      </div>
    </div>
    <div className={classes.close}>
      <CloseIconButton fill="#fff" clicked={() => close()} />
    </div>
  </>
);

export default TasteInfo;
