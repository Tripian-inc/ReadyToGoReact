/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import classes from './RefCard.scss';
import Button from '../base/Button/Button';

interface IRefCard {
  image: string;
  title: string;
  butonText: string;
  subContext?: string;
  clicked: () => void;
  children: React.ReactNode;
}

const RefCard: React.FC<IRefCard> = ({ image, title, butonText, subContext, clicked, children }) => (
  <div className={classes.refCard} onClick={() => clicked()} role="button" onKeyDown={() => {}} tabIndex={0}>
    <div className={classes.refCardImgDiv}>
      <img className={classes.refCardImg} src={image} alt="" referrerPolicy="no-referrer" />
    </div>
    <div className={classes.refCardContent}>
      <div className={classes.refCardTitle}>{title}</div>
      <div className={classes.refCardPrice}>
        <span>{children}</span>
        {subContext ? <span className={classes.refCardsubContext}>{subContext}</span> : null}
      </div>
      <div className={classes.refCardButton}>
        <div className="hide-s">
          <Button text={butonText} onClick={() => clicked()} color="primary" size="small" />
        </div>
        <div className="hide-m">
          <div onKeyDown={() => {}} role="button" tabIndex={0} className={classes.bookingButton} onClick={() => clicked()} />
        </div>
      </div>
    </div>
  </div>
);

export default RefCard;
