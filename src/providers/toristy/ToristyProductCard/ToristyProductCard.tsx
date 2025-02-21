/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import Model, { Providers } from '@tripian/model';
import ToristyProductCardImage from './ToristyProductCardImage/ToristyProductCardImage';
import ToristyProductCardText from './ToristyProductCardText/ToristyProductCardText';
import classes from './ToristyProductCard.scss';

interface IToristyProductCard {
  product: Providers.Toristy.Product;
  bodyClicked: (product: Providers.Toristy.Product) => void;
  t: (value: Model.TranslationKey) => string;
}

const ToristyProductCard: React.FC<IToristyProductCard> = ({ product, bodyClicked, t }) => (
  <div
    className={classes.viatorProductCard}
    onKeyDown={() => {}}
    role="button"
    tabIndex={0}
    onClick={() => {
      bodyClicked(product);
    }}
  >
    <ToristyProductCardImage image={product.image} />
    <ToristyProductCardText product={product} t={t} />
    <div className={classes.providerName}>
      <div className={classes.favicon} />
      <div className={classes.companyName}>Toristy</div>
    </div>
  </div>
);

export default ToristyProductCard;
