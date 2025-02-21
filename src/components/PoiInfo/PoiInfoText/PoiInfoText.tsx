/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useMemo, useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import Model, { helper } from '@tripian/model';
import Price from '../../Price/Price';
import RatingStars from '../../RatingStars/RatingStars';
import Button from '../../base/Button/Button';
import FavoriteIconButton from '../../base/Button/Icons/FavoriteIconButton/FavoriteIconButton';
import PoiInfoTextRow, { PoiInfoTextRowHeader } from './PoiInfoTextRow/PoiInfoTextRow';
import OpenedHours from './OpenedHours/OpenedHours';
import ShowMoreLess from '../../base/ShowMoreLess/ShowMoreLess';
import ReadMoreLess from '../../base/ReadMoreLess/ReadMoreLess';
import Copy from '../../base/Copy/Copy';
import PreLoading from '../../base/PreLoading/PreLoading';
import Timer from '../../base/Svg/Icons/Timer';
import Address from '../../base/Svg/Icons/Address';
import Web from '../../base/Svg/Icons/Web';
import TapRight from '../../base/Svg/Icons/TapRight';
import Phone from '../../base/Svg/Icons/Phone';
import Mask from '../../base/Svg/Icons/Mask';
import CustomPopover from '../../base/CustomPopover/CustomPopover';
import StepTimes from '../../StepTimes/StepTimes';
import classes from './PoiInfoText.scss';

// eslint-disable-next-line @typescript-eslint/naming-convention
enum POI_CARD_ACTION {
  ADD,
  REPLACE,
  REMOVE,
}

interface IPoiInfoText {
  poi: Model.Poi;
  hideFavoriteIcon: boolean;
  hidePartOfDay?: boolean;
  hideFeatures?: boolean;
  hideCuisine?: boolean;
  favorite: boolean;
  favoriteLoading: boolean;
  favoriteClick: (favorite: boolean) => void;
  stepOrder?: number;
  // Alternative
  replace?: boolean;
  addRemoveReplacePoi: (poi: Model.Poi, removeReplaceAdd: number, from?: string, to?: string) => void;
  hideActionButtons?: boolean;
  dayNumbers?: number[];
  planDate?: string;
  reservationUrl?: string;
  hideBookingButton: boolean;
  bookingButtonClick?: (productId: string, poi: Model.Poi) => void;
  tourTicketButtonClick?: () => void;
  tourTicketProductsLoading?: boolean;
  showTourTicketButton?: boolean;
  RESTAURANT_RESERVATION_PROVIDER_IDS: Model.PROVIDER_ID[];
  t: (value: Model.TranslationKey) => string;
}

