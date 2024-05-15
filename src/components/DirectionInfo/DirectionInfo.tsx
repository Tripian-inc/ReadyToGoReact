/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import Model from '@tripian/model';
import { Legs, Car, Uber, Bicycle } from '../base/Svg/Icons';
import classes from './DirectionInfo.scss';

interface IDirectionInfo {
  distance: string;
  direction: string;
  travel: {
    text: string;
    value: google.maps.TravelMode;
  };
  bookaride?: () => void;
  hideBookaRide: boolean;
  t: (value: Model.TranslationKey) => string;
}

const DirectionInfo: React.FC<IDirectionInfo> = ({ distance, direction, travel, bookaride, hideBookaRide, t }) => {
  let icon;
  if (travel.value === google.maps.TravelMode.WALKING) {
    icon = (
      <div className={classes.walking}>
        <div className={classes.icon}>
          <Legs color="#4285f4" />
        </div>
      </div>
    );
  } else if (travel.value === google.maps.TravelMode.DRIVING) {
    icon = (
      <div className={classes.driving}>
        <div className={classes.icon}>
          <Car color="#4285f4" />
        </div>
      </div>
    );
  } else if (travel.value === google.maps.TravelMode.BICYCLING) {
    icon = (
      <div className={classes.cycling}>
        <div className={classes.icon}>
          <Bicycle color="#37a140" />
        </div>
      </div>
    );
  }

  return (
    <div className={classes.content}>
      {icon}
      <div className={classes.directionInfo}>
        <span>{distance}</span>
        <span> - </span>
        <span className={travel.value === google.maps.TravelMode.BICYCLING ? classes.durationCycling : classes.duration}>{direction}</span>
      </div>
      {!hideBookaRide && travel.value === google.maps.TravelMode.DRIVING ? (
        <div
          className={classes.uber}
          onKeyDown={() => {}}
          role="button"
          tabIndex={0}
          onClick={() => {
            if (bookaride) bookaride();
          }}
        >
          <Uber size="25px" />
          <span className={classes.bookaride}>{t('trips.myTrips.itinerary.direction')}</span>
        </div>
      ) : null}
    </div>
  );
};

export default DirectionInfo;
