/* eslint-disable no-nested-ternary */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import Model from '@tripian/model';
import TasteCard from '../TasteCard/TasteCard';
import PreLoading from '../base/PreLoading/PreLoading';
import PoiRefCard from '../PoiRefCard/PoiRefCard';
import classes from './MustTryCard.scss';

interface IMustTryCard {
  taste: Model.TasteItem;
  poiCardClicked: (poi: Model.Poi) => void;
  fetchPois: (tasteId: number) => Promise<Model.Poi[]>;
  TOUR_PROVIDER_IDS: Model.PROVIDER_ID[];
  TICKET_PROVIDER_IDS: Model.PROVIDER_ID[];
  RESTAURANT_RESERVATION_PROVIDER_IDS: Model.PROVIDER_ID[];
  hideReservationIcon: boolean;
  hideTourTicketIcons: boolean;
  hideOfferIcon: boolean;
  t: (value: Model.TranslationKey) => string;
}

const MustTryCard: React.FC<IMustTryCard> = ({ taste, poiCardClicked, fetchPois, TOUR_PROVIDER_IDS, TICKET_PROVIDER_IDS, RESTAURANT_RESERVATION_PROVIDER_IDS, hideReservationIcon, hideTourTicketIcons, hideOfferIcon, t }) => {
  const [poiList, setPoiList] = useState<Model.Poi[] | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [poiListToggle, setPoiListToggle] = useState<boolean>(false);

  const getRelationalPois = (tasteId: number) => {
    fetchPois(tasteId).then((mustTryPoiList) => {
      setLoading(false);
      setPoiList(mustTryPoiList);
    });
  };

  return (
    <>
      <div key={`must-try-card-${taste.id}}`}>
        <TasteCard
          taste={taste}
          tasteClicked={(tasteId: number) => {
            if (poiList === undefined) {
              setLoading(true);
              getRelationalPois(tasteId);
            }
            setPoiListToggle(!poiListToggle);
          }}
        />
      </div>
      {loading ? (
        <div className={classes.mustTryCardLoading}>
          <PreLoading />
        </div>
      ) : poiListToggle ? (
        <div>
          {poiList?.map((poi) => (
            <PoiRefCard
              key={`alternative_${poi.id}_${poi.id}`}
              poi={poi}
              poiCardClicked={() => {
                poiCardClicked(poi);
              }}
              addRemoveAlternativePoi={() => {}}
              TOUR_PROVIDER_IDS={TOUR_PROVIDER_IDS}
              TICKET_PROVIDER_IDS={TICKET_PROVIDER_IDS}
              RESTAURANT_RESERVATION_PROVIDER_IDS={RESTAURANT_RESERVATION_PROVIDER_IDS}
              hideReservationIcon={hideReservationIcon}
              hideTourTicketIcons={hideTourTicketIcons}
              hideOfferIcon={hideOfferIcon}
              gygTourIds={[]}
              bbTourIds={[]}
              viatorTourIds={[]}
              toristyTourIds={[]}
              t={t}
            />
          ))}
        </div>
      ) : null}
    </>
  );
};

export default MustTryCard;
