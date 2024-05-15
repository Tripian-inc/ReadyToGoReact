/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { helper } from '@tripian/model';
import Svg from '../base/Svg/Svg';
import classes from './SortableStepListCard.scss';
import ImgLazy from '../base/ImgLazy/ImgLazy';

interface ISortableStepListCard {
  stepOrder: number;
  poiName: string;
  poiImageUrl: string;
  dragHandle?: JSX.Element;
}

const SortableStepListCard: React.FC<ISortableStepListCard> = ({ poiName, poiImageUrl, stepOrder, dragHandle }) => {
  const placeImg = helper.imgUrl(poiImageUrl, 256, 256);

  return (
    <div className={classes.sortableStepCard}>
      <figure className={classes.figureSortable}>
        {/* <img className={classes.figureImg} src={placeImg} alt={step.poi.name} /> */}
        <ImgLazy src={placeImg} alt={poiName} x={256} y={256} />
        <div className={classes.figureOrder}>{`${stepOrder + 1}`}</div>
      </figure>
      <div className={classes.sortableStepCardInfo}>
        <h4 className={classes.sortableStepCardName}>{poiName}</h4>
        <div className={classes.equalIcon}>{dragHandle || <Svg path="M10,678.2h980v-89.8H10V678.2z M10,321.8v89.8h980v-89.8H10z" viewBox="0 0 1000 1000" />}</div>
      </div>
    </div>
  );
};

export default SortableStepListCard;
