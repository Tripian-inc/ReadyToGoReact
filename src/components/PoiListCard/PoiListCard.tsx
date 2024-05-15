/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-no-target-blank */
import React from 'react';
import Model, { helper } from '@tripian/model';
import emptyImageData from '../../constant/emptyImage';
import classes from './PoiListCard.scss';
// import Button from '../base/Button/Button';

interface IPoiListCard {
  poi: Model.Poi;
}

const PoiListCard: React.FC<IPoiListCard> = ({ poi }) => {
  const PoiImage = poi.image === null ? emptyImageData : helper.imgUrl(`${poi.image.url}`, 84, 84);

  return (
    <div className={classes.poiListCard}>
      <ul key={poi.id}>
        <li>
          <img className={classes.poiImg} src={PoiImage} alt={poi.name} />
          <div className={classes.rightSide}>
            <div className={classes.poiListCardName}>
              <b>{poi.name}</b>
            </div>
            <div className={classes.correct} />
          </div>
          {/* <Button type="outlined" size="small" color="primary" style={{ 'border-radius': '50%' }} iconPath="./img/plus.svg" onClick={() => {}} /> */}
        </li>
      </ul>
    </div>
  );
};

export default PoiListCard;
