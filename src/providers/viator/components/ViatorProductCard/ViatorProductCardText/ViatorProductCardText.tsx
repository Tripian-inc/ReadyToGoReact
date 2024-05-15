/* eslint-disable react/no-array-index-key */
/* eslint-disable no-nested-ternary */
import React, { useMemo } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Providers } from '@tripian/model';
import classes from './ViatorProductCardText.scss';
import { Clock } from '../../../../../components/base/Svg/Icons';

interface IViatorProductCardText {
  product: Providers.Viator.Product;
}

enum FLAG {
  FREE_CANCELLATION = 'Free Cancellation',
  LIKELY_TO_SELL_OUT = 'Likely To Sell Out',
}

const ViatorProductCardText: React.FC<IViatorProductCardText> = ({ product }) => {
  const amount: string = product.pricing.summary.fromPrice.toString();

  const flags = product.flags.map((pr) =>
    pr
      .toLowerCase()
      .split('_')
      .map((p) => p && p[0].toUpperCase() + p.slice(1))
      .join(' '),
  );

  const duration = useMemo(() => {
    if (product.duration.fixedDurationInMinutes) {
      return <span className={classes.numberOfRatings}>{product.duration.fixedDurationInMinutes} mins</span>;
    }
    if (product.duration.variableDurationFromMinutes && product.duration.variableDurationToMinutes) {
      return (
        <span className={classes.numberOfRatings}>
          {product.duration.variableDurationFromMinutes} - {product.duration.variableDurationToMinutes} mins
        </span>
      );
    }
    return null;
  }, [product.duration]);

  return (
    <div className={classes.viatorProductCardText}>
      <h4 className={classes.viatorProductCardTitle}>{product.title}</h4>
      <div className={classes.viatorProductCardContent}>
        <h6 className={classes.viatorProductCardTextBody}>
          {flags.map((flag, i) => (
            <span key={i}>
              <span style={{ color: flag === FLAG.FREE_CANCELLATION ? 'green' : flag === FLAG.LIKELY_TO_SELL_OUT ? 'red' : 'gray' }}>{flag}</span>&nbsp;
            </span>
          ))}
        </h6>
      </div>
      <div className={classes.viatorProductCardFooter}>
        <div className={classes.viatorProductCardHour}>
          <Clock size="1rem" />
          {duration}
        </div>
        <div className={classes.viatorProductCardPrice}>
          <span>
            <b>${amount}</b>
          </span>
        </div>
      </div>
    </div>
  );
};

export default ViatorProductCardText;
