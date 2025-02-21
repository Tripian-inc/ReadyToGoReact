/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Providers } from '@tripian/model';
import emptyImageData from '../../../../constant/emptyImage';
import ImgLazy from '../../../../components/base/ImgLazy/ImgLazy';
import classes from './RezdyProductCardImage.scss';

interface IRezdyProductCardImage {
  image?: Providers.Rezdy.ProductImage;
}

const RezdyProductCardImage: React.FC<IRezdyProductCardImage> = ({ image }) => {
  const imageUrl = image ? image.itemUrl : emptyImageData;

  return (
    <div className={classes.rezdyProductCardImage}>
      <ImgLazy className={image ? '' : classes.emptyImg} objectFit={image ? 'cover' : 'contain'} src={imageUrl} alt="" x={400} y={266} showThumbnails={false} referrerPolicy="no-referrer" />
    </div>
  );
};

export default RezdyProductCardImage;
