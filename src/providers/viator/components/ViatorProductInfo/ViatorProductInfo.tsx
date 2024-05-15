/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import Model, { Providers } from '@tripian/model';
import CloseIconButton from '../../../../components/base/Button/Icons/CloseIconButton/CloseIconButton';
import classes from './ViatorProductInfo.scss';

interface IViatorProductInfo {
  product: Providers.Viator.Product;
  productInfo: Providers.Viator.ProductInfo;
  tripProfile: Model.TripProfile;
  tripCurrentDate: string;
  onBookNow: (viatorUrl: string) => void;
  close: () => void;
}

// TODO
const ViatorProductInfo: React.FC<IViatorProductInfo> = ({ product, productInfo, tripProfile, tripCurrentDate, onBookNow, close }) => (
  <div>
    <div className="row pt4">
      <h1>{product.title}</h1>
      <div>
        <CloseIconButton fill="#fff" clicked={() => close()} />
      </div>
      <div className="col col12 col7-m">{product.description}</div>
      <div className="col col12 col7-m">{product.itineraryType}</div>
      <div className="col col12 col7-m">{product.productUrl}</div>
    </div>
  </div>
);

export default ViatorProductInfo;
