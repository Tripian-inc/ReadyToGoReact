/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useMemo } from 'react';
import Model, { helper } from '@tripian/model';
import moment from 'moment';
import ImgLazy from '../base/ImgLazy/ImgLazy';
import { Edit } from '../base/Svg/Icons';
import classes from './TripCard.scss';

// import PreLoading from '../base/PreLoading/PreLoading';

interface ITripCard {
  tripReference: Model.TripReference;
  icsFileDownload: (tripHash: string) => void;
  icsLoading: boolean;
  editTrip: (tripReference: Model.TripReference) => void;
  deleteTrip: (tripHash: string) => void;
  showShareTrip: boolean;
  shareTrip: (tripReference: Model.TripReference) => void;
  clicked: (tripReference: Model.TripReference) => void;
  tripNameClicked: (tripReference: Model.TripReference) => void;
  t: (value: Model.TranslationKey) => string;
}

const TripCard: React.FC<ITripCard> = ({ tripReference, /* icsFileDownload, icsLoading, */ editTrip, deleteTrip, showShareTrip, shareTrip, clicked, tripNameClicked, t }) => {
  // const [fakeImg, setFakeImg] = useState<boolean>(true);

  moment.locale(window.twindow.langCode);

  const cityImg = helper.cityImgUrl(`${tripReference.city.image.url}`, 800, 500);
  const arrivalDate = moment(tripReference.tripProfile.arrivalDatetime).utcOffset(0);
  const departureDate = moment(tripReference.tripProfile.departureDatetime).utcOffset(0);
  const lastTripDatetime = moment(tripReference.tripProfile.departureDatetime).format('X');
  const datetimeNow = moment(new Date()).format('X');

  const start = moment(arrivalDate.format('YYYY-MM-DD'));
  const end = moment(departureDate.format('YYYY-MM-DD'));
  const duration = moment.duration(end.diff(start)).asDays();
  const howManyDays = Math.ceil(duration) + 1;

  let buttons;
  const cardImageClasses = [classes.cardImage];
  const deleteIconClasses = [classes.deleteIcon];
  const areMonthsYearsDifferent = useMemo(() => {
    let latterMonth = '';
    let formerYear = '';
    if (arrivalDate.format('MMMM') !== departureDate.format('MMMM')) {
      latterMonth = departureDate.format('MMMM');
    }
    if (arrivalDate.format('YYYY') !== departureDate.format('YYYY')) {
      formerYear = arrivalDate.format('YYYY');
    }

    return { latterMonth, formerYear };
  }, [arrivalDate, departureDate]);

  if (lastTripDatetime <= datetimeNow) {
    cardImageClasses.push(classes.cardImageBlackWhite);
    deleteIconClasses.push(classes.deleteIconPosition);
    buttons = (
      <div className={classes.buttons}>
        <div
          onKeyDown={() => {}}
          role="button"
          tabIndex={0}
          className={deleteIconClasses.join(' ')}
          data-tooltip={t('trips.deleteTrip.title')}
          data-tooltip-position="top"
          onClick={(event) => {
            event.stopPropagation();
            deleteTrip(tripReference.tripHash);
          }}
        />
      </div>
    );
  } else {
    buttons = (
      <div className={classes.buttons}>
        <div
          onKeyDown={() => {}}
          role="button"
          tabIndex={0}
          className={classes.deleteIcon}
          data-tooltip={t('trips.deleteTrip.title')}
          data-tooltip-position="top"
          onClick={(event) => {
            event.stopPropagation();
            deleteTrip(tripReference.tripHash);
          }}
        />
        <div
          onKeyDown={() => {}}
          role="button"
          tabIndex={0}
          onClick={(event) => {
            event.stopPropagation();
            editTrip(tripReference);
          }}
          className={classes.editIcon}
          data-tooltip={t('trips.editTrip.title')}
          data-tooltip-position="top"
        />
        {showShareTrip && (
          <div
            onKeyDown={() => {}}
            role="button"
            tabIndex={0}
            onClick={(event) => {
              event.stopPropagation();
              shareTrip(tripReference);
            }}
            className={classes.shareIcon}
            data-tooltip={t('trips.shareTrip.title')}
            data-tooltip-position="top"
          />
        )}

        {/* <div
          onKeyDown={() => {}}
          role="button"
          tabIndex={0}
          onClick={(event) => {
            event.stopPropagation();
            icsFileDownload(tripReference.tripHash);
          }}
          className={`${classes.dowloadIcon} ${icsLoading ? classes.dowloadIconLoading : ''}`}
          data-tooltip="Ics File Download"
          data-tooltip-position="top"
        >
          {icsLoading && <PreLoading color="#fff" size="small" />}
        </div> */}
      </div>
    );
  }

  return (
    <div
      className={classes.tripCard}
      role="button"
      tabIndex={0}
      onKeyPress={() => {}}
      onClick={() => {
        clicked(tripReference);
      }}
    >
      <div className={cardImageClasses.join(' ')}>
        {/* {fakeImg ? <svg viewBox="0 0 800 500" /> : <img src={cityImg} alt={tripReference.city.name} className={tripImageClass} />} */}
        <ImgLazy src={cityImg} alt={tripReference.city.name} x={800} y={500} />
        <h2 className={classes.cardTitle}>{tripReference.city.name}</h2>
        {tripReference.tripProfile.tripName && (
          <div
            className={classes.tripName}
            onKeyDown={() => {}}
            role="button"
            tabIndex={0}
            onClick={(event) => {
              event.stopPropagation();
              tripNameClicked(tripReference);
            }}
          >
            <h5>{tripReference.tripProfile.tripName}</h5>
            <Edit size="1rem" fill="#fff" />
          </div>
        )}

        <h6 className={classes.howManyDays} style={tripReference.tripProfile.tripName ? { top: '1.5rem' } : undefined}>{`(${howManyDays} ${t('trips.days')})`}</h6>
        {buttons}
      </div>
      <div className={classes.cardContent}>
        <p>
          {arrivalDate.format('MMMM DD')}
          {areMonthsYearsDifferent.formerYear !== '' ? `, ${areMonthsYearsDifferent.formerYear}` : ''} - {areMonthsYearsDifferent.latterMonth} {departureDate.format('DD')}, {departureDate.format('YYYY')}
        </p>
      </div>
    </div>
  );
};

export default TripCard;
