/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import Model from '@tripian/model';
import moment from 'moment';
import Button from '../base/Button/Button';
import classes from './CouponCard.scss';

interface ICouponCard {
  coupon: Model.Coupon;
  viewOffersClicked: () => void;
}

const CouponCard: React.FC<ICouponCard> = ({ coupon, viewOffersClicked }) => {
  moment.locale(window.twindow.langCode);

  return (
    <div className={classes.couponCard}>
      <div className={classes.couponCardImgContent}>
        <div className={classes.couponCardImg} />
      </div>
      <div className={classes.couponCardContent}>
        <div className={classes.couponDates}>
          {moment(coupon.validStartDate).format('MMM Do')} - {moment(coupon.validEndDate).format('MMM Do')}
        </div>
        <div className={classes.couponTitle}>{coupon.campaign.title}</div>
        <div className={classes.couponAmount}>
          <span>Available: </span>
          <span>{coupon.currency}</span>
          <span>{coupon.balance}</span>
        </div>
        <div className={classes.couponButtonContent}>
          <Button className={classes.couponButton} color="primary" text="View Offers" onClick={() => viewOffersClicked()} />
        </div>
      </div>
    </div>
  );
};

export default CouponCard;
