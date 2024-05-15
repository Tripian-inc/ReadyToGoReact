/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Providers } from '@tripian/model';
import ViatorProductCardImage from './ViatorProductCardImage/ViatorProductCardImage';
import ViatorProductCardText from './ViatorProductCardText/ViatorProductCardText';
import classes from './ViatorProductCard.scss';

interface IViatorProductCard {
  product: Providers.Viator.Product;
  bodyClicked: (product: Providers.Viator.Product) => void;
}

const ViatorProductCard: React.FC<IViatorProductCard> = ({ product, bodyClicked }) => (
  <div
    className={classes.viatorProductCard}
    onKeyDown={() => {}}
    role="button"
    tabIndex={0}
    onClick={() => {
      bodyClicked(product);
    }}
  >
    <ViatorProductCardImage image={product.images[0]} />
    <ViatorProductCardText product={product} />
    <div className={classes.providerName}>
      <div className={classes.favicon} />
      <div className={classes.companyName}>Viator</div>
    </div>
  </div>
);

export default ViatorProductCard;
