/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable import/no-extraneous-dependencies */

import React, { useMemo, useState } from 'react';
import Model, { helper } from '@tripian/model';
import ImgLazy from '../base/ImgLazy/ImgLazy';
import Price from '../Price/Price';
import StepAlternativeCard from '../StepAlternativeCard/StepAlternativeCard';
import RatingStars from '../RatingStars/RatingStars';
import PreLoading from '../base/PreLoading/PreLoading';
import StepTimes from '../StepTimes/StepTimes';
import Reservation from '../base/Svg/Icons/Reservation';
import Offer from '../base/Svg/Icons/Offer';
import Tour from '../base/Svg/Icons/Tour';
import Ticket from '../base/Svg/Icons/Ticket';
import CustomPopover from '../base/CustomPopover/CustomPopover';
import Info2 from '../base/Svg/Icons/Info2';
import { EditHour, MustTry } from '../base/Svg/Icons';
import emptyImageData from '../../constant/emptyImage';
import TourTicketLazyLoading from '../TourTicketLazyLoading/TourTicketLazyLoading';
import classes from './StepCardUserReaction.scss';

interface IStepCardUserReaction {
  step: Model.Step;
  clicked: (step: Model.Step) => void;
  alternativePois: Model.Poi[];
  alternativePoisDays: number[][];
  alternativePoiCardClicked: (alternativePoi: Model.Poi) => void;
  alternativeReplace: (alternativePoi: Model.Poi) => void;
  showAlternativesChange: (stepId: number, show: boolean) => void;
  showAlternatives?: boolean;
  showRemoveReplaceButtons?: boolean;
  hideScore?: boolean;
  hideStepsTime?: boolean;
  isWidget?: boolean;
  // user reaction
  thumbs?: number;
  thumbsLoading: boolean;
  thumbsClicked: (like: number) => void;
  timesClicked: (from: string, to: string) => void;
  userReactionUndo: () => void;
  userReactionRemoveStep: () => void;
  // userReactionComment: (comment: Model.REACTION_COMMENT) => void;
  TOUR_PROVIDER_IDS: Model.PROVIDER_ID[];
  TICKET_PROVIDER_IDS: Model.PROVIDER_ID[];
  RESTAURANT_RESERVATION_PROVIDER_IDS: Model.PROVIDER_ID[];
  hideReservationIcon: boolean;
  hideTourTicketIcons: boolean;
  hideOfferIcon: boolean;
  hideFeatures?: boolean;
  hideCuisine?: boolean;
  gygTourIds: number[];
  bbTourIds: number[];
  viatorTourIds: string[];
  toristyTourIds: string[];
  tourTicketProductsLoading: boolean;
  t: (value: Model.TranslationKey) => string;
}

