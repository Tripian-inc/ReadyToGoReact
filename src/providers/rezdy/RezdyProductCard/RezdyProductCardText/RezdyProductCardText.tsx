/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Providers } from '@tripian/model';
import { Clock } from '../../../../components/base/Svg/Icons';
import classes from './RezdyProductCardText.scss';

interface IRezdyProductCardText {
  product: Providers.Rezdy.Product;
}

const RezdyProductCardText: React.FC<IRezdyProductCardText> = ({ product }) => (
  <div className={classes.rezdyProductCardText}>
    <h4 className={classes.rezdyProductCardTitle}>{product.name}</h4>
    {product.tags && (
      <div className={classes.rezdyProductCardContent}>
        <h6 className={classes.rezdyProductCardTextBody}>{product.tags.map((c) => c).join(', ')}</h6>
      </div>
    )}
    <div className={classes.rezdyProductCardFooter}>
      {product.durationMinutes && (
        <div className={classes.rezdyProductCardHour}>
          <Clock size="1rem" />
          <span className={classes.numberOfRatings}>{product.durationMinutes} mins </span>
        </div>
      )}
      {product.advertisedPrice && (
        <div className={classes.rezdyProductCardPrice}>
          <span>
            <b>${product.advertisedPrice}</b>
          </span>
        </div>
      )}
    </div>
  </div>
);

export default RezdyProductCardText;
