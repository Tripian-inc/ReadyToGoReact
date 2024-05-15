import React from 'react';
import ImgLazy from '../../../../../components/base/ImgLazy/ImgLazy';
import classes from './BbTourCardImage.scss';

interface IBbTourCardImage {
  tourImage: string;
}

const BbTourCardImage: React.FC<IBbTourCardImage> = ({ tourImage }) => (
  <div className={classes.bbTourCardImage}>
    <ImgLazy src={tourImage} alt="" x={400} y={266} showThumbnails={false} referrerPolicy="no-referrer" />
  </div>
);

export default BbTourCardImage;