const PoiInfoText: React.FC<IPoiInfoText> = ({
  poi,
  hideFavoriteIcon,
  hidePartOfDay,
  hideFeatures,
  hideCuisine,
  favorite,
  favoriteLoading,
  favoriteClick,
  stepOrder = -1,
  replace,
  hideActionButtons,
  addRemoveReplacePoi,
  dayNumbers,
  planDate,
  reservationUrl,
  hideBookingButton = false,
  bookingButtonClick,
  tourTicketButtonClick,
  tourTicketProductsLoading,
  showTourTicketButton = false,
  RESTAURANT_RESERVATION_PROVIDER_IDS,
  t,
}) => {
  const [show, setShow] = useState<boolean>(false);
  // const isAttraction = helper.getCategoryGroup(poi.category[0].id) === Model.POI_CATEGORY_GROUP.ATTRACTION;
  const isRestaurant: boolean = poi.bookings.some((booking: Model.Booking) => RESTAURANT_RESERVATION_PROVIDER_IDS.includes(booking.providerId)) && helper.getCategoryGroup(poi.category[0].id) === Model.POI_CATEGORY_GROUP.RESTAURANT;

  /**
   * Add - Remove - Replace Button
   */
  let ACTION_FLAG: POI_CARD_ACTION;
  if (replace) {
    ACTION_FLAG = POI_CARD_ACTION.REPLACE; // replace poi with alternative
  } else if (stepOrder > -1) {
    ACTION_FLAG = POI_CARD_ACTION.REMOVE; // step info, remove poi
  } else {
    ACTION_FLAG = POI_CARD_ACTION.ADD; // poi info, add poi
  }

  const actionIconClasses = [classes.addRemoveReplaceIcon];
  if (ACTION_FLAG === POI_CARD_ACTION.ADD) {
    actionIconClasses.push(classes.addIcon);
  } else if (ACTION_FLAG === POI_CARD_ACTION.REPLACE) {
    actionIconClasses.push(classes.replaceIcon);
  } else if (ACTION_FLAG === POI_CARD_ACTION.REMOVE) {
    actionIconClasses.push(classes.removeIcon);
  }

  // const poiAction = !hideActionButtons ? (
  //   <input
  //     type="button"
  //     className={actionIconClasses.join(' ')}
  //     onClick={() => {
  //       if (ACTION_FLAG === POI_CARD_ACTION.REMOVE) addRemoveReplacePoi(poi, -1);
  //       else if (ACTION_FLAG === POI_CARD_ACTION.REPLACE) addRemoveReplacePoi(poi, 0);
  //       else if (ACTION_FLAG === POI_CARD_ACTION.ADD) addRemoveReplacePoi(poi, 1);
  //     }}
  //   />
  // ) : null;

  const poiAction = useMemo(() => {
    if (!hideActionButtons) {
      if (ACTION_FLAG === POI_CARD_ACTION.ADD) {
        return (
          <CustomPopover
            show={show}
            content={
              <StepTimes
                times={{
                  from: undefined,
                  to: undefined,
                }}
                timesClicked={(from?: string, to?: string) => {
                  addRemoveReplacePoi(poi, 1, from, to);
                  setShow(false);
                }}
                buttonText={t('trips.myTrips.itinerary.step.addToItinerary.submit.apply')}
                duration={poi.duration}
                t={t}
              />
            }
            backdropClick={(e) => {
              e.stopPropagation();
              setShow(false);
            }}
          >
            <input
              type="button"
              className={actionIconClasses.join(' ')}
              onClick={(e) => {
                e.stopPropagation();
                setShow(!show);
              }}
            />
          </CustomPopover>
        );
      }
      return (
        <input
          type="button"
          className={actionIconClasses.join(' ')}
          onClick={() => {
            if (ACTION_FLAG === POI_CARD_ACTION.REMOVE) addRemoveReplacePoi(poi, -1);
            else if (ACTION_FLAG === POI_CARD_ACTION.REPLACE) addRemoveReplacePoi(poi, 0);
          }}
        />
      );
    }
    return null;
  }, [ACTION_FLAG, actionIconClasses, addRemoveReplacePoi, hideActionButtons, poi, show, t]);

  /**
   * Favorite button
   */
  let favoriteIcon;
  if (favorite) {
    favoriteIcon = (
      <FavoriteIconButton
        favorite
        clicked={() => {
          favoriteClick(!favorite);
        }}
      />
    );
  } else {
    favoriteIcon = (
      <FavoriteIconButton
        favorite={false}
        clicked={() => {
          favoriteClick(!favorite);
        }}
      />
    );
  }
  const poiFavorite = !hideFavoriteIcon ? (
    <div className={classes.favorite}>
      <div className={classes.favoriteButton}>{favoriteLoading ? <PreLoading color="#000" size="small" /> : favoriteIcon}</div>
    </div>
  ) : null;

  /**
   * Part Of Day
   */
  let partOfDay = null;
  if (dayNumbers && dayNumbers.length !== 0) {
    let header = t('trips.myTrips.itinerary.step.poi.partOfDay');
    if (dayNumbers.length > 1)
      header = `${header} ${dayNumbers
        .slice(0, dayNumbers.length - 1)
        .map((day) => day)
        .join(', ')} ${t('trips.myTrips.itinerary.step.poi.and')} ${dayNumbers[dayNumbers.length - 1]}`;
    else header = `${header} ${dayNumbers[0]}`;

    partOfDay = !hidePartOfDay && (
      <PoiInfoTextRow>
        <PoiInfoTextRowHeader header={header} />
        <TapRight />
      </PoiInfoTextRow>
    );
  }

  /**
   * Price
   */
  const poiPrice = poi.price ? (
    <PoiInfoTextRow>
      <PoiInfoTextRowHeader header={t('trips.myTrips.itinerary.step.poi.price')} />
      <Price price={poi.price} />
    </PoiInfoTextRow>
  ) : null;

  /**
   * Poi Hours
   */
  const poiHours = poi.hours ? (
    <PoiInfoTextRow height="auto">
      <Timer className={classes.poiInfoTextIcon} />
      <OpenedHours hourStr={poi.hours} planDate={planDate} t={t} />
    </PoiInfoTextRow>
  ) : null;
  /**
   * Rating
   */
  const poiRating =
    poi.rating !== null ? (
      <PoiInfoTextRow>
        <PoiInfoTextRowHeader header={`${t('trips.myTrips.itinerary.step.poi.rating')} (${poi.ratingCount || ''})`} />
        <div className={classes.ratingContent}>
          <RatingStars rating={`${poi.rating ? poi.rating * 20 : ''}`} />
        </div>
      </PoiInfoTextRow>
    ) : null;

  /**
   * Address
   */
  const poiAddress = poi.address ? (
    <>
      <PoiInfoTextRow border={false}>
        <PoiInfoTextRowHeader header={t('trips.myTrips.itinerary.step.poi.address.title')} />
      </PoiInfoTextRow>
      <PoiInfoTextRow>
        <Address fill="var(--text-primary-color)" className={classes.poiInfoTextIcon} />
        <PoiInfoTextRowHeader header={poi.address} />
        <Copy copyText={poi.address} t={t} />
      </PoiInfoTextRow>
    </>
  ) : null;

  /**
   * Web Site
   */
  const poiWeb = poi.web ? (
    <>
      <PoiInfoTextRow border={false}>
        <PoiInfoTextRowHeader header={t('trips.myTrips.itinerary.step.poi.web')} />
      </PoiInfoTextRow>
      <PoiInfoTextRow border>
        <div className={classes.web}>
          <Web className={classes.poiInfoTextIcon} />
          <a rel="noopener noreferrer" target="_blank" href={`${poi.web}`}>
            {poi.web}
          </a>
        </div>
      </PoiInfoTextRow>
    </>
  ) : null;

  /**
   * Phone
   */
  const poiPhone = poi.phone ? (
    <>
      <PoiInfoTextRow border={false}>
        <PoiInfoTextRowHeader header={t('trips.myTrips.itinerary.step.poi.phone.title')} />
      </PoiInfoTextRow>
      <PoiInfoTextRow>
        <div className={classes.phone}>
          <div className={classes.phoneText}>
            <Phone className={classes.poiInfoTextIcon} />
            <span>{poi.phone}</span>
          </div>
          <a className={classes.phoneButton} rel="noopener noreferrer" target="_blank" href={`tel:${poi.phone}`}>
            {t('trips.myTrips.itinerary.step.poi.phone.callNow')}
          </a>
        </div>
      </PoiInfoTextRow>
    </>
  ) : null;

  /**
   * Description
   */
  const poiDescription = poi.description ? (
    <>
      <PoiInfoTextRow border={false}>
        <PoiInfoTextRowHeader header={t('trips.myTrips.itinerary.step.poi.description')} />
      </PoiInfoTextRow>
      <PoiInfoTextRow height="auto" border={false}>
        <ReadMoreLess desc={poi.description} t={t} />
      </PoiInfoTextRow>
    </>
  ) : null;

  /**
   * Safety
   */
  let poiSafety = null;
  if (poi.safety && poi.safety.length > 0) {
    let poiSafetyContent = null;
    const uniqueSafety = helper.removeDuplicateValues(poi.safety, (s1, s2) => s1 === s2);

    // temperature checks -> staff get temperature checks
    const hasReplace: boolean = uniqueSafety.findIndex((s) => s === 'temperature checks') > -1;
    if (hasReplace) {
      const filteredSafety = uniqueSafety.filter((s) => s !== 'temperature checks');
      filteredSafety.push('staff get temperature checks');
      poiSafetyContent = helper.removeDuplicateValues(filteredSafety, (s1, s2) => s1 === s2).join(', ');
    } else {
      poiSafetyContent = uniqueSafety.join(', ');
    }

    poiSafety = (
      <PoiInfoTextRow border height={100}>
        <div className={classes.web}>
          <Mask className={classes.poiInfoTextIcon} />
          <span className={classes.poiSafetyText}>{poiSafetyContent}</span>
        </div>
      </PoiInfoTextRow>
    );
  }

  /**
   * Cuisines
   */
  const cuisinesArray = poi.cuisines?.split(', ') || [];
  const uniqueCuisines: string[] = helper.removeDuplicateValues(cuisinesArray, (s1, s2) => s1 === s2);
  const poiCuisines =
    uniqueCuisines.length > 0 && !hideCuisine ? (
      <>
        <PoiInfoTextRow border={false}>
          <PoiInfoTextRowHeader header={t('trips.myTrips.itinerary.step.poi.cuisine')} />
        </PoiInfoTextRow>
        <PoiInfoTextRow border={false} height="auto">
          <ShowMoreLess defaultItemCount={3} items={uniqueCuisines} t={t} />
        </PoiInfoTextRow>
      </>
    ) : null;

  /**
   * Features
   */
  const poiFeatures =
    poi.tags.length > 0 && !hideFeatures ? (
      <>
        <PoiInfoTextRow border={false}>
          <PoiInfoTextRowHeader header={t('trips.myTrips.itinerary.step.poi.tags.title')} />
        </PoiInfoTextRow>
        <PoiInfoTextRow border={false} height="auto">
          <ShowMoreLess defaultItemCount={4} items={poi.tags} t={t} />
        </PoiInfoTextRow>
      </>
    ) : null;

  /**
   * MustTries
   */
  let poiMustTries = null;
  if (poi.mustTries.length !== 0) {
    let mustTryMessage = '';
    if (poi.mustTries.length === 1) {
      mustTryMessage = `${t('trips.myTrips.itinerary.step.poi.mustTry.message')} ${poi.mustTries[0].name}.`;
    } else {
      mustTryMessage = `${t('trips.myTrips.itinerary.step.poi.mustTry.message')} ${poi.mustTries
        .slice(0, poi.mustTries.length - 1)
        .map((taste) => taste.name)
        .join(', ')} ${t('trips.myTrips.itinerary.step.poi.and')} ${poi.mustTries[poi.mustTries.length - 1].name}.`;
    }

    poiMustTries = (
      <>
        <PoiInfoTextRow border={false}>
          <PoiInfoTextRowHeader header={t('trips.myTrips.itinerary.step.poi.mustTry.title')} />
        </PoiInfoTextRow>
        <PoiInfoTextRow>
          <div className={classes.mustTryIcon} />
          <div className={classes.content}>{mustTryMessage}</div>
        </PoiInfoTextRow>
      </>
    );
  }

  const info = (
    <div className={classes.poiInfo}>
      {poiSafety}
      {partOfDay}
      {poiPrice}
      {poiRating}
      {poiHours}
      {poiDescription}
      {poiAddress}
      {poiWeb}
      {poiPhone}
      {poiCuisines}
      {poiFeatures}
      {poiMustTries}
    </div>
  );

  let bookaTable;
  if (!hideBookingButton) {
    // const isBooking = poi.booking.find((provider) => provider.provider_id === Model.PROVIDER_ID.YELP);
    if (isRestaurant) {
      bookaTable = (
        <div className={classes.bookaTable}>
          <Button
            text={reservationUrl ? t('trips.myTrips.itinerary.step.poi.bookATable.viewCancel') : t('trips.myTrips.itinerary.step.poi.bookATable.reserve')}
            color="danger"
            onClick={() => {
              if (bookingButtonClick) {
                // bookingButtonClick(isBooking.product.id, poi);
                // for demo
                bookingButtonClick('rC5mIHMNF5C1Jtpb2obSkA', poi);
              }
            }}
          />
        </div>
      );
    }
  }

  return (
    <div>
      <div className={classes.poiInfoText}>
        <div className={classes.poiHeader}>
          <span className={classes.poiTitle}>{poi.name}</span>
          {poiAction}
          {poiFavorite}
        </div>
        {showTourTicketButton ? (
          <div className={classes.openTours}>
            <Button disabled={tourTicketProductsLoading} text={t('trips.myTrips.itinerary.step.poi.tourTicket.buttonText')} color="primary" onClick={() => tourTicketButtonClick && tourTicketButtonClick()} />
          </div>
        ) : null}
        {/* {stepDayInfo} */}
        {info}
        {bookaTable}
        {/* {moment(planDate).utcOffset(0) > moment() ? bookaTable : null} */}
      </div>
    </div>
  );
};

export default PoiInfoText;
