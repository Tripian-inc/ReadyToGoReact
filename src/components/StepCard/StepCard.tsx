/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useMemo, useState } from 'react';
import Model, { helper } from '@tripian/model';
import Price from '../Price/Price';
import StepAlternativeCard from '../StepAlternativeCard/StepAlternativeCard';
import RatingStars from '../RatingStars/RatingStars';
import ReplaceIconButton from '../base/Button/Icons/Replace';
import BUTTON_TYPES from '../base/Button/ButtonTypes';
import ImgLazy from '../base/ImgLazy/ImgLazy';
import StepTimes from '../StepTimes/StepTimes';
import Tour from '../base/Svg/Icons/Tour';
import Ticket from '../base/Svg/Icons/Ticket';
import Reservation from '../base/Svg/Icons/Reservation';
import Offer from '../base/Svg/Icons/Offer';
import CustomPopover from '../base/CustomPopover/CustomPopover';
import Info2 from '../base/Svg/Icons/Info2';
import { EditHour, MustTry } from '../base/Svg/Icons';
import emptyImageData from '../../constant/emptyImage';
import classes from './StepCard.scss';

interface IStepCard {
  step: Model.Step;
  // isSortableStepListCard?: boolean;
  clicked: (step: Model.Step) => void;
  alternativePois: Model.Poi[];
  alternativePoisDays: number[][];
  alternativePoiCardClicked: (alternativePoi: Model.Poi) => void;
  alternativeReplace: (alternativePoi: Model.Poi) => void;
  showAlternativesChange: (stepId: number, show: boolean) => void;
  showAlternatives?: boolean;
  timesClicked: (from: string, to: string) => void;
  // dragHandle?: JSX.Element;
  TOUR_PROVIDER_IDS: Model.PROVIDER_ID[];
  TICKET_PROVIDER_IDS: Model.PROVIDER_ID[];
  RESTAURANT_RESERVATION_PROVIDER_IDS: Model.PROVIDER_ID[];
  hideReservationIcon: boolean;
  hideTourTicketIcons: boolean;
  hideOfferIcon: boolean;
  t: (value: Model.TranslationKey) => string;
}

