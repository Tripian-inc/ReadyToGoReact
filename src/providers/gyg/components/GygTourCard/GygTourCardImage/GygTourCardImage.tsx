/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Providers, helper } from '@tripian/model';
import ImgLazy from '../../../../../components/base/ImgLazy/ImgLazy';
import classes from './GygTourCardImage.scss';

interface IGygTourCardImage {
  tourImage: Providers.Gyg.TourPictures[];
}

const GygTourCardImage: React.FC<IGygTourCardImage> = ({ tourImage }) => {
  const tourImg = tourImage.find((picture) => picture)?.url;
  const formattedImg = helper.getYourGuideImageFormat(tourImg || '', '21');
  return (
    <div className={classes.gygTourCardImage}>
      <ImgLazy src={formattedImg} alt="" x={400} y={266} showThumbnails={false} />
    </div>
  );
};

export default GygTourCardImage;
