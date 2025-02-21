/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import Model, { Providers, helper } from '@tripian/model';
import ImgLazy from '../../../../components/base/ImgLazy/ImgLazy';
import classes from './ReservationDetails.scss';

interface IReservationDetails {
  reservationInfo: Providers.Yelp.ReservationInfo;
  t: (value: Model.TranslationKey) => string;
}
const ReservationDetails: React.FC<IReservationDetails> = ({ reservationInfo, t }) => (
  <div className={`row center ${classes.reservationDetailPage}`}>
    <h3 className="col col12">{t('reservation.reservationInfo')}</h3>
    <div className="col col12 col6-m">
      <ImgLazy src={helper.imgUrl(reservationInfo.restaurant_image, 800)} alt="" x={800} y={800} />
    </div>
    <div className="col col12 col6-m">
      <ul>
        <li>
          <div className={classes.detailHeader}>{t('reservation.restaurantName')}</div>
          <span className={classes.detailDot}> :</span>
          <div className={classes.detailContent}>{reservationInfo.restaurant_name}</div>
        </li>
        <li>
          <div className={classes.detailHeader}>{t('reservation.name')}</div>
          <span className={classes.detailDot}> :</span>
          <div className={classes.detailContent}>
            {reservationInfo.reservation_details.firstName} {reservationInfo.reservation_details.lastName}
          </div>
        </li>
        <li>
          <div className={classes.detailHeader}>{t('reservation.email')}</div>
          <span className={classes.detailDot}> :</span>
          <div className={classes.detailContent}>{reservationInfo.reservation_details.email}</div>
        </li>
        <li>
          <div className={classes.detailHeader}>{t('reservation.phone')}</div>
          <span className={classes.detailDot}> :</span>
          <div className={classes.detailContent}>{reservationInfo.reservation_details.phone}</div>
        </li>
        <li>
          <div className={classes.detailHeader}>{t('reservation.date')}</div>
          <span className={classes.detailDot}> :</span>
          <div className={classes.detailContent}>
            {reservationInfo.reservation_details.date} {reservationInfo.reservation_details.time}
          </div>
        </li>
        <li>
          <div className={classes.detailHeader}>{t('reservation.covers')}</div>
          <span className={classes.detailDot}> :</span>
          <div className={classes.detailContent}>{reservationInfo.reservation_details.covers === 1 ? `1 ${t('reservation.person')}` : `${reservationInfo.reservation_details.covers} ${t('reservation.people')}`}</div>
        </li>
        {/* <li>
            <div className={classes.detailHeader}>Confirmation Url</div>
            <span className={classes.detailDot}> :</span>
            <div className={classes.detailContent}>
              <a className={classes.detailUrl} rel="noopener noreferrer" target="_blank" href={reservationInfo.confirm_url}>
                Go To Yelp
              </a>
            </div>
          </li> */}
      </ul>
    </div>
  </div>
);

export default ReservationDetails;
