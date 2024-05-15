/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import Model from '@tripian/model';
/* import ImgLazy from '../../base/ImgLazy/ImgLazy';
import { imgUrl } from '../../../helper'; */

import classes from './TasteCard2Image.scss';

interface ITasteCard2Image {
  taste: Model.TasteItem;
}

const TasteCard2Image: React.FC<ITasteCard2Image> = ({ taste }) => (
  <div className={classes.imgRow}>
    {/* <ImgLazy src={imgUrl(taste.image, 800, 500, 'Tastes')} alt={taste.name} x={800} y={500} /> */}
    {/* <img src={imgUrl(taste.image, 800, 500, 'Tastes')} alt="" /> */}
    <img src={taste.image.url} alt={taste.name} />
  </div>
);

export default TasteCard2Image;
