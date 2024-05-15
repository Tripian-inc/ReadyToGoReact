/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Providers } from '@tripian/model';
import ImgLazy from '../../../../../components/base/ImgLazy/ImgLazy';
import classes from './ViatorProductCardImage.scss';

interface IViatorProductCardImage {
  image: Providers.Viator.ProductImage;
}

const ViatorProductCardImage: React.FC<IViatorProductCardImage> = ({ image }) => {
  const variant = image.variants.find((x) => x.width === 400) || image.variants[0];

  return (
    <div className={classes.viatorProductCardImage}>
      <ImgLazy src={variant.url} alt="" x={400} y={266} showThumbnails={false} referrerPolicy="no-referrer" />
    </div>
  );
};

export default ViatorProductCardImage;
