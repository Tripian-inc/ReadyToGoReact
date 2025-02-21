/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Providers } from '@tripian/model';
import ImgLazy from '../../../../components/base/ImgLazy/ImgLazy';
import classes from './ToristyProductCardImage.scss';
import emptyImageData from '../../../../constant/emptyImage';

interface IToristyProductCardImage {
  image: Providers.Toristy.Image;
}

const ToristyProductCardImage: React.FC<IToristyProductCardImage> = ({ image }) => {
  const imageUrl = image.orig ? image.orig : emptyImageData;

  return (
    <div className={classes.viatorProductCardImage}>
      <ImgLazy src={imageUrl} alt="" x={400} y={266} showThumbnails={false} referrerPolicy="no-referrer" />
    </div>
  );
};

export default ToristyProductCardImage;
