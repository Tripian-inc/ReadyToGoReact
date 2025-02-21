/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Providers } from '@tripian/model';
import RezdyProductCardImage from './RezdyProductCardImage/RezdyProductCardImage';
import RezdyProductCardText from './RezdyProductCardText/RezdyProductCardText';
import classes from './RezdyProductCard.scss';

interface IRezdyProductCard {
  product: Providers.Rezdy.Product;
  bodyClicked: (product: Providers.Rezdy.Product) => void;
}

const RezdyProductCard: React.FC<IRezdyProductCard> = ({ product, bodyClicked }) => (
  <div
    className={classes.rezdyProductCard}
    onKeyDown={() => {}}
    role="button"
    tabIndex={0}
    onClick={() => {
      bodyClicked(product);
    }}
  >
    <RezdyProductCardImage image={product.images[0]} />
    <RezdyProductCardText product={product} />
    <div className={classes.providerName}>
      <div className={classes.favicon} />
    </div>
  </div>
);

export default RezdyProductCard;
