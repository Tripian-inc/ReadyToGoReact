/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import Model from '@tripian/model';
import CloseIconButton from '../base/Button/Icons/CloseIconButton/CloseIconButton';
import classes from './AccommondationInfo.scss';
import Address from '../base/Svg/Icons/Address';
import Copy from '../base/Copy/Copy';
import PoiInfoTextRow, { PoiInfoTextRowHeader } from '../PoiInfo/PoiInfoText/PoiInfoTextRow/PoiInfoTextRow';

interface IAccommondationInfo {
  accommodation: Model.Accommodation;
  close: (accommodation: Model.Accommodation) => void;
  t: (value: Model.TranslationKey) => string;
}

const AccommondationInfo: React.FC<IAccommondationInfo> = ({ accommodation, close, t }) => (
  <div className={classes.accommodation}>
    <div className={classes.accommodationImage}>
      <svg viewBox="0 0 512 512" />
      <div className={classes.accommodationImg}>{accommodation.imageUrl && accommodation.imageUrl !== '' && <img className={classes.providerImg} alt={accommodation.provider ?? ''} src={accommodation.imageUrl} referrerPolicy="no-referrer" />}</div>
      <div className={classes.close}>
        <CloseIconButton
          fill="#fff"
          clicked={() => {
            close(accommodation);
          }}
        />
      </div>
    </div>
    <h2 className={classes.accommodationTitle}>{accommodation.name} </h2>
    <div className={classes.accommodationInfo}>
      {accommodation.address ? (
        <>
          <PoiInfoTextRow border={false}>
            <PoiInfoTextRowHeader header={t('trips.myTrips.itinerary.accommodation.address')} />
          </PoiInfoTextRow>
          <PoiInfoTextRow>
            <Address className={classes.accoIcon} />
            <PoiInfoTextRowHeader header={accommodation.address} />
            <Copy copyText={accommodation.address} t={t} />
          </PoiInfoTextRow>
        </>
      ) : null}
    </div>
  </div>
);

export default AccommondationInfo;