const StepCardUserReaction: React.FC<IStepCardUserReaction> = ({
  step,
  clicked,
  alternativePois,
  alternativePoisDays,
  alternativePoiCardClicked,
  alternativeReplace,
  showAlternativesChange,
  showAlternatives = false,
  showRemoveReplaceButtons = true,
  hideScore = false,
  hideStepsTime = false,
  isWidget = false,
  thumbs,
  thumbsLoading,
  thumbsClicked,
  timesClicked,
  userReactionUndo,
  userReactionRemoveStep,
  // userReactionComment,
  TOUR_PROVIDER_IDS,
  TICKET_PROVIDER_IDS,
  RESTAURANT_RESERVATION_PROVIDER_IDS,
  hideReservationIcon = false,
  hideTourTicketIcons = false,
  hideOfferIcon,
  hideFeatures = false,
  hideCuisine = false,
  gygTourIds,
  bbTourIds,
  viatorTourIds,
  toristyTourIds,
  tourTicketProductsLoading,
  t,
}) => {
  const myRef = React.createRef<HTMLDivElement>();
  const ref = React.createRef<HTMLButtonElement>();

  const [show, setShow] = useState<boolean>(false);

  const placeImg = step.poi.image === null ? emptyImageData : helper.imgUrl(`${step.poi.image.url}`, 256, 256);
  const attraction = helper.getCategoryGroup(step.poi.category[0].id) === Model.POI_CATEGORY_GROUP.ATTRACTION;
  const shopping = helper.getCategoryGroup(step.poi.category[0].id) === Model.POI_CATEGORY_GROUP.SHOPPING;

  const stepCardImageClasses = [classes.stepCardImage];
  if (step.poi.status === false) {
    stepCardImageClasses.push(classes.stepCardBlackWhite);
  }

  // useEffect(() => {
  //   if (thumbs === -1) showAlternativesChange(step.id, true);
  // }, [showAlternativesChange, step.id, thumbs]);

  const cuisinesArray = step.poi.cuisines?.split(', ') || [];
  const uniqueCuisines = helper.removeDuplicateValues(cuisinesArray, (s1, s2) => s1 === s2);

  const stepsTime = useMemo(() => {
    if (step.times.from && step.times.to) {
      return (
        <CustomPopover
          show={show}
          ref={ref}
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
  }, [ref, show, step.poi.duration, step.times.from, step.times.to, t, timesClicked]);

  let Thumbs;
  if (showRemoveReplaceButtons) {
    if (thumbs === 1) {
      Thumbs = (
        <div className={classes.buttons}>
          <div className={classes.thumbs}>
            {thumbsLoading ? (
              <div className={classes.thumbsLoading}>
                <PreLoading size="small" />
              </div>
            ) : (
              <div
                className={classes.like}
                onKeyDown={() => {}}
                role="button"
                tabIndex={0}
                onClick={(event) => {
                  event.stopPropagation();
                  userReactionUndo();
                }}
              >
                {' '}
              </div>
            )}
          </div>
        </div>
      );
    } else if (thumbs === 0) {
      Thumbs = (
        <div className={classes.buttons}>
          {thumbsLoading ? (
            <div className={classes.thumbsLoading}>
              <PreLoading color="#000" size="small" />
            </div>
          ) : (
            <>
              <div className={classes.thumbs}>
                <div
                  className={classes.likeEmpty}
                  onKeyDown={() => {}}
                  role="button"
                  tabIndex={0}
                  onClick={(event) => {
                    event.stopPropagation();
                    thumbsClicked(+1);
                  }}
                >
                  {' '}
                </div>
              </div>
              <div className={classes.thumbs}>
                <div
                  className={classes.dislikeEmpty}
                  onKeyDown={() => {}}
                  role="button"
                  tabIndex={0}
                  onClick={(event) => {
                    event.stopPropagation();
                    thumbsClicked(-1);
                  }}
                >
                  {' '}
                </div>
              </div>
            </>
          )}
        </div>
      );
    } else if (thumbs === -1) {
      Thumbs = (
        <div className={classes.buttons}>
          <div className={classes.thumbs}>
            {thumbsLoading ? (
              <div className={classes.thumbsLoading}>
                <PreLoading color="#000" size="small" />
              </div>
            ) : (
              <>
                <>
                  <div
                    className={classes.removePlaceButton}
                    onKeyDown={() => {}}
                    role="button"
                    tabIndex={0}
                    onClick={(event) => {
                      event.stopPropagation();
                      userReactionRemoveStep();
                    }}
                  >
                    {t('trips.myTrips.itinerary.step.thumbs.remove')}
                  </div>
                  {alternativePois.length > 0 && (
                    <div
                      className={classes.showAlternativeButton}
                      onKeyDown={() => {}}
                      role="button"
                      tabIndex={0}
                      onClick={(event) => {
                        event.stopPropagation();
                        showAlternativesChange(step.id, !showAlternatives);
                        myRef.current?.scrollIntoView({ behavior: 'auto' });
                      }}
                    >
                      {t('trips.myTrips.itinerary.step.thumbs.replace.title')}
                    </div>
                  )}
                </>

                <div
                  className={classes.dislike}
                  onKeyDown={() => {}}
                  role="button"
                  tabIndex={0}
                  onClick={(event) => {
                    event.stopPropagation();
                    userReactionUndo();
                  }}
                >
                  {' '}
                </div>
              </>
            )}
          </div>
        </div>
      );
    }
  }

  let info;
  if (step.poi.status === false) {
    if (step.poi.name.includes('Permanently Closed')) info = <div className={classes.statusWarning}>{t('trips.myTrips.itinerary.step.status.permanentlyClosed')}</div>;
    else info = <div className={classes.statusWarning}>{t('trips.myTrips.itinerary.step.status.temporarilyClosed')}</div>;
  } else if (attraction || shopping) {
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
          {uniqueCuisines.length > 0 && !hideCuisine && (
            <>
              <span className={`${classes.cuisines} mt1`}>
                <b>{t('trips.myTrips.itinerary.step.cuisine')}: </b>
                {uniqueCuisines.join(', ')}
              </span>
            </>
          )}
          {step.poi.tags.length > 0 && !hideFeatures && (
            <span className={classes.features}>
              <b>{t('trips.myTrips.itinerary.step.features')}: </b>
              {step.poi.tags.length > 0 ? step.poi.tags.join(', ') : 'empty'}
            </span>
          )}
        </div>
      </>
    );
  }

  return (
    <div style={{ marginLeft: isWidget ? '1.5rem' : '0' }} className={classes.stepCardMain}>
      <div
        className={classes.stepCard}
        onKeyDown={() => {}}
        role="button"
        tabIndex={0}
        onClick={() => {
          clicked(step);
        }}
        ref={myRef}
      >
        <div className={stepCardImageClasses.join(' ')}>
          {/* <img className={classes.figureImg} src={placeImg} alt={step.poi.name} /> */}
          <ImgLazy src={placeImg} alt={step.poi.name} x={256} y={256} />
          <div className={classes.stepOrder}>{`${step.order + 1}`}</div>
          {!hideScore && step.score && <div className={classes.stepMatch}>{`${step.score.toFixed(0)}%`}</div>}

          {!hideStepsTime && stepsTime}
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
            {tourTicketProductsLoading && step.poi.category.some((c) => c.id === 1) ? (
              <div className={classes.loadingIndicator}>
                <TourTicketLazyLoading />
              </div>
            ) : (
              <>
                {helper.tourAvailable(step.poi.bookings, TOUR_PROVIDER_IDS, gygTourIds, bbTourIds, viatorTourIds, toristyTourIds) && !hideTourTicketIcons && (
                  <div className={classes.poiAbilityItem}>
                    <Tour fill="#000" />
                  </div>
                )}
                {helper.ticketAvailable(step.poi.bookings, TICKET_PROVIDER_IDS, gygTourIds, bbTourIds, viatorTourIds, toristyTourIds) && !hideTourTicketIcons && (
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
              </>
            )}
          </div>

          <div>{Thumbs}</div>

          {/* {alternativePois.length > 0 ? (
            <div className={classes.buttons}>
              <div className="hide-s">
                <Button
                  iconPath="M629.657 343.598L528.971 444.284c-9.373 9.372-24.568 9.372-33.941 0L394.343 343.598c-9.373-9.373-9.373-24.569 0-33.941l10.823-10.823c9.562-9.562 25.133-9.34 34.419.492L480 342.118V160H292.451a24.005 24.005 0 0 1-16.971-7.029l-16-16C244.361 121.851 255.069 96 276.451 96H520c13.255 0 24 10.745 24 24v222.118l40.416-42.792c9.285-9.831 24.856-10.054 34.419-.492l10.823 10.823c9.372 9.372 9.372 24.569-.001 33.941zm-265.138 15.431A23.999 23.999 0 0 0 347.548 352H160V169.881l40.416 42.792c9.286 9.831 24.856 10.054 34.419.491l10.822-10.822c9.373-9.373 9.373-24.569 0-33.941L144.971 67.716c-9.373-9.373-24.569-9.373-33.941 0L10.343 168.402c-9.373 9.373-9.373 24.569 0 33.941l10.822 10.822c9.562 9.562 25.133 9.34 34.419-.491L96 169.881V392c0 13.255 10.745 24 24 24h243.549c21.382 0 32.09-25.851 16.971-40.971l-16.001-16z"
                  iconViewBox="0 0 640 512"
                  onClick={(event) => {
                    event.stopPropagation();
                    togglePanel();
                    // Collapsable
                  }}
                  color="primary"
                  type={BUTTON_TYPES.OUTLINED}
                  text="Alternative Locations"
                  size="small"
                />
              </div>
              <div className="hide-m">
                <ReplaceIconButton
                  color="primary"
                  type={BUTTON_TYPES.OUTLINED}
                  onClick={(event) => {
                    event.stopPropagation();
                    togglePanel();
                    // Collapsable
                  }}
                />
              </div>
            </div>
          ) : null} */}
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
                gygTourIds={gygTourIds}
                bbTourIds={bbTourIds}
                viatorTourIds={viatorTourIds}
                toristyTourIds={toristyTourIds}
                t={t}
              />
            ))
          : null}
      </div>
    </div>
  );
};

export default StepCardUserReaction;
