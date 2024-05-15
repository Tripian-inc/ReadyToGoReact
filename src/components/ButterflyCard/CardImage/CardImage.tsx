/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import Model, { helper } from '@tripian/model';
import classes from './CardImage.scss';
import ImgLazy from '../../base/ImgLazy/ImgLazy';

interface ICardImage {
  poi: Model.Poi;
}

const CardImage: React.FC<ICardImage> = ({ poi }) => {
  const cardImageClasses = [classes.imgRow];

  if (poi.status === false) {
    cardImageClasses.push(classes.cardImageBlackAndWhite);
  }

  const xy = 256;
  const srcs = poi.gallery.map((g) => g.url);
  /* const plusVisible = srcs.length > 3; */
  let [src1, src2, src3] = srcs;
  src1 = helper.imgUrl(src1, xy);
  src2 = helper.imgUrl(src2, xy);
  src3 = helper.imgUrl(src3, xy);

  return (
    <div className={cardImageClasses.join(' ')}>
      <div className={classes.img1}>
        <ImgLazy src={src1} alt={poi.name} x={256} y={256} />
      </div>
      <div className={classes.img23}>
        <div className={classes.img2}>
          <ImgLazy src={src2} alt={poi.name} x={256} y={256} />
        </div>
        <div className={classes.img3}>
          {/* {plusVisible ? <div className={classes.plusCount}>+{srcs.length - 2}</div> : null} */}
          <ImgLazy src={src3} alt={poi.name} x={256} y={256} />
        </div>
      </div>
    </div>
  );

  /*  <div className={classes.imgRow}>
      <div className={classes.img1}>
        <img src={src1} alt={poi.name} />
      </div>
      <div className={classes.img23}>
        <div className={classes.img2}>
          <img src={src2} alt={poi.name} />
        </div>
        <div className={classes.img3}>
          <img src={src3} alt={poi.name} />
        </div>
      </div>
    </div> */
};

export default CardImage;
