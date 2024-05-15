/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import Model, { helper } from '@tripian/model';
import ReplaceIconButton from '../base/Button/Icons/Replace';
import AddIconButton from '../base/Button/Icons/Add';
import RemoveIconButton from '../base/Button/Icons/Remove';
import ImgLazy from '../base/ImgLazy/ImgLazy';
import BUTTON_TYPES from '../base/Button/ButtonTypes';
import Tour from '../base/Svg/Icons/Tour';
import Ticket from '../base/Svg/Icons/Ticket';
import Reservation from '../base/Svg/Icons/Reservation';
import Offer from '../base/Svg/Icons/Offer';
import CustomPopover from '../base/CustomPopover/CustomPopover';
import StepTimes from '../StepTimes/StepTimes';
import { MustTry } from '../base/Svg/Icons';
import emptyImageData from '../../constant/emptyImage';
import classes from './PoiRefCard.scss';

interface IPoiRefCard {
  poi: Model.Poi;
  inStep?: boolean;
  isRecommendation?: boolean;
  dayNumbers?: number[];
  buttonType?: number;
  poiCardClicked: (alternativePoi: Model.Poi) => void;
  addRemoveAlternativePoi?: (poi: Model.Poi, from?: string, to?: string) => void;
  TOUR_PROVIDER_IDS: Model.PROVIDER_ID[];
  TICKET_PROVIDER_IDS: Model.PROVIDER_ID[];
  RESTAURANT_RESERVATION_PROVIDER_IDS: Model.PROVIDER_ID[];
  hideReservationIcon: boolean;
  hideTourTicketIcons: boolean;
  hideOfferIcon: boolean;
  t: (value: Model.TranslationKey) => string;
}

const PoiRefCard: React.FC<IPoiRefCard> = ({
  poi,
  inStep,
  isRecommendation,
  dayNumbers,
  buttonType,
  poiCardClicked,
  addRemoveAlternativePoi,
  TOUR_PROVIDER_IDS,
  TICKET_PROVIDER_IDS,
  RESTAURANT_RESERVATION_PROVIDER_IDS,
  hideReservationIcon = false,
  hideTourTicketIcons = false,
  hideOfferIcon,
  t,
}) => {
  const [show, setShow] = useState<boolean>(false);
  const PoiImage = poi.image === null ? emptyImageData : helper.imgUrl(`${poi.image.url}`, 84, 84);

  let actionButton;
  if (buttonType === 0) {
    actionButton = (
      <ReplaceIconButton
        // color="primary"
        type={BUTTON_TYPES.OUTLINED}
        onClick={(event) => {
          event.stopPropagation();
          if (addRemoveAlternativePoi) addRemoveAlternativePoi(poi);
        }}
      />
    );
  } else if (buttonType === -1 || inStep) {
    actionButton = (
      <RemoveIconButton
        // color="primary"
        type={BUTTON_TYPES.OUTLINED}
        onClick={(event) => {
          event.stopPropagation();
          if (addRemoveAlternativePoi) addRemoveAlternativePoi(poi);
        }}
      />
    );
  } else if (buttonType === +1) {
    actionButton = (
      <CustomPopover
        show={show}
        content={
          <StepTimes
            times={{
              from: undefined,
              to: undefined,
            }}
            timesClicked={(from?: string, to?: string) => {
              if (addRemoveAlternativePoi) addRemoveAlternativePoi(poi, from, to);
              setShow(false);
            }}
            buttonText={t('trips.myTrips.itinerary.step.addToItinerary.submit.add')}
            duration={poi.duration}
            t={t}
          />
        }
        backdropClick={(e) => {
          e.stopPropagation();
          setShow(false);
        }}
      >
        <div key={Math.floor(Math.random() * 100)}>
          <AddIconButton
            type={BUTTON_TYPES.OUTLINED}
            // color="primary"
            onClick={(event) => {
              event.stopPropagation();
              setShow(!show);
            }}
          />
        </div>
      </CustomPopover>
    );
  }

  let stepDayInfo;

  if (dayNumbers && dayNumbers.length > 1) {
    stepDayInfo = (
      <div className={classes.refCardPartOfDay}>
        {`${t('trips.myTrips.itinerary.step.poi.partOfDay')} 
        ${dayNumbers
          .slice(0, dayNumbers.length - 1)
          .map((day) => day)
          .join(', ')}
        and ${dayNumbers[dayNumbers.length - 1]}`}
      </div>
    );
  } else if (dayNumbers && dayNumbers.length === 1) {
    stepDayInfo = <div className={classes.refCardPartOfDay}>{`${t('trips.myTrips.itinerary.step.poi.partOfDay')} ${dayNumbers[0]}`}</div>;
  } else {
    stepDayInfo = null;
  }

  return (
    <div
      className={classes.poiRefCard}
      onKeyDown={() => {}}
      role="button"
      tabIndex={0}
      onClick={() => {
        poiCardClicked(poi);
      }}
    >
      <ul key={poi.id}>
        <li>
          {/* <img className={classes.poiImg} src={PoiImage} alt={poi.name} /> */}
          <div className={classes.poiRefCardImg}>
            <ImgLazy src={PoiImage} alt={poi.name} x={84} y={84} />
          </div>
          <div className={classes.refCardInfo}>
            <div className={classes.PoiRefCardContent}>
              <div className={classes.poiRefCardName}>{poi.name}</div>
              <div className={classes.poiRefCardFooter}>
                {stepDayInfo}
                <div className={classes.poiAbilities}>
                  {helper.tourAvailable(poi.bookings, TOUR_PROVIDER_IDS) && !hideTourTicketIcons && (
                    <div className={classes.poiAbilityItem}>
                      <Tour fill="var(--text-primary-color)" />
                    </div>
                  )}
                  {helper.ticketAvailable(poi.bookings, TICKET_PROVIDER_IDS) && !hideTourTicketIcons && (
                    <div className={classes.poiAbilityItem}>
                      <Ticket fill="var(--text-primary-color)" />
                    </div>
                  )}
                  {helper.restaurantReservationAvailable(poi.bookings, RESTAURANT_RESERVATION_PROVIDER_IDS) && !hideReservationIcon && (
                    <div className={classes.poiAbilityItem}>
                      <Reservation />
                    </div>
                  )}
                  {helper.offerAvailable(poi.offers) && !hideOfferIcon && (
                    <div className={classes.poiAbilityItem}>
                      <Offer />
                    </div>
                  )}
                  {poi.mustTries.length > 0 && (
                    <div className={classes.poiAbilityItem}>
                      <MustTry />
                    </div>
                  )}
                </div>
              </div>
            </div>
            {isRecommendation ? <div className={classes.correct} /> : null}
          </div>
          {actionButton && <div className={classes.button}>{actionButton}</div>}
        </li>
      </ul>
    </div>
  );
};

export default PoiRefCard;
