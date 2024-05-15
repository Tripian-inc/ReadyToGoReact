/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import Model, { helper } from '@tripian/model';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import classes from './TasteInfoImage.scss';

interface ITasteInfoImage {
  taste: Model.TasteItem;
}

const TasteInfoImage: React.FC<ITasteInfoImage> = ({ taste }) => (
  <div>
    <img className={classes.tasteInfoImage} src={helper.imgUrl(taste.image.url, 800, 500, 'Tastes')} alt="" />
  </div>
);

export default TasteInfoImage;