const StepCard: React.FC<IStepCard> = ({
  step,
  // isSortableStepListCard,
  clicked,
  alternativePois,
  alternativePoisDays,
  alternativePoiCardClicked,
  alternativeReplace,
  showAlternativesChange,
  showAlternatives = false,
  timesClicked,
  // dragHandle,
  TOUR_PROVIDER_IDS,
  TICKET_PROVIDER_IDS,
  RESTAURANT_RESERVATION_PROVIDER_IDS,
  hideReservationIcon = false,
  hideTourTicketIcons = false,
  hideOfferIcon,
  t,
}) => {
  const [show, setShow] = useState<boolean>(false);

  const placeImg = step.poi.image === null ? emptyImageData : helper.imgUrl(`${step.poi.image.url}`, 256, 256);
  const attraction = helper.getCategoryGroup(step.poi.category[0].id) === Model.POI_CATEGORY_GROUP.ATTRACTION;
  const notCategorized = helper.getCategoryGroup(step.poi.category[0].id) === Model.POI_CATEGORY_GROUP.NOTCATEGORIZED;
  const cuisinesArray = step.poi.cuisines?.split(', ') || [];
  const uniqueCuisines = helper.removeDuplicateValues(cuisinesArray, (s1, s2) => s1 === s2);

  const stepsTime = useMemo(() => {
    if (step.times.from && step.times.to) {
      return (
        <CustomPopover
          show={show}
          content={
            <StepTimes
              times={{
                from: step.times.from,
                to: step.times.to,
              }}
              timesClicked={(from?: string, to?: string) => {
                if (from && to) timesClicked(from, to);
                setShow(false);
              }}
              buttonText={t('trips.myTrips.itinerary.step.addToItinerary.submit.apply')}
              duration={step.poi.duration}
              t={t}
            />
          }
          backdropClick={(e) => {
            e.stopPropagation();
            setShow(false);
          }}
        >
          <div
            role="button"
            key={Math.floor(Math.random() * 100)}
            tabIndex={0}
            onKeyPress={() => {}}
            onClick={(e) => {
              e.stopPropagation();
              setShow(!show);
            }}
            className={classes.durationButton}
          >
            <div className={classes.duration}>
              <EditHour size="1rem" />
              <span className={classes.durationHours}>{`${step.times.from} - ${step.times.to}`}</span>
            </div>
          </div>
        </CustomPopover>
      );
    }
    return null;
  }, [show, step.poi.duration, step.times.from, step.times.to, t, timesClicked]);

  const togglePanel = () => {
    showAlternativesChange(step.id, !showAlternatives);
  };

  const stepCardImageClasses = [classes.stepCardImage];
  if (step.poi.status === false) {
    stepCardImageClasses.push(classes.stepCardBlackWhite);
  }

  let info;
  if (step.poi.status === false) {
    if (step.poi.name.includes('Permanently Closed')) info = <div className={classes.statusWarning}>{t('trips.myTrips.itinerary.step.status.permanentlyClosed')}</div>;
    else info = <div className={classes.statusWarning}>{t('trips.myTrips.itinerary.step.status.temporarilyClosed')}</div>;
  } else if (attraction) {
    info = (
      <>
        {step.poi.rating !== null && (
          <div className={classes.ratingPriceIcons}>
            <div className={classes.flexItemCenter}>
              <RatingStars rating={`${step.poi.rating ? step.poi.rating * 20 : null}`} />
              <span className={classes.ratingCount}>({step.poi.ratingCount})</span>
            </div>
          </div>
        )}

        {step.poi.description !== null ? (
          <div className={classes.stepInfo}>
            <span className={`${classes.description} my1`}>{step.poi.description}</span>
          </div>
        ) : (
          <div className={classes.stepInfo}>
            <span className={`${classes.description} my1`}>
              <b>{t('trips.myTrips.itinerary.step.address')}: </b>
              {step.poi.address}
            </span>
          </div>
        )}
      </>
    );
  } else if (notCategorized) {
    info = (
      <>
        {step.poi.description !== null && (
          <div className={classes.stepInfo}>
            <span className={`${classes.description} my1`}>{step.poi.description}</span>
          </div>
        )}
        <div className={classes.stepInfo}>
          <span className={`${classes.description} my1`}>
            <b>{t('trips.myTrips.itinerary.step.address')}: </b>
            {step.poi.address}
          </span>
        </div>
      </>
    );
  } else {
    info = (
      <>
        <div className={classes.ratingPriceIcons}>
          {step.poi.rating !== null && (
            <div className={classes.flexItemCenter}>
              <RatingStars rating={`${step.poi.rating ? step.poi.rating * 20 : null}`} />
              <span className={classes.ratingCount}>({step.poi.ratingCount})</span>
            </div>
          )}
          {step.poi.price ? (
            <div className={classes.flexItemCenter}>
              <span className={`${classes.stepCardBull} px3`}>&bull;</span>
              <Price price={step.poi.price} />
            </div>
          ) : null}
        </div>

        <div className={classes.stepInfo}>
          {uniqueCuisines.length > 0 ? (
            <>
              <span className={`${classes.cuisines} mt1`}>
                <b>{t('trips.myTrips.itinerary.step.cuisine')}: </b>
                {uniqueCuisines.join(', ')}
              </span>
            </>
          ) : null}
          {step.poi.tags.length > 0 ? (
            <span className={classes.features}>
              <b>{t('trips.myTrips.itinerary.step.features')}: </b>
              {step.poi.tags.length > 0 ? step.poi.tags.join(', ') : 'empty'}
            </span>
          ) : null}
        </div>
      </>
    );
  }

  /* if (isSortableStepListCard) {
    return <SortableStepListCard poiName={step.poi.name} poiImageUrl={step.poi.image.url} stepOrder={step.order} dragHandle={dragHandle} />;
  } */

  return (
    <div className={classes.stepCardMain}>
      <div
        className={classes.stepCard}
        onKeyDown={() => {}}
        role="button"
        tabIndex={0}
        onClick={() => {
          clicked(step);
        }}
      >
        <div className={stepCardImageClasses.join(' ')}>
          {/* <img className={classes.figureImg} src={placeImg} alt={step.poi.name} /> */}
          <ImgLazy src={placeImg} alt={step.poi.name} x={256} y={256} />
          <div className={classes.stepOrder}>{`${step.order + 1}`}</div>
          {step.score ? <div className={classes.stepMatch}>{`${step.score.toFixed(0)}% ${t('trips.myTrips.itinerary.step.poi.match')}`}</div> : null}
          {stepsTime}
          {/* <span className={classes.hours}>{`${step.hours.from}-${step.hours.to}`}</span> */}
        </div>
        <div className={classes.stepCardinformation}>
          <div className={classes.stepInfoContent}>
            <h4 className={classes.stepCardName}>{step.poi.name}</h4>
            {step.warningMessage.length > 0 && (
              <div className={classes.tooltip} data-tooltip={step.warningMessage.join(' ')} data-tooltip-position="bottom">
                <div className={`${classes.blob} ${classes.red}`}>
                  <Info2 fill="#fff" size="12px" />
                </div>
              </div>
            )}
          </div>
          {info}
          <div className={classes.poiAbilities}>
            {helper.tourAvailable(step.poi.bookings, TOUR_PROVIDER_IDS) && !hideTourTicketIcons && (
              <div className={classes.poiAbilityItem}>
                <Tour fill="#000" />
              </div>
            )}
            {helper.ticketAvailable(step.poi.bookings, TICKET_PROVIDER_IDS) && !hideTourTicketIcons && (
              <div className={classes.poiAbilityItem}>
                <Ticket fill="#000" />
              </div>
            )}
            {helper.restaurantReservationAvailable(step.poi.bookings, RESTAURANT_RESERVATION_PROVIDER_IDS) && !hideReservationIcon && (
              <div className={classes.poiAbilityItem}>
                <Reservation />
              </div>
            )}
            {helper.offerAvailable(step.poi.offers) && !hideOfferIcon && (
              <div className={classes.poiAbilityItem}>
                <Offer />
              </div>
            )}
            {step.poi.mustTries.length > 0 && (
              <div className={classes.poiAbilityItem}>
                <MustTry />
              </div>
            )}
          </div>
          {alternativePois.length > 0 ? (
            <div className={classes.buttons}>
              <ReplaceIconButton
                className={classes.replaceButton}
                type={BUTTON_TYPES.OUTLINED}
                onClick={(event) => {
                  event.stopPropagation();
                  togglePanel();
                  // Collapsable
                }}
              />
            </div>
          ) : null}
        </div>
      </div>
      <div className={classes.alternativeList}>
        {showAlternatives ? <h5 className="my2">{t('trips.myTrips.itinerary.step.thumbs.replace.alternativeLocations')}</h5> : null}
        {showAlternatives
          ? alternativePois.map((alternativePoi, index) => (
              <StepAlternativeCard
                key={`alternative_${step.id}_${alternativePoi.id}`}
                poi={alternativePoi}
                dayNumbers={alternativePoisDays[index]}
                alternativeReplace={() => {
                  alternativeReplace(alternativePoi);
                }}
                alternativePoiCardClicked={() => {
                  alternativePoiCardClicked(alternativePoi);
                }}
                TOUR_PROVIDER_IDS={TOUR_PROVIDER_IDS}
                TICKET_PROVIDER_IDS={TICKET_PROVIDER_IDS}
                RESTAURANT_RESERVATION_PROVIDER_IDS={RESTAURANT_RESERVATION_PROVIDER_IDS}
                hideReservationIcon={hideReservationIcon}
                hideTourTicketIcons={hideTourTicketIcons}
                hideOfferIcon={hideOfferIcon}
                t={t}
              />
            ))
          : null}
      </div>
    </div>
  );
};

export default StepCard;
